<?php
// 1. Allow cross-origin requests (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// 2. Intercept the invisible OPTIONS request and stop immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

$input = file_get_contents('php://input');

// 3. THE ULTIMATE SANITY CHECK: Never wipe the database if the input is empty!
if (empty(trim($input)) || $input === '{}') {
    http_response_code(400);
    echo json_encode(['error' => 'No data received. Protecting database from being wiped.']);
    exit();
}

try {
    $conn = getDBConnection();
    $stmt = $conn->prepare("UPDATE site_settings SET setting_value = :val WHERE setting_key = 'homepage_content'");
    $stmt->execute([':val' => $input]);
    
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database Error: ' . $e->getMessage()]);
}
?>