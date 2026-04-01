<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

try {
    $conn = getDBConnection();
    
    // 1. Fetch all users who are customers
    $stmt = $conn->query("SELECT id, name, email, created_at, status FROM users WHERE role = 'customer' ORDER BY created_at DESC");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $formattedCustomers = [];

    // --- NEW: Prepare the items statement ONCE for performance ---
    $itemStmt = $conn->prepare("SELECT product_name, variant, quantity, price, image FROM order_items WHERE order_id = :order_id");

    foreach ($users as $user) {
        $userId = $user['id'];
        
        // 2. Fetch their default address
        $addrStmt = $conn->prepare("SELECT * FROM user_addresses WHERE user_id = :uid AND is_default = 1 LIMIT 1");
        $addrStmt->execute([':uid' => $userId]);
        $address = $addrStmt->fetch(PDO::FETCH_ASSOC);

        // Variables to track order totals
        $totalOrders = 0;
        $lifetimeValue = 0.00;
        $recentOrders = [];

        // 3. Safely fetch their orders
        try {
            // --- UPDATED: Added shipping_fee, discount_amount, and gift_message to the query ---
            $orderStmt = $conn->prepare("SELECT id, total_amount, shipping_fee, discount_amount, gift_message, status, created_at FROM orders WHERE user_id = :uid ORDER BY created_at DESC");
            $orderStmt->execute([':uid' => $userId]);
            $orders = $orderStmt->fetchAll(PDO::FETCH_ASSOC);

            $totalOrders = count($orders);
            
            foreach ($orders as $order) {
                $orderTotal = floatval($order['total_amount']);
                $shippingFee = floatval($order['shipping_fee'] ?? 0);
                $discountAmt = floatval($order['discount_amount'] ?? 0);
                $lifetimeValue += $orderTotal;
                
                // --- NEW: Fetch the specific items for this order ---
                $itemStmt->execute([':order_id' => $order['id']]);
                $itemsRaw = $itemStmt->fetchAll(PDO::FETCH_ASSOC);
                
                $items = [];
                $subtotal = 0;
                foreach ($itemsRaw as $it) {
                    $itemPrice = floatval($it['price']);
                    $itemQty = intval($it['quantity']);
                    
                    $items[] = [
                        "name" => $it['product_name'],
                        "variant" => $it['variant'],
                        "price" => $itemPrice,
                        "quantity" => $itemQty,
                        "image" => $it['image']
                    ];
                    $subtotal += ($itemPrice * $itemQty);
                }
                
                // Format the order to match the React UI exactly
                $recentOrders[] = [
                    "id" => "ORD-" . str_pad($order['id'], 4, "0", STR_PAD_LEFT),
                    "date" => date("M d, Y", strtotime($order['created_at'])),
                    "total" => "£" . number_format($orderTotal, 2),
                    "status" => $order['status'] ?: 'Processing',
                    
                    // --- FIXED: Pass the real items and dynamic math ---
                    "items" => $items, 
                    "financials" => [
                        "subtotal" => $subtotal, 
                        "shipping" => $shippingFee, 
                        "discount" => $discountAmt, 
                        "total" => $orderTotal
                    ],
                    "gift_message" => $order['gift_message'],
                    "payment_method" => "Card"
                ];
            }
        } catch (Exception $e) {
            // Ignore order fetching errors if the orders table isn't fully set up yet
        }

        // 4. Package the data into the EXACT shape React wants
        $formattedCustomers[] = [
            "id" => "CUST-" . str_pad($userId, 3, "0", STR_PAD_LEFT),
            "name" => $user['name'],
            "email" => $user['email'],
            "phone" => $address ? $address['phone'] : "No phone",
            "status" => $user['status'] ?? "Active",
            "joined_date" => date("M d, Y", strtotime($user['created_at'])),
            "lifetime_value" => $lifetimeValue,
            "total_orders" => $totalOrders,
            "avg_order_value" => $totalOrders > 0 ? ($lifetimeValue / $totalOrders) : 0.00,
            "address" => $address ? [
                "line1" => $address['line1'],
                "city" => $address['city'],
                "region" => $address['region'],
                "zip" => $address['zip'],
                "country" => $address['country']
            ] : null,
            "recent_orders" => $recentOrders
        ];
    }
    
    echo json_encode([
        'success' => true,
        'customers' => $formattedCustomers
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
?>