<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';
$input = json_decode(file_get_contents('php://input'), true);

// Added 'region' to the required check to match add-address.php!
if (!$input || empty($input['id']) || empty($input['user_id']) || empty($input['line1']) || empty($input['city']) || empty($input['region']) || empty($input['zip'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
    exit();
}

try {
    $conn = getDBConnection();
    
    // ADDED `country = :country` TO THE SQL QUERY!
    $stmt = $conn->prepare("
        UPDATE user_addresses 
        SET company = :company, line1 = :line1, line2 = :line2, city = :city, region = :region, zip = :zip, country = :country, phone = :phone 
        WHERE id = :id AND user_id = :user_id
    ");
    
    $stmt->execute([
        ':company' => $input['company'] ?? '',
        ':line1' => $input['line1'],
        ':line2' => $input['line2'] ?? '',
        ':city' => $input['city'],
        ':region' => $input['region'],
        ':zip' => $input['zip'],
        ':country' => $input['country'] ?? 'United Kingdom', // ADDED THIS
        ':phone' => $input['phone'] ?? '',
        ':id' => $input['id'],
        ':user_id' => $input['user_id']
    ]);

    echo json_encode(['success' => true, 'message' => 'Address updated successfully.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>