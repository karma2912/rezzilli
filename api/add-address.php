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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Validate that the absolutely required fields are present
    if (empty($data['user_id']) || empty($data['line1']) || empty($data['city']) || empty($data['region']) || empty($data['zip'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        exit();
    }

    $conn = getDBConnection();

    // Smart Feature: Check if this is their first address. If it is, make it their "Default" address automatically!
    $stmt = $conn->prepare("SELECT COUNT(*) FROM user_addresses WHERE user_id = :user_id");
    $stmt->execute([':user_id' => $data['user_id']]);
    $count = $stmt->fetchColumn();
    $isDefault = ($count == 0) ? 1 : 0;

    // Insert the address into the database
    $stmt = $conn->prepare("
        INSERT INTO user_addresses (user_id, company, line1, line2, city, region, zip, country, phone, is_default)
        VALUES (:user_id, :company, :line1, :line2, :city, :region, :zip, :country, :phone, :is_default)
    ");
    
    $stmt->execute([
        ':user_id' => $data['user_id'],
        ':company' => $data['company'] ?? '',
        ':line1' => $data['line1'],
        ':line2' => $data['line2'] ?? '',
        ':city' => $data['city'],
        ':region' => $data['region'],
        ':zip' => $data['zip'],
        ':country' => $data['country'] ?? 'United Kingdom',
        ':phone' => $data['phone'] ?? '',
        ':is_default' => $isDefault
    ]);

    http_response_code(201);
    echo json_encode(['success' => true, 'message' => 'Address added successfully!']);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error. Please try again.']);
}
?>