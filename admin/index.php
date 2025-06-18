<?php
require_once 'includes/header.php';

// Initialize variables
$totalUsers = 0;
$totalAdmins = 0;
$totalWaitingList = 0;
$recentUsers = [];
$recentAdmins = [];
$recentWaitingList = [];
$error = null;

// Get statistics
try {
    // Test database connection
    if (!$conn) {
        throw new Exception("Database connection not established");
    }

    // Total waiting list users
    try {
        $stmt = $conn->query("SELECT COUNT(*) as total FROM WAITING_LIST");
        if ($stmt) {
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $totalWaitingList = $result ? (int)$result['total'] : 0;
        }
    } catch (PDOException $e) {
        error_log("Error getting total waiting list users: " . $e->getMessage());
        $error = "Error getting waiting list statistics";
    }

    // Total admins
    try {
        $stmt = $conn->query("SELECT COUNT(*) as total FROM admin_users");
        if ($stmt) {
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $totalAdmins = $result ? (int)$result['total'] : 0;
        }
    } catch (PDOException $e) {
        error_log("Error getting total admins: " . $e->getMessage());
        $error = "Error getting admin statistics";
    }

    // Recent waiting list users
    try {
        $stmt = $conn->query("
            SELECT ENTRY_ID, FULL_NAME, MOBILE_NUMBER, CREATED_AT 
            FROM WAITING_LIST 
            ORDER BY CREATED_AT DESC 
            LIMIT 5
        ");
        if ($stmt) {
            $recentWaitingList = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
        }
    } catch (PDOException $e) {
        error_log("Error getting recent waiting list users: " . $e->getMessage());
        $error = "Error getting recent waiting list users";
    }

    // Recent admins
    try {
        $stmt = $conn->query("
            SELECT id, username, role, created_at 
            FROM admin_users 
            ORDER BY created_at DESC 
            LIMIT 5
        ");
        if ($stmt) {
            $recentAdmins = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
        }
    } catch (PDOException $e) {
        error_log("Error getting recent admins: " . $e->getMessage());
        $error = "Error getting recent admins";
    }

} catch(Exception $e) {
    error_log("Dashboard error: " . $e->getMessage());
    $error = "Error loading dashboard data: " . $e->getMessage();
}

// Debug information (only show if there's an error)
if ($error) {
    error_log("Database connection details: " . 
        "Host: " . DB_HOST . ", " .
        "Database: " . DB_NAME . ", " .
        "User: " . DB_USER
    );
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

<div class="row g-4">
    <div class="col-md-4">
        <div class="card stat-card bg-primary text-white">
            <div class="card-body">
                <div class="stat-icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="stat-value"><?php echo number_format($totalWaitingList); ?></div>
                <div class="stat-label fw-bold text-white text-opacity-90">Waiting List Users</div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card stat-card bg-success text-white">
            <div class="card-body">
                <div class="stat-icon">
                    <i class="fas fa-user-shield"></i>
                </div>
                <div class="stat-value"><?php echo number_format($totalAdmins); ?></div>
                <div class="stat-label fw-bold text-white text-opacity-90">Total Admins</div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card stat-card bg-purple-600 text-white" style="background-color: #7c3aed;">
            <div class="card-body">
                <div class="stat-icon">
                    <i class="fas fa-user"></i>
                </div>
                <div class="stat-value"><?php echo htmlspecialchars($currentUser['username']); ?></div>
                <div class="stat-label fw-bold text-white text-opacity-90">Profile</div>
            </div>
        </div>
    </div>
</div>

<div class="row mt-4">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Recent Waiting List Users</h5>
                <a href="users.php" class="btn btn-sm btn-primary">View All</a>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Initials</th>
                                <th>Mobile Number</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (empty($recentWaitingList)): ?>
                            <tr>
                                <td colspan="3" class="text-center">No recent waiting list users found</td>
                            </tr>
                            <?php else: ?>
                                <?php foreach ($recentWaitingList as $user): ?>
                                <tr id="user-row-<?php echo $user['ENTRY_ID']; ?>">
                                    <td><?php echo getInitials($user['FULL_NAME']); ?></td>
                                    <td><?php echo htmlspecialchars($user['MOBILE_NUMBER']); ?></td>
                                    <td><?php echo date('M d, Y H:i', strtotime($user['CREATED_AT'])); ?></td>
                                </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row mt-4">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Recent Admins</h5>
                <a href="admins.php" class="btn btn-sm btn-primary">View All</a>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (empty($recentAdmins)): ?>
                            <tr>
                                <td colspan="3" class="text-center">No recent admins found</td>
                            </tr>
                            <?php else: ?>
                                <?php foreach ($recentAdmins as $admin): ?>
                                <tr id="admin-row-<?php echo $admin['id']; ?>">
                                    <td><?php echo htmlspecialchars($admin['username']); ?></td>
                                    <td>
                                        <span class="badge bg-<?php echo $admin['role'] === 'super_admin' ? 'danger' : 'info'; ?>">
                                            <?php echo ucfirst($admin['role']); ?>
                                        </span>
                                    </td>
                                    <td><?php echo date('M d, Y', strtotime($admin['created_at'])); ?></td>
                                </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row mt-4">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Quick Actions</h5>
            </div>
            <div class="card-body">
                <div class="quick-actions">
                    <a href="users.php" class="btn btn-primary btn-icon">
                        <i class="fas fa-users"></i> View Waiting List
                    </a>
                    <a href="admins.php?action=new" class="btn btn-success btn-icon">
                        <i class="fas fa-user-shield"></i> Add New Admin
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // No delete functionality needed anymore
});
</script>

<?php require_once 'includes/footer.php'; ?> 