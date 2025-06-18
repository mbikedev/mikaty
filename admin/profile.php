<?php
require_once 'includes/header.php';

// Initialize variables
$currentUser = getCurrentUser();
$error = null;
$success = null;

// Handle password update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_password'])) {
    $currentPassword = $_POST['current_password'] ?? '';
    $newPassword = $_POST['new_password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';
    
    try {
        // Verify current password
        $stmt = $conn->prepare("SELECT password FROM admin_users WHERE id = :id");
        $stmt->bindParam(':id', $currentUser['id']);
        $stmt->execute();
        
        if ($user = $stmt->fetch(PDO::FETCH_ASSOC)) {
            if (password_verify($currentPassword, $user['password'])) {
                // Verify new passwords match
                if ($newPassword === $confirmPassword) {
                    // Update password
                    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                    $updateStmt = $conn->prepare("UPDATE admin_users SET password = :password WHERE id = :id");
                    $updateStmt->bindParam(':password', $hashedPassword);
                    $updateStmt->bindParam(':id', $currentUser['id']);
                    
                    if ($updateStmt->execute()) {
                        $success = "Password updated successfully!";
                    } else {
                        $error = "Failed to update password. Please try again.";
                    }
                } else {
                    $error = "New passwords do not match.";
                }
            } else {
                $error = "Current password is incorrect.";
            }
        }
    } catch(PDOException $e) {
        error_log("Password update error: " . $e->getMessage());
        $error = "An error occurred while updating the password.";
    }
}

function getInitials($fullName) {
    $parts = explode(' ', trim($fullName));
    $initials = '';
    foreach ($parts as $p) {
        if (!empty($p)) {
            $initials .= strtoupper($p[0]) . '.';
        }
    }
    return $initials;
}
?>

<?php if ($error): ?>
<div class="alert alert-danger" role="alert">
    <?php echo htmlspecialchars($error); ?>
</div>
<?php endif; ?>

<?php if ($success): ?>
<div class="alert alert-success" role="alert">
    <?php echo htmlspecialchars($success); ?>
</div>
<?php endif; ?>

<div class="row">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Profile Information</h5>
            </div>
            <div class="card-body">
                <div class="mb-4">
                    <div class="d-flex align-items-center mb-3">
                        <div class="flex-shrink-0">
                            <div class="profile-image d-flex align-items-center justify-content-center bg-primary text-white" style="font-size:2rem;">
                                <?php echo getInitials($currentUser['username']); ?>
                            </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h4 class="mb-1"><?php echo getInitials($currentUser['username']); ?></h4>
                            <span class="badge bg-<?php echo $currentUser['role'] === 'super_admin' ? 'danger' : 'info'; ?>">
                                <?php echo ucfirst($currentUser['role']); ?>
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="mb-3">
                    <label class="form-label text-muted">Username</label>
                    <div class="form-control-plaintext"><?php echo htmlspecialchars($currentUser['username']); ?></div>
                </div>
                
                <div class="mb-3">
                    <label class="form-label text-muted">Role</label>
                    <div class="form-control-plaintext"><?php echo ucfirst($currentUser['role']); ?></div>
                </div>
                
                <div class="mb-3">
                    <label class="form-label text-muted">Account ID</label>
                    <div class="form-control-plaintext"><?php echo $currentUser['id']; ?></div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Update Password</h5>
            </div>
            <div class="card-body">
                <form method="POST" action="">
                    <div class="mb-3">
                        <label for="current_password" class="form-label">Current Password</label>
                        <input type="password" class="form-control" id="current_password" name="current_password" required>
                    </div>
                    
                    <div class="mb-3">
                        <label for="new_password" class="form-label">New Password</label>
                        <input type="password" class="form-control" id="new_password" name="new_password" required>
                    </div>
                    
                    <div class="mb-3">
                        <label for="confirm_password" class="form-label">Confirm New Password</label>
                        <input type="password" class="form-control" id="confirm_password" name="confirm_password" required>
                    </div>
                    
                    <button type="submit" name="update_password" class="btn btn-primary">
                        <i class="fas fa-key"></i> Update Password
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<style>
.profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

<?php require_once 'includes/footer.php'; ?> 