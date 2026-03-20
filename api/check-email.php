<?php
require_once 'config.php'; // Your DB connection file

$email = $_GET['email'] ?? '';

if (empty($email)) {
    echo json_encode(['exists' => false]);
    exit;
}

try {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = :email LIMIT 1");
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch();

    echo json_encode(['exists' => $user ? true : false]);
} catch (Exception $e) {
    echo json_encode(['exists' => false, 'error' => $e->getMessage()]);
}
?>