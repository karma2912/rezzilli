<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'config.php';

try {
    $conn = getDBConnection();
    
    // --- CATCH THE TIME RANGE FROM REACT ---
    $range = $_GET['range'] ?? '1 Week';
    $days = 7;
    $sqlInterval = '7 DAY';
    $dateFormat = 'D'; // 'Mon', 'Tue' for short ranges

    switch($range) {
        case '1 Month': $days = 30; $sqlInterval = '1 MONTH'; $dateFormat = 'M d'; break;
        case '3 Months': $days = 90; $sqlInterval = '3 MONTH'; $dateFormat = 'M d'; break;
        case '6 Months': $days = 180; $sqlInterval = '6 MONTH'; $dateFormat = 'M Y'; break;
        case '1 Year': $days = 365; $sqlInterval = '1 YEAR'; $dateFormat = 'M Y'; break;
        default: $days = 7; $sqlInterval = '7 DAY'; $dateFormat = 'D'; break; // 1 Week
    }

    // 1. TOP METRICS
    // Total Revenue
    $revQuery = $conn->query("SELECT SUM(total_amount) as total FROM orders");
    $totalRevenue = $revQuery->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;

    // Orders Today
    $ordersTodayQuery = $conn->query("SELECT COUNT(*) as count FROM orders WHERE DATE(created_at) = CURDATE()");
    $ordersToday = $ordersTodayQuery->fetch(PDO::FETCH_ASSOC)['count'] ?? 0;

    // Top City
    $topCityQuery = $conn->query("SELECT shipping_city, COUNT(*) as count FROM orders GROUP BY shipping_city ORDER BY count DESC LIMIT 1");
    $topCityRow = $topCityQuery->fetch(PDO::FETCH_ASSOC);
    $topCity = $topCityRow ? $topCityRow['shipping_city'] : 'N/A';

    // 2. REVENUE CHART (Dynamic Time Range)
    $chartDataArray = [];
    // Pre-fill the dates with 0 so the chart looks nice even on days with no sales
    for ($i = $days - 1; $i >= 0; $i--) {
        $date = date('Y-m-d', strtotime("-$i days"));
        $chartDataArray[$date] = ["name" => date($dateFormat, strtotime($date)), "value" => 0];
    }
    
    // Using our dynamic $sqlInterval
    $sevDayQuery = $conn->query("SELECT DATE(created_at) as dt, SUM(total_amount) as daily_total FROM orders WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL $sqlInterval) GROUP BY DATE(created_at)");
    
    while($row = $sevDayQuery->fetch(PDO::FETCH_ASSOC)) {
        $dt = $row['dt'];
        if(isset($chartDataArray[$dt])) {
            $chartDataArray[$dt]['value'] = (float)$row['daily_total'];
        }
    }
    $chartData = array_values($chartDataArray);

    // 3. ORDERS BY STATUS (Pie Chart)
    $statusQuery = $conn->query("SELECT status, COUNT(*) as count FROM orders GROUP BY status");
    $statusData = [];
    $colors = ['Processing' => '#f59e0b', 'Shipped' => '#0ea5e9', 'Delivered' => '#10b981']; // Colors match your Tailwind classes
    while($row = $statusQuery->fetch(PDO::FETCH_ASSOC)) {
        $status = $row['status'] ?: 'Processing';
        $statusData[] = [
            "name" => $status,
            "value" => (int)$row['count'],
            "color" => $colors[$status] ?? '#64748b'
        ];
    }

    // 4. TOP LOCATIONS (Bar Chart)
    $locQuery = $conn->query("SELECT shipping_city as name, COUNT(*) as users FROM orders GROUP BY shipping_city ORDER BY users DESC LIMIT 5");
    $locationData = $locQuery->fetchAll(PDO::FETCH_ASSOC);

    // 5. LOW STOCK ALERTS (Products with 15 or less stock)
    $stockQuery = $conn->query("SELECT id, name, variant, stock FROM products WHERE CAST(stock AS UNSIGNED) <= 15 ORDER BY CAST(stock AS UNSIGNED) ASC LIMIT 5");
    $lowStock = [];
    while($row = $stockQuery->fetch(PDO::FETCH_ASSOC)) {
        $lowStock[] = [
            "id" => $row['id'],
            "name" => $row['name'],
            "variant" => $row['variant'],
            "stock" => $row['stock'],
            "status" => $row['stock'] <= 5 ? "Critical" : "Low"
        ];
    }

    // 6. RECENT ORDERS
    $recOrdersQuery = $conn->query("SELECT id, shipping_name, total_amount, status, created_at FROM orders ORDER BY created_at DESC LIMIT 4");
    $recentOrders = [];
    while($row = $recOrdersQuery->fetch(PDO::FETCH_ASSOC)) {
        $recentOrders[] = [
            "id" => "ORD-" . str_pad($row['id'], 4, "0", STR_PAD_LEFT),
            "customer" => $row['shipping_name'],
            "total" => "£" . number_format($row['total_amount'], 2),
            "status" => $row['status'] ?: 'Processing',
            "time" => date("M d, H:i", strtotime($row['created_at']))
        ];
    }

    // Compile everything into one neat JSON package
    echo json_encode([
        'success' => true,
        'metrics' => [
            'revenue' => $totalRevenue,
            'ordersToday' => $ordersToday,
            'topCity' => $topCity
        ],
        'charts' => [
            'revenueHistory' => $chartData,
            'statusBreakdown' => $statusData,
            'topLocations' => $locationData
        ],
        'lowStock' => $lowStock,
        'recentOrders' => $recentOrders
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>