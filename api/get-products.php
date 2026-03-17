<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    $conn = getDBConnection();
    
    // Check if we are asking for a single product or all products
    $productId = isset($_GET['id']) ? intval($_GET['id']) : null;

    if ($productId) {
        // Fetch Single Product Details
        $stmt = $conn->prepare("SELECT * FROM products WHERE id = :id");
        $stmt->execute([':id' => $productId]);
        $product = $stmt->fetch();

        if ($product) {
            // Unpack the JSON data so React can map through it easily
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
        $stmt = $conn->query("SELECT id, name, image, price, old_price, status, created_at FROM products WHERE category = 'Spritz' ORDER BY id ASC");
        $products = $stmt->fetchAll();
        
        http_response_code(200);
        echo json_encode(['success' => true, 'products' => $products]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error.']);
}
?>