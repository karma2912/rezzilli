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
    
    // Fetch all orders
    $stmt = $conn->query("SELECT * FROM orders ORDER BY created_at DESC");
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $formattedOrders = [];
    
    foreach ($orders as $order) {
        $rawId = $order['id'];
        
        // Fetch the items for this specific order
        $itemStmt = $conn->prepare("SELECT * FROM order_items WHERE order_id = :oid");
        $itemStmt->execute([':oid' => $rawId]);
        $items = $itemStmt->fetchAll(PDO::FETCH_ASSOC);
        
        $formattedItems = [];
        foreach ($items as $item) {
            $formattedItems[] = [
                "name" => $item['product_name'],
                "variant" => $item['variant'],
                "quantity" => intval($item['quantity']),
                "price" => floatval($item['price']),
                "image" => $item['image']
            ];
        }
        
        // Calculate Financials based on your columns
        $total = floatval($order['total_amount']);
        $shipping = floatval($order['shipping_fee']);
        $discount = floatval($order['discount_amount']);
        // Subtotal = Final Total - Shipping + Discount
        $subtotal = $total - $shipping + $discount;
        
        $formattedOrders[] = [
            "raw_id" => $rawId, // Keep this hidden so we can use it for status updates!
            "id" => "ORD-" . str_pad($rawId, 4, "0", STR_PAD_LEFT),
            "date" => date("F d, Y", strtotime($order['created_at'])),
            "customer" => $order['shipping_name'] ?: 'Unknown',
            "email" => $order['email'],
            "total" => "£" . number_format($total, 2),
            "status" => $order['status'] ?: 'Processing',
            "payment_method" => $order['payment_method'],
            "gift_message" => $order['gift_message'],
            "shipping" => [
                "name" => $order['shipping_name'],
                "line1" => $order['shipping_line1'],
                "line2" => $order['shipping_line2'],
                "city" => $order['shipping_city'],
                "region" => $order['shipping_region'],
                "zip" => $order['shipping_zip'],
                "country" => $order['shipping_country'],
                "phone" => $order['shipping_phone']
            ],
            "items" => $formattedItems,
            "financials" => [
                "subtotal" => $subtotal,
                "shipping" => $shipping,
                "discount" => $discount,
                "total" => $total
            ]
        ];
    }
    
    echo json_encode(['success' => true, 'orders' => $formattedOrders]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
?>