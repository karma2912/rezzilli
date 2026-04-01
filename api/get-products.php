<?php
// 1. ADDED CORS HEADERS so your local Admin panel can talk to it without errors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle the invisible preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    $conn = getDBConnection();
    
    $productId = isset($_GET['id']) ? intval($_GET['id']) : null;

    if ($productId) {
        // Fetch Single Product Details
        $stmt = $conn->prepare("SELECT * FROM products WHERE id = :id");
        $stmt->execute([':id' => $productId]);
        $product = $stmt->fetch(PDO::FETCH_ASSOC); // Added PDO::FETCH_ASSOC for cleaner JSON

        if ($product) {
            $product['description'] = json_decode($product['description'], true);
            $product['delivery'] = json_decode($product['delivery'], true);
            $product['nutrition'] = json_decode($product['nutrition'], true);
            
            http_response_code(200);
            echo json_encode(['success' => true, 'product' => $product]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Product not found']);
        }
    } else {
        // Fetch All Products for the Grid
        // CHANGED: Using SELECT * so the Admin panel gets 'stock', 'variant', etc.
        $stmt = $conn->query("SELECT * FROM products ORDER BY id ASC");
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        http_response_code(200);
        echo json_encode(['success' => true, 'products' => $products]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>