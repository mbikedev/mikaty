<?php
require_once '../includes/config.php';
require_once '../includes/auth.php';

// Ensure user is logged in and is a super_admin and username is Mbagnick
$currentUser = getCurrentUser();
if (!isLoggedIn() || $currentUser['role'] !== 'super_admin' || $currentUser['username'] !== 'Mbagnick') {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Unauthorized: Only the super admin Mbagnick can add new admins.'
    ]);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
    exit();
}

// Get and validate input
$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirm_password'] ?? '';
$role = $_POST['role'] ?? 'admin';

// Validate input
$errors = [];

if (empty($username)) {
    $errors[] = 'Username is required';
} elseif (strlen($username) < 3 || strlen($username) > 50) {
    $errors[] = 'Username must be between 3 and 50 characters';
}

if (empty($password)) {
    $errors[] = 'Password is required';
} elseif (strlen($password) < 8) {
    $errors[] = 'Password must be at least 8 characters long';
}

if ($password !== $confirmPassword) {
    $errors[] = 'Passwords do not match';
}

if (!in_array($role, ['admin', 'super_admin'])) {
    $errors[] = 'Invalid role selected';
}

// If there are validation errors, return them
if (!empty($errors)) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => implode(', ', $errors)
    ]);
    exit();
}

try {
    // Check if username already exists
    $stmt = $conn->prepare("SELECT id FROM admin_users WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    
    if ($stmt->fetch()) {
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Username already exists'
        ]);
        exit();
    }
    
    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert the new admin
    $stmt = $conn->prepare("
        INSERT INTO admin_users (username, password, role) 
        VALUES (:username, :password, :role)
    ");
    
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->bindParam(':role', $role);
    
    if ($stmt->execute()) {
        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'message' => 'Admin created successfully'
        ]);
    } else {
        throw new Exception("Failed to create admin");
    }
    
} catch (Exception $e) {
    error_log("Error creating admin: " . $e->getMessage());
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while creating the admin'
    ]);
} 