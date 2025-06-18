// Admin Dashboard JavaScript

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const sidebarToggle = document.getElementById('sidebarToggle');
    let isMobile = window.innerWidth < 992;

    // Function to toggle sidebar
    function toggleSidebar() {
        isMobile = window.innerWidth < 992;
        if (isMobile) {
            sidebar.classList.toggle('show');
        } else {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        }
    }

    // Toggle sidebar on button click
    sidebarToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleSidebar();
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        isMobile = window.innerWidth < 992;
        if (isMobile) {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
            sidebar.classList.remove('show');
        } else {
            sidebar.classList.remove('show');
        }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        isMobile = window.innerWidth < 992;
        if (isMobile && 
            !sidebar.contains(event.target) && 
            !sidebarToggle.contains(event.target) && 
            sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        }
    });

    // Handle active menu items
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.sidebar-link');
    
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPath.split('/').pop()) {
            item.classList.add('active');
        }
    });
});

// Confirm delete actions
function confirmDelete(message = 'Are you sure you want to delete this item?') {
    return confirm(message);
}

// Handle form submissions with AJAX
function handleFormSubmit(formId, successCallback) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: form.method,
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (successCallback) {
                    successCallback(data);
                }
            } else {
                alert(data.message || 'An error occurred');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while processing your request');
        });
    });
}

// Handle status updates
function updateStatus(url, id, status) {
    if (!confirm('Are you sure you want to update the status?')) return;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        } else {
            alert(data.message || 'An error occurred');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the status');
    });
}

// Handle image preview
function previewImage(input, previewId) {
    const preview = document.getElementById(previewId);
    if (!preview) return;

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Handle search functionality
function handleSearch(inputId, tableId) {
    const input = document.getElementById(inputId);
    const table = document.getElementById(tableId);
    if (!input || !table) return;

    input.addEventListener('keyup', function() {
        const searchText = input.value.toLowerCase();
        const rows = table.getElementsByTagName('tr');

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.getElementsByTagName('td');
            let found = false;

            for (let j = 0; j < cells.length; j++) {
                const cell = cells[j];
                if (cell.textContent.toLowerCase().indexOf(searchText) > -1) {
                    found = true;
                    break;
                }
            }

            row.style.display = found ? '' : 'none';
        }
    });
}

// Handle pagination
function handlePagination(pageSize = 10) {
    const tables = document.querySelectorAll('.pagination-table');
    
    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        const totalPages = Math.ceil(rows.length / pageSize);
        let currentPage = 1;

        function showPage(page) {
            const start = (page - 1) * pageSize;
            const end = start + pageSize;

            rows.forEach((row, index) => {
                row.style.display = (index >= start && index < end) ? '' : 'none';
            });
        }

        // Create pagination controls
        const pagination = document.createElement('div');
        pagination.className = 'pagination-controls mt-3';
        pagination.innerHTML = `
            <button class="btn btn-sm btn-outline-primary" onclick="handlePagination(${pageSize}).prevPage()">Previous</button>
            <span class="mx-2">Page ${currentPage} of ${totalPages}</span>
            <button class="btn btn-sm btn-outline-primary" onclick="handlePagination(${pageSize}).nextPage()">Next</button>
        `;

        table.parentNode.insertBefore(pagination, table.nextSibling);

        // Show first page
        showPage(1);

        // Return pagination methods
        return {
            nextPage: function() {
                if (currentPage < totalPages) {
                    currentPage++;
                    showPage(currentPage);
                    pagination.querySelector('span').textContent = `Page ${currentPage} of ${totalPages}`;
                }
            },
            prevPage: function() {
                if (currentPage > 1) {
                    currentPage--;
                    showPage(currentPage);
                    pagination.querySelector('span').textContent = `Page ${currentPage} of ${totalPages}`;
                }
            }
        };
    });
} 