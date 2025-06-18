<?php
// Start output buffering
ob_start();

// Disable error reporting to prevent HTML errors in JSON response
error_reporting(0);
ini_set('display_errors', 0);

// Set JSON content type
header('Content-Type: application/json');

// Function to send JSON response
function sendJsonResponse($success, $message) {
    ob_clean(); // Clear any previous output
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

// Check if user is logged in
session_start();
if (!isset($_SESSION['admin_id'])) {
    sendJsonResponse(false, 'Not authenticated');
}

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Invalid request method');
}

// Validate input
if (!isset($_POST['id']) || !is_numeric($_POST['id'])) {
    sendJsonResponse(false, 'Invalid user ID');
}

$id = (int)$_POST['id'];

try {
    // Include database configuration
    require_once '../includes/config.php';
    
    // Create database connection
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check if user exists
    $checkStmt = $conn->prepare("SELECT ENTRY_ID FROM WAITING_LIST WHERE ENTRY_ID = ?");
    $checkStmt->execute([$id]);
    if (!$checkStmt->fetch()) {
        sendJsonResponse(false, 'User not found');
    }
    
    // Delete the user
    $stmt = $conn->prepare("DELETE FROM WAITING_LIST WHERE ENTRY_ID = ?");
    $stmt->execute([$id]);
    
    if ($stmt->rowCount() > 0) {
        sendJsonResponse(true, 'User deleted successfully');
    } else {
        sendJsonResponse(false, 'Failed to delete user');
    }
    
} catch(PDOException $e) {
    error_log("Delete user error: " . $e->getMessage());
    sendJsonResponse(false, 'Database error occurred');
} 