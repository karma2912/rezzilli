<?php
require_once 'config.php';

// Ensure it's a GET request
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Grab the user_id from the URL (e.g., ?user_id=1)
$userId = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

if ($userId <= 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid user ID']);
    exit();
}

try {
    $conn = getDBConnection();
    
    // 1. Fetch all addresses for this specific user, putting their "Default" address at the top
    $stmtAddr = $conn->prepare("
        SELECT * FROM user_addresses 
        WHERE user_id = :user_id 
        ORDER BY is_default DESC, id DESC
    ");
    
    $stmtAddr->execute([':user_id' => $userId]);
    $addresses = $stmtAddr->fetchAll();

    // 2. Fetch all orders for this user, putting the newest orders at the top
    $stmtOrders = $conn->prepare("
        SELECT * FROM orders 
        WHERE user_id = :user_id 
        ORDER BY id DESC
    ");
    $stmtOrders->execute([':user_id' => $userId]);
    $rawOrders = $stmtOrders->fetchAll();

    $formattedOrders = [];

    // Prepare the items statement once to run inside the loop efficiently
    $stmtItems = $conn->prepare("SELECT * FROM order_items WHERE order_id = :order_id");

    // 3. For each order, fetch the exact items purchased and format the data
    foreach ($rawOrders as $order) {
        $stmtItems->execute([':order_id' => $order['id']]);
        $items = $stmtItems->fetchAll();

        // Format the date nicely for the frontend (e.g., "March 18, 2026")
        $dateObj = new DateTime($order['created_at']);
        $formattedDate = $dateObj->format('F j, Y');

        // Package the order exactly how your React UI expects it
        $formattedOrders[] = [
            'id' => 'ORD-' . str_pad($order['id'], 4, '0', STR_PAD_LEFT), // e.g., ORD-0012
            'date' => $formattedDate,
            'status' => $order['status'],
            'total' => '£' . number_format($order['total_amount'], 2),
            'items' => array_map(function($item) {
                return [
                    'name' => $item['product_name'],
                    'quantity' => $item['quantity'],
                    'image' => $item['image'],
                    'variant' => $item['variant']
                ];
            }, $items)
        ];
    }

    // 4. Send everything back to React!
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'addresses' => $addresses,
        'orders' => $formattedOrders
    ]);

} catch (PDOException $e) {
    // Return specific error message during development for easier debugging
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>