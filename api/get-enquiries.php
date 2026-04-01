<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'config.php';

try {
    $conn = getDBConnection();
    // Fetch all submissions, newest first
    $stmt = $conn->query("SELECT * FROM contact_submissions ORDER BY created_at DESC");
    $enquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $formatted = [];
    foreach ($enquiries as $enq) {
        $formatted[] = [
            "id" => "ENQ-" . str_pad($enq['id'], 4, "0", STR_PAD_LEFT),
            "raw_id" => $enq['id'],
            "firstName" => $enq['first_name'],
            "lastName" => $enq['last_name'],
            "email" => $enq['email'],
            "whoAreYou" => $enq['who_are_you'],
            "message" => $enq['message'],
            "date" => date("M d, Y", strtotime($enq['created_at'])),
            "status" => $enq['status'] ?? 'New'
        ];
    }
    echo json_encode(['success' => true, 'enquiries' => $formatted]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>