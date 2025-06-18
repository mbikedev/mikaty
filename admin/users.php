<?php
require_once 'includes/header.php';

// Initialize variables
$users = [];
$error = null;

// Get waiting list data
try {
    // Test database connection
    if (!$conn) {
        throw new Exception("Database connection not established");
    }

    // Get waiting list users
    $stmt = $conn->query("
        SELECT ENTRY_ID, FULL_NAME, MOBILE_NUMBER, CREATED_AT 
        FROM WAITING_LIST 
        ORDER BY CREATED_AT DESC
    ");
    
    if ($stmt) {
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
} catch(Exception $e) {
    error_log("Error loading waiting list data: " . $e->getMessage());
    $error = "Error loading waiting list data: " . $e->getMessage();
}
?>

<?php if ($error): ?>
<div class="alert alert-danger" role="alert">
    <?php echo htmlspecialchars($error); ?>
</div>
<?php endif; ?>

<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Waiting List Users</h5>
        <span class="badge bg-primary"><?php echo count($users); ?> Users</span>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Mobile Number</th>
                        <th>Registration Date</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($users)): ?>
                    <tr>
                        <td colspan="3" class="text-center">No users yet</td>
                    </tr>
                    <?php else: ?>
                        <?php foreach ($users as $user): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($user['FULL_NAME']); ?></td>
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

<?php require_once 'includes/footer.php'; ?> 