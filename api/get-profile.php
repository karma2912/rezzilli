<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$userId = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

if ($userId <= 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid user ID']);
    exit();
}

try {
    $conn = getDBConnection();
    
    $stmt = $conn->prepare("
        SELECT * FROM user_addresses 
        WHERE user_id = :user_id 
        ORDER BY is_default DESC, id DESC
    ");
    
    $stmt->execute([':user_id' => $userId]);
    $addresses = $stmt->fetchAll();

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'addresses' => $addresses
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error. Please try again.']);
}
?>