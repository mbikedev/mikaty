<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'u734544155_oscar');
define('DB_PASS', '2#^HT?v2kI');
define('DB_NAME', 'u734544155_mikaty');

// Create database connection
try {
    $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Set default timezone
date_default_timezone_set('UTC');

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1); 