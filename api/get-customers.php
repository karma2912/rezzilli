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
    // Note: Adjusting query to fetch the newly added 'status' column
    $stmt = $conn->query("SELECT id, name, email, created_at, status FROM users WHERE role = 'customer' ORDER BY created_at DESC");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $formattedCustomers = [];

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

        // 3. Safely fetch their orders (Wrapped in a try/catch just in case your orders table is empty/missing columns)
        try {
            $orderStmt = $conn->prepare("SELECT id, total_amount, status, created_at FROM orders WHERE user_id = :uid ORDER BY created_at DESC");
            $orderStmt->execute([':uid' => $userId]);
            $orders = $orderStmt->fetchAll(PDO::FETCH_ASSOC);

            $totalOrders = count($orders);
            
            foreach ($orders as $order) {
                $orderTotal = floatval($order['total_amount']);
                $lifetimeValue += $orderTotal;
                
                // Format the order to match the React UI exactly
                $recentOrders[] = [
                    "id" => "ORD-" . str_pad($order['id'], 4, "0", STR_PAD_LEFT),
                    "date" => date("M d, Y", strtotime($order['created_at'])),
                    "total" => "£" . number_format($orderTotal, 2),
                    "status" => $order['status'], // e.g., 'Delivered', 'Processing'
                    
                    // Note: If you want specific items later, you'll join the order_items table here.
                    // For now, we pass an empty array so the UI doesn't crash when clicking "View Order"
                    "items" => [], 
                    "financials" => [
                        "subtotal" => $orderTotal, 
                        "shipping" => 0, 
                        "discount" => 0, 
                        "total" => $orderTotal
                    ],
                    "gift_message" => null,
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