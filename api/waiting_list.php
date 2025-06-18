<?php
// Suppress warnings and notices
error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'waiting_list_errors.log');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration
$host = "localhost";
$db = "u734544155_mikaty";
$user = "u734544155_oscar";
$password = "2#^HT?v2kI";

// Log the incoming request
$raw_data = file_get_contents('php://input');
error_log("=== New Request at " . date('Y-m-d H:i:s') . " ===");
error_log("Raw POST data: " . $raw_data);
error_log("Request method: " . $_SERVER['REQUEST_METHOD']);
error_log("Content type: " . (isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : 'not set'));

// Create database connection
try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    error_log("Database connection successful");
    
    // Check if table exists
    $stmt = $conn->query("SHOW TABLES LIKE 'WAITING_LIST'");
    if ($stmt->rowCount() == 0) {
        throw new Exception("WAITING_LIST table does not exist");
    }
    error_log("WAITING_LIST table exists");
    
    // Check table structure
    $stmt = $conn->query("DESCRIBE WAITING_LIST");
    $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
    error_log("Table columns: " . print_r($columns, true));
    
} catch(Exception $e) {
    error_log("Database connection or table check failed: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Database setup error: ' . $e->getMessage()]);
    exit();
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data from request body
    $data = json_decode($raw_data, true);
    error_log("Decoded data: " . print_r($data, true));
    
    // Validate required fields
    if (!isset($data['full_name']) || !isset($data['mobile_number'])) {
        error_log("Missing required fields. Data received: " . print_r($data, true));
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit();
    }
    
    // Sanitize input using htmlspecialchars instead of deprecated FILTER_SANITIZE_STRING
    $full_name = htmlspecialchars($data['full_name'], ENT_QUOTES, 'UTF-8');
    $mobile_number = htmlspecialchars($data['mobile_number'], ENT_QUOTES, 'UTF-8');
    
    error_log("Sanitized data - Full Name: $full_name, Mobile: $mobile_number");
    
    try {
        // Begin transaction
        $conn->beginTransaction();
        error_log("Transaction started");
        
        // First, check if the mobile number already exists
        $check_sql = "SELECT COUNT(*) FROM WAITING_LIST WHERE MOBILE_NUMBER = :mobile_number";
        $check_stmt = $conn->prepare($check_sql);
        $check_stmt->bindParam(':mobile_number', $mobile_number);
        $check_stmt->execute();
        $exists = $check_stmt->fetchColumn();
        error_log("Mobile number exists check result: " . ($exists ? "true" : "false"));
        
        if ($exists) {
            throw new Exception("This mobile number is already registered");
        }
        
        // Prepare SQL statement with exact column names
        $sql = "INSERT INTO `WAITING_LIST` (`FULL_NAME`, `MOBILE_NUMBER`, `CREATED_AT`) VALUES (:full_name, :mobile_number, NOW())";
        error_log("SQL Query: " . $sql);
        
        $stmt = $conn->prepare($sql);
        error_log("Statement prepared");
        
        // Bind parameters
        $stmt->bindParam(':full_name', $full_name);
        $stmt->bindParam(':mobile_number', $mobile_number);
        error_log("Parameters bound");
        
        // Execute the statement
        $result = $stmt->execute();
        error_log("Query execution result: " . ($result ? "true" : "false"));
        
        if ($result) {
            // Commit transaction
            $conn->commit();
            error_log("Transaction committed");
            
            // Get the ID of the inserted record
            $entry_id = $conn->lastInsertId();
            error_log("Successfully inserted record with ID: " . $entry_id);
            
            // Verify the insert
            $verify = $conn->query("SELECT * FROM WAITING_LIST WHERE ENTRY_ID = " . $entry_id);
            $row = $verify->fetch(PDO::FETCH_ASSOC);
            error_log("Verified inserted row: " . print_r($row, true));
            
            // Return success response
            echo json_encode([
                'success' => true,
                'message' => 'Registration successful',
                'entry_id' => $entry_id
            ]);
        } else {
            // Rollback transaction
            $conn->rollBack();
            error_log("Query execution failed without throwing an exception");
            throw new PDOException("Query execution failed");
        }
        
    } catch(PDOException $e) {
        // Rollback transaction
        if ($conn->inTransaction()) {
            $conn->rollBack();
            error_log("Transaction rolled back due to PDOException");
        }
        
        error_log("Database error: " . $e->getMessage());
        error_log("SQL State: " . $e->getCode());
        http_response_code(500);
        echo json_encode([
            'error' => 'Failed to save data: ' . $e->getMessage(),
            'sql_state' => $e->getCode()
        ]);
    } catch(Exception $e) {
        // Rollback transaction
        if ($conn->inTransaction()) {
            $conn->rollBack();
            error_log("Transaction rolled back due to Exception");
        }
        
        error_log("General error: " . $e->getMessage());
        http_response_code(400);
        echo json_encode([
            'error' => $e->getMessage()
        ]);
    }
} else {
    error_log("Invalid request method: " . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
} 