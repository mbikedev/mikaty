-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'super_admin') NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert new admin user (username: mikaty_admin, password: Mikaty@2024)
-- The password is hashed using PHP's password_hash() function
INSERT INTO admin_users (username, password, role) 
VALUES ('mikaty_admin', '$2y$10$YourNewHashedPasswordHere', 'super_admin')
ON DUPLICATE KEY UPDATE username = username; 