<?php
require_once 'config.php';

try {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT setting_value FROM site_settings WHERE setting_key = 'homepage_content'");
    $stmt->execute();
    $result = $stmt->fetch();

    if ($result && $result['setting_value'] !== '{}') {
        echo $result['setting_value']; // Already JSON
    } else {
        echo json_encode(['error' => 'No data found']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>