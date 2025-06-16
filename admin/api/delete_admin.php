<?php
// Start output buffering
ob_start();

// Disable error reporting to prevent HTML errors in JSON response
error_reporting(0);
ini_set('display_errors', 0);

// Set JSON content type
header('Content-Type: application/json');

// Include required files
require_once '../includes/config.php';
require_once '../includes/auth.php';

// Function to send JSON response
function sendJsonResponse($success, $message) {
    ob_clean(); // Clear any previous output
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

// Check if user is logged in and is a super admin
if (!isLoggedIn() || getCurrentUser()['role'] !== 'super_admin') {
    sendJsonResponse(false, 'Not authorized');
}

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Invalid request method');
}

// Validate input
if (!isset($_POST['id']) || !is_numeric($_POST['id'])) {
    sendJsonResponse(false, 'Invalid admin ID');
}

$id = (int)$_POST['id'];

// Prevent self-deletion
if ($id === (int)getCurrentUser()['id']) {
    sendJsonResponse(false, 'Cannot delete your own account');
}

try {
    // Check if admin exists
    $checkStmt = $conn->prepare("SELECT id, role FROM admin_users WHERE id = ?");
    $checkStmt->execute([$id]);
    $admin = $checkStmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$admin) {
        sendJsonResponse(false, 'Admin not found');
    }
    
    // Check if this is the last super admin
    if ($admin['role'] === 'super_admin') {
        $superAdminCount = $conn->query("SELECT COUNT(*) FROM admin_users WHERE role = 'super_admin'")->fetchColumn();
        if ($superAdminCount <= 1) {
            sendJsonResponse(false, 'Cannot delete the last super admin');
        }
    }
    
    // Delete the admin
    $stmt = $conn->prepare("DELETE FROM admin_users WHERE id = ?");
    $stmt->execute([$id]);
    
    if ($stmt->rowCount() > 0) {
        sendJsonResponse(true, 'Admin deleted successfully');
    } else {
        sendJsonResponse(false, 'Failed to delete admin');
    }
    
} catch(PDOException $e) {
    error_log("Delete admin error: " . $e->getMessage());
    sendJsonResponse(false, 'Database error occurred');
} 