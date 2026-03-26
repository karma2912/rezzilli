<?php
header("Access-Control-Allow-Origin: *"); // Prevents CORS errors on localhost
header("Content-Type: application/json"); // Tells React to expect JSON
require_once 'config.php';

try {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT setting_value FROM site_settings WHERE setting_key = 'homepage_content'");
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Smarter check: Ensure it exists and isn't a blank string
    if ($result && !empty(trim($result['setting_value'])) && $result['setting_value'] !== '{}') {
        echo $result['setting_value']; 
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'No data found']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>