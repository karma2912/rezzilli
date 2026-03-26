<?php
require_once 'config.php';

$input = file_get_contents('php://input');

try {
    $conn = getDBConnection();
    $stmt = $conn->prepare("UPDATE site_settings SET setting_value = :val WHERE setting_key = 'homepage_content'");
    $stmt->execute([':val' => $input]);
    
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>