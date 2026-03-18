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

    // Validate absolute minimum required data
    if (empty($data['user_id']) || empty($data['cartItems']) || empty($data['total_amount']) || empty($data['shipping']) || empty($data['shipping']['region'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing required order details']);
        exit();
    }

    $conn = getDBConnection();
    
    // Start the Transaction
    $conn->beginTransaction();

    // 1. Insert the Main Order (Now tracking EVERYTHING + Gift Message)
    $stmt = $conn->prepare("
        INSERT INTO orders (
            user_id, total_amount, shipping_fee, discount_code, discount_amount, gift_message,
            shipping_name, shipping_company, shipping_line1, shipping_line2, 
            shipping_city, shipping_region, shipping_zip, shipping_country, shipping_phone,
            payment_method, payment_status, status
        )
        VALUES (
            :user_id, :total_amount, :shipping_fee, :discount_code, :discount_amount, :gift_message,
            :shipping_name, :shipping_company, :shipping_line1, :shipping_line2, 
            :shipping_city, :shipping_region, :shipping_zip, :shipping_country, :shipping_phone,
            :payment_method, :payment_status, 'Processing'
        )
    ");
    
    // Using ?? allows us to safely handle optional fields if the user leaves them blank
    $stmt->execute([
        ':user_id' => $data['user_id'],
        ':total_amount' => $data['total_amount'],
        ':shipping_fee' => $data['shipping_fee'] ?? 0.00,
        ':discount_code' => $data['discount_code'] ?? null,
        ':discount_amount' => $data['discount_amount'] ?? 0.00,
        ':gift_message' => $data['gift_message'] ?? null, // Safely captures the gift message!
        
        ':shipping_name' => $data['shipping']['name'],
        ':shipping_company' => $data['shipping']['company'] ?? null,
        ':shipping_line1' => $data['shipping']['line1'],
        ':shipping_line2' => $data['shipping']['line2'] ?? null,
        ':shipping_city' => $data['shipping']['city'],
        ':shipping_region' => $data['shipping']['region'], 
        ':shipping_zip' => $data['shipping']['zip'],
        ':shipping_country' => $data['shipping']['country'] ?? 'United Kingdom',
        ':shipping_phone' => $data['shipping']['phone'] ?? null,
        
        ':payment_method' => $data['payment_method'] ?? 'Unknown',
        ':payment_status' => $data['payment_status'] ?? 'Pending'
    ]);

    // Get the ID of the order we just created
    $orderId = $conn->lastInsertId();

    // 2. Loop through the cart and insert each item (Capturing the Variant)
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

    // If everything worked perfectly, commit the transaction!
    $conn->commit();

    http_response_code(201);
    echo json_encode(['success' => true, 'message' => 'Order placed successfully!', 'order_id' => $orderId]);

} catch (PDOException $e) {
    // If anything fails, roll back everything so we don't have broken data
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>