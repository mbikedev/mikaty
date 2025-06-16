<?php
require_once 'includes/config.php';

try {
    // Read the SQL file
    $sql = file_get_contents('setup_admin.sql');
    
    // Execute the SQL
    $conn->exec($sql);
    
    echo "Admin setup completed successfully!<br>";
    echo "Default admin credentials:<br>";
    echo "Username: admin<br>";
    echo "Password: admin123<br>";
    echo "<br>Please change these credentials after your first login for security reasons.";
    
} catch(PDOException $e) {
    die("Setup failed: " . $e->getMessage());
} 