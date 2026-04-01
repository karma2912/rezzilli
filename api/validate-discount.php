<?php
// Added CORS Shields!
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

require_once 'config.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$code = strtoupper(trim($data['code'] ?? ''));
$cartTotal = floatval($data['cartTotal'] ?? 0);

try {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT * FROM discount_codes WHERE code = :code AND status = 'active'");
    $stmt->execute([':code' => $code]);
    $discount = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$discount) {
        throw new Exception("Invalid or expired discount code.");
    }

    // Check Expiry
    if ($discount['expiry_date'] && strtotime($discount['expiry_date']) < time()) {
        throw new Exception("This code has expired.");
    }

    // Check Minimum Purchase
    if ($cartTotal < $discount['min_purchase_amount']) {
        throw new Exception("Minimum spend of £" . $discount['min_purchase_amount'] . " required.");
    }

    // Check Usage Limit
    if ($discount['usage_limit'] && $discount['used_count'] >= $discount['usage_limit']) {
        throw new Exception("This code has reached its usage limit.");
    }

    echo json_encode([
        'success' => true,
        'type' => $discount['type'],
        'value' => (float)$discount['value'],
        'message' => 'Discount applied!'
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>