<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // 1. UPDATED VALIDATION: user_id is no longer strictly required, but email is!
    if (empty($data['email']) || empty($data['cartItems']) || empty($data['total_amount']) || empty($data['shipping']) || empty($data['shipping']['city'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing required order details']);
        exit();
    }

    $conn = getDBConnection();
    
    // Start the Transaction
    $conn->beginTransaction();

    // 2. SMART USER ROUTING
    $user_id = $data['user_id'] ?? null;
    $email = trim($data['email']);
    $password = $data['password'] ?? null;

    // If they are a guest (no user_id passed from React)
    if (!$user_id) {
        // Check if this email already exists in the database just in case
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = :email LIMIT 1");
        $stmt->execute([':email' => $email]);
        $existingUser = $stmt->fetch();

        if ($existingUser) {
            // They have an account but checked out as a guest. Link it to their account anyway!
            $user_id = $existingUser['id'];
        } else if (!empty($password)) {
            // NEW ACCOUNT CREATION: They are a guest, email is new, AND they gave us a password!
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)");
            $stmt->execute([
                ':name' => $data['shipping']['name'],
                ':email' => $email,
                ':password' => $hashedPassword
            ]);
            // Grab their shiny new User ID to link to this order
            $user_id = $conn->lastInsertId();
        }
        // If no password was provided, $user_id remains null (Pure Guest), which is totally fine!
    }

    // 3. Insert the Main Order (Now tracking email for guest linking!)
    $stmt = $conn->prepare("
        INSERT INTO orders (
            user_id, email, total_amount, shipping_fee, discount_code, discount_amount, gift_message,
            shipping_name, shipping_company, shipping_line1, shipping_line2, 
            shipping_city, shipping_region, shipping_zip, shipping_country, shipping_phone,
            payment_method, payment_status, status
        )
        VALUES (
            :user_id, :email, :total_amount, :shipping_fee, :discount_code, :discount_amount, :gift_message,
            :shipping_name, :shipping_company, :shipping_line1, :shipping_line2, 
            :shipping_city, :shipping_region, :shipping_zip, :shipping_country, :shipping_phone,
            :payment_method, :payment_status, 'Processing'
        )
    ");
    
    $stmt->execute([
        ':user_id' => $user_id,
        ':email' => $email, // Saving the email so we can find this order later if they register!
        ':total_amount' => $data['total_amount'],
        ':shipping_fee' => $data['shipping_fee'] ?? 0.00,
        ':discount_code' => $data['discount_code'] ?? null,
        ':discount_amount' => $data['discount_amount'] ?? 0.00,
        ':gift_message' => $data['gift_message'] ?? null,
        
        ':shipping_name' => $data['shipping']['name'],
        ':shipping_company' => $data['shipping']['company'] ?? null,
        ':shipping_line1' => $data['shipping']['line1'],
        ':shipping_line2' => $data['shipping']['line2'] ?? null,
        ':shipping_city' => $data['shipping']['city'],
        ':shipping_region' => $data['shipping']['region'] ?? $data['shipping']['city'], 
        ':shipping_zip' => $data['shipping']['zip'],
        ':shipping_country' => $data['shipping']['country'] ?? 'United Kingdom',
        ':shipping_phone' => $data['shipping']['phone'] ?? null,
        
        ':payment_method' => $data['payment_method'] ?? 'Unknown',
        ':payment_status' => $data['payment_status'] ?? 'Pending'
    ]);

    // Get the ID of the order we just created
    $orderId = $conn->lastInsertId();

    // --- NEW: INCREMENT PROMO USAGE TRACKER ---
    if (!empty($data['discount_code'])) {
        $updatePromoStmt = $conn->prepare("UPDATE discount_codes SET used_count = used_count + 1 WHERE code = :code");
        $updatePromoStmt->execute([':code' => $data['discount_code']]);
    }

    // 4. Loop through the cart and insert each item
    $stmtItem = $conn->prepare("
        INSERT INTO order_items (order_id, product_id, product_name, variant, quantity, price, image)
        VALUES (:order_id, :product_id, :product_name, :variant, :quantity, :price, :image)
    ");

    foreach ($data['cartItems'] as $item) {
        $stmtItem->execute([
            ':order_id' => $orderId,
            ':product_id' => $item['id'],
            ':product_name' => $item['name'],
            ':variant' => $item['variant'] ?? 'Standard',
            ':quantity' => $item['quantity'],
            ':price' => $item['price'],
            ':image' => $item['image'] ?? null
        ]);
    }

    // Commit the transaction!
    $conn->commit();

    http_response_code(201);
    echo json_encode(['success' => true, 'message' => 'Order placed successfully!', 'order_id' => $orderId]);

} catch (PDOException $e) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>