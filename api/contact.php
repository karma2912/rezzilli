<?php
// Added CORS Shields!
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

    if (!$data) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
        exit();
    }

    $whoAreYou = trim($data['whoAreYou'] ?? '');
    $firstName = trim($data['firstName'] ?? '');
    $lastName = trim($data['lastName'] ?? '');
    $email = trim($data['email'] ?? '');
    $message = trim($data['message'] ?? '');

    if (empty($whoAreYou) || empty($firstName) || empty($lastName) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid email address']);
        exit();
    }

    $conn = getDBConnection();
    $stmt = $conn->prepare("
        INSERT INTO contact_submissions (who_are_you, first_name, last_name, email, message, created_at)
        VALUES (:who_are_you, :first_name, :last_name, :email, :message, NOW())
    ");

    $stmt->execute([
        ':who_are_you' => $whoAreYou,
        ':first_name' => $firstName,
        ':last_name' => $lastName,
        ':email' => $email,
        ':message' => $message
    ]);

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for getting in touch! Someone from our team will reach out to you. Cheers!'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Something went wrong. Please try again.']);
}
?>