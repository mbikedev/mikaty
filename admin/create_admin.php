<?php
require_once 'includes/config.php';

try {
    // New admin credentials
    $username = 'mikaty_admin';
    $password = 'Mikaty@2024';
    
    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Prepare the SQL statement
    $stmt = $conn->prepare("INSERT INTO admin_users (username, password, role) VALUES (:username, :password, 'super_admin')");
    
    // Bind parameters
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $hashed_password);
    
    // Execute the statement
    $stmt->execute();
    
    echo "New admin account created successfully!<br>";
    echo "Username: mikaty_admin<br>";
    echo "Password: Mikaty@2024<br>";
    echo "<br>Please change these credentials after your first login for security reasons.";
    
} catch(PDOException $e) {
    if ($e->getCode() == 23000) { // Duplicate entry error
        echo "An admin account with this username already exists. Please try a different username.";
    } else {
        die("Setup failed: " . $e->getMessage());
    }
} 