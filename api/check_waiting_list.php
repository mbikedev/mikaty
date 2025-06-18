<?php
header('Content-Type: text/plain');

// Database configuration
$host = "localhost";
$db = "u734544155_mikaty";
$user = "u734544155_oscar";
$password = "2#^HT?v2kI";

try {
    // Create database connection
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "Database connection successful\n\n";
    
    // Check if table exists
    $stmt = $conn->query("SHOW TABLES LIKE 'WAITING_LIST'");
    if ($stmt->rowCount() == 0) {
        echo "ERROR: WAITING_LIST table does not exist!\n";
        exit;
    }
    echo "WAITING_LIST table exists\n\n";
    
    // Check table structure
    echo "Table Structure:\n";
    $stmt = $conn->query("DESCRIBE WAITING_LIST");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "Column: {$row['Field']}, Type: {$row['Type']}, Null: {$row['Null']}, Key: {$row['Key']}, Default: {$row['Default']}\n";
    }
    echo "\n";
    
    // Check table contents
    echo "Table Contents:\n";
    $stmt = $conn->query("SELECT * FROM WAITING_LIST");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($rows) == 0) {
        echo "No records found in the table\n";
    } else {
        foreach ($rows as $row) {
            echo "Entry ID: {$row['ENTRY_ID']}, Name: {$row['FULL_NAME']}, Mobile: {$row['MOBILE_NUMBER']}, Created: {$row['CREATED_AT']}\n";
        }
    }
    
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
} 