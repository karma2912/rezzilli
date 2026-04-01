<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'config.php';

try {
    $conn = getDBConnection();
    $stmt = $conn->query("SELECT * FROM discount_codes ORDER BY created_at DESC");
    $promotions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Ensure numeric values are sent as numbers to React
    foreach ($promotions as &$promo) {
        $promo['value'] = floatval($promo['value']);
        $promo['min_purchase_amount'] = floatval($promo['min_purchase_amount']);
        $promo['usage_limit'] = $promo['usage_limit'] ? intval($promo['usage_limit']) : null;
        $promo['used_count'] = intval($promo['used_count']);
    }
    
    echo json_encode(['success' => true, 'promotions' => $promotions]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>