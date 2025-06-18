<?php
require_once 'includes/header.php';

// Initialize variables
$admins = [];
$error = null;
$success = null;
$currentUser = getCurrentUser();

// Get admin list
try {
    // Test database connection
    if (!$conn) {
        throw new Exception("Database connection not established");
    }

    // Get all admins
    $stmt = $conn->query("
        SELECT id, username, role, created_at 
        FROM admin_users 
        ORDER BY created_at DESC
    ");
    
    if ($stmt) {
        $admins = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
} catch(Exception $e) {
    error_log("Error loading admin data: " . $e->getMessage());
    $error = "Error loading admin data: " . $e->getMessage();
}

// Check if we're in "new admin" mode
$isNewAdmin = isset($_GET['action']) && $_GET['action'] === 'new';
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

<?php if ($isNewAdmin && $currentUser['username'] === 'Mbagnick'): ?>
<!-- Add New Admin Form -->
<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Add New Admin</h5>
        <a href="admins.php" class="btn btn-secondary btn-sm">
            <i class="fas fa-arrow-left"></i> Back to List
        </a>
    </div>
    <div class="card-body">
        <form id="addAdminForm" action="api/add_admin.php" method="POST">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" name="username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
            <div class="mb-3">
                <label for="confirm_password" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirm_password" name="confirm_password" required>
            </div>
            <div class="mb-3">
                <label for="role" class="form-label">Role</label>
                <select class="form-select" id="role" name="role" required>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">
                <i class="fas fa-save"></i> Create Admin
            </button>
        </form>
    </div>
</div>
<?php elseif ($isNewAdmin): ?>
<div class="alert alert-danger mt-4">Only the super admin Mbagnick can add new admins.</div>
<?php endif; ?>

<?php if (!$isNewAdmin): ?>
<!-- Admin List -->
<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Admin Users</h5>
        <?php if ($currentUser['username'] === 'Mbagnick'): ?>
        <a href="admins.php?action=new" class="btn btn-success btn-sm">
            <i class="fas fa-plus"></i> Add New Admin
        </a>
        <?php endif; ?>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($admins)): ?>
                    <tr>
                        <td colspan="3" class="text-center">No admins found</td>
                    </tr>
                    <?php else: ?>
                        <?php foreach ($admins as $admin): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($admin['username']); ?></td>
                            <td>
                                <span class="badge bg-<?php echo $admin['role'] === 'super_admin' ? 'danger' : 'info'; ?>">
                                    <?php echo ucfirst($admin['role']); ?>
                                </span>
                            </td>
                            <td><?php echo date('M d, Y H:i', strtotime($admin['created_at'])); ?></td>
                        </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
<?php endif; ?>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addAdminForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate passwords match
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Submit form
            const formData = new FormData(form);
            
            fetch(form.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Admin created successfully!');
                    window.location.href = 'admins.php';
                } else {
                    alert(data.message || 'An error occurred');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while creating the admin');
            });
        });
    }
});
</script>

<?php require_once 'includes/footer.php'; ?> 