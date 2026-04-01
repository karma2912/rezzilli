<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['name'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid product data.']);
    exit();
}

try {
    $conn = getDBConnection();
    
    // Safely encode JSON fields
    $description = isset($data['description']) ? json_encode($data['description']) : null;
    $delivery = isset($data['delivery']) ? json_encode($data['delivery']) : null;
    $nutrition = isset($data['nutrition']) ? json_encode($data['nutrition']) : null;

    // Safely cast numbers (If user leaves the box empty, default to 0 to prevent SQL crashes)
    $price = empty($data['price']) ? 0.00 : floatval($data['price']);
    $old_price = empty($data['old_price']) ? null : floatval($data['old_price']);
    $stock = empty($data['stock']) ? 0 : intval($data['stock']);

    if (isset($data['id']) && !empty($data['id'])) {
        // UPDATE EXISTING PRODUCT
        $sql = "UPDATE products SET 
                name = :name, tagline = :tagline, variant = :variant, price = :price, 
                old_price = :old_price, abv = :abv, size = :size, status = :status, 
                stock = :stock, image = :image, description = :description, 
                delivery = :delivery, nutrition = :nutrition 
                WHERE id = :id";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ':name' => $data['name'], ':tagline' => $data['tagline'], ':variant' => $data['variant'],
            ':price' => $price, ':old_price' => $old_price, ':abv' => $data['abv'], 
            ':size' => $data['size'], ':status' => $data['status'], ':stock' => $stock, 
            ':image' => $data['image'], ':description' => $description, 
            ':delivery' => $delivery, ':nutrition' => $nutrition, ':id' => $data['id']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Product updated successfully.']);
    } else {
        // INSERT NEW PRODUCT
        $sql = "INSERT INTO products 
                (name, tagline, variant, price, old_price, abv, size, status, stock, image, description, delivery, nutrition, category) 
                VALUES 
                (:name, :tagline, :variant, :price, :old_price, :abv, :size, :status, :stock, :image, :description, :delivery, :nutrition, 'Spritz')";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ':name' => $data['name'], ':tagline' => $data['tagline'], ':variant' => $data['variant'],
            ':price' => $price, ':old_price' => $old_price, ':abv' => $data['abv'], 
            ':size' => $data['size'], ':status' => $data['status'], ':stock' => $stock, 
            ':image' => $data['image'], ':description' => $description, 
            ':delivery' => $delivery, ':nutrition' => $nutrition
        ]);
        
        echo json_encode(['success' => true, 'message' => 'New product created successfully.']);
    }

} catch (Exception $e) {
    http_response_code(500);
    // This will now print the EXACT SQL error in your console if it ever fails again!
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>