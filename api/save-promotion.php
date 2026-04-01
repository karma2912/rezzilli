<?php
// 1. CORS SHIELDS (Must be the very first thing in the file!)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 2. Intercept the Preflight Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { 
    http_response_code(200); 
    exit(); 
}

require_once 'config.php';
$input = json_decode(file_get_contents('php://input'), true);

// 3. Validation
if (!$input || empty($input['code']) || empty($input['value'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Code and Value are required.']);
    exit();
}

try {
    $conn = getDBConnection();
    
    $code = strtoupper(trim($input['code']));
    $expiry_date = !empty($input['expiry_date']) ? $input['expiry_date'] : null;
    $usage_limit = !empty($input['usage_limit']) ? intval($input['usage_limit']) : null;

    if (!empty($input['id'])) {
        // UPDATE EXISTING PROMO
        $stmt = $conn->prepare("UPDATE discount_codes SET 
            code = :code, type = :type, value = :value, 
            min_purchase_amount = :min_purchase_amount, 
            expiry_date = :expiry_date, usage_limit = :usage_limit, status = :status 
            WHERE id = :id");
            
        $stmt->execute([
            ':code' => $code, 
            ':type' => $input['type'], 
            ':value' => floatval($input['value']),
            ':min_purchase_amount' => floatval($input['min_purchase_amount']),
            ':expiry_date' => $expiry_date, 
            ':usage_limit' => $usage_limit, 
            ':status' => $input['status'], 
            ':id' => $input['id']
        ]);
    } else {
        // INSERT NEW PROMO
        // Ensure code doesn't already exist
        $checkStmt = $conn->prepare("SELECT id FROM discount_codes WHERE code = :code");
        $checkStmt->execute([':code' => $code]);
        if ($checkStmt->fetch()) {
            echo json_encode(['success' => false, 'message' => 'This code already exists!']);
            exit();
        }

        // Added used_count = 0 to prevent strict mode database errors!
        $stmt = $conn->prepare("INSERT INTO discount_codes 
            (code, type, value, min_purchase_amount, expiry_date, usage_limit, used_count, status) 
            VALUES (:code, :type, :value, :min_purchase_amount, :expiry_date, :usage_limit, 0, :status)");
            
        $stmt->execute([
            ':code' => $code, 
            ':type' => $input['type'], 
            ':value' => floatval($input['value']),
            ':min_purchase_amount' => floatval($input['min_purchase_amount']),
            ':expiry_date' => $expiry_date, 
            ':usage_limit' => $usage_limit, 
            ':status' => $input['status']
        ]);
    }
    
    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>