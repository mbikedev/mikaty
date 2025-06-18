<?php
// Database configuration
$host = "localhost";
$db = "u734544155_mikaty";
$user = "u734544155_oscar";
$password = "2#^HT?v2kI";

try {
    // Create database connection
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Read the SQL file
    $sql = file_get_contents('setup_waiting_list.sql');
    
    // Execute the SQL
    $conn->exec($sql);
    
    echo "WAITING_LIST table setup completed successfully!";
    
} catch(PDOException $e) {
    die("Setup failed: " . $e->getMessage());
} 