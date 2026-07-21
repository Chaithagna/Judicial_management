// Main JavaScript File

// Redirect to appropriate dashboard
function redirectToDashboard(role) {
    event.preventDefault();
    
    // Add loading animation
    const button = event.target;
    button.innerHTML = '<span class="loading-spinner"></span> Logging in...';
    button.disabled = true;
    
    // Simulate authentication delay
    setTimeout(() => {
        switch(role) {
            case 'judge':
                window.location.href = 'pages/judge-dashboard.html';
                break;
            case 'lawyer':
                window.location.href = 'pages/lawyer-dashboard.html';
                break;
            case 'client':
                window.location.href = 'pages/client-dashboard.html';
                break;
        }
    }, 1500);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(135deg, #5A3E5F, #B58B8B)';
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        navbar.style.padding = '1rem 0';
    }
});

// Scroll to top button
const scrollTopBtn = document.createElement('div');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form validation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
                
                // Add error message
                let errorDiv = input.nextElementSibling;
                if (!errorDiv || !errorDiv.classList.contains('invalid-feedback')) {
                    errorDiv = document.createElement('div');
                    errorDiv.className = 'invalid-feedback';
                    errorDiv.textContent = 'This field is required';
                    input.parentNode.insertBefore(errorDiv, input.nextSibling);
                }
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        if (isValid) {
            // Show success message
            showNotification('Form submitted successfully!', 'success');
        }
    });
});

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.animation = 'slideInRight 0.3s ease';
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'} me-2"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.portal-card, .feature-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Initialize tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Password visibility toggle
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
});

// Remember me functionality
const rememberMeCheckbox = document.getElementById('rememberMe');
if (rememberMeCheckbox) {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        document.querySelector('input[type="email"]').value = savedEmail;
        rememberMeCheckbox.checked = true;
    }
    
    rememberMeCheckbox.addEventListener('change', function() {
        const emailInput = document.querySelector('input[type="email"]');
        if (this.checked && emailInput.value) {
            localStorage.setItem('rememberedEmail', emailInput.value);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
    });
}

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('btn-primary') && !this.classList.contains('no-loading')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="loading-spinner"></span> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1000);
        }
    });
});
// ============================================
// LOGIN FUNCTIONS - Show respective modals
// ============================================

// Show Judge Login Modal
function showJudgeLogin() {
    // Check if modal exists, if not create it
    if (!document.getElementById('judgeLoginModal')) {
        createJudgeLoginModal();
    }
    const judgeModal = new bootstrap.Modal(document.getElementById('judgeLoginModal'));
    judgeModal.show();
}

// Show Lawyer Login Modal
function showLawyerLogin() {
    if (!document.getElementById('lawyerLoginModal')) {
        createLawyerLoginModal();
    }
    const lawyerModal = new bootstrap.Modal(document.getElementById('lawyerLoginModal'));
    lawyerModal.show();
}

// Show Client Login Modal
function showClientLogin() {
    if (!document.getElementById('clientLoginModal')) {
        createClientLoginModal();
    }
    const clientModal = new bootstrap.Modal(document.getElementById('clientLoginModal'));
    clientModal.show();
}

// ============================================
// REGISTER FUNCTIONS - Show respective registration forms
// ============================================

// Show Judge Registration
function showJudgeRegister() {
    if (!document.getElementById('judgeRegisterModal')) {
        createJudgeRegisterModal();
    }
    const registerModal = new bootstrap.Modal(document.getElementById('judgeRegisterModal'));
    registerModal.show();
}

// Show Lawyer Registration
function showLawyerRegister() {
    if (!document.getElementById('lawyerRegisterModal')) {
        createLawyerRegisterModal();
    }
    const registerModal = new bootstrap.Modal(document.getElementById('lawyerRegisterModal'));
    registerModal.show();
}

// Show Client Registration
function showClientRegister() {
    if (!document.getElementById('clientRegisterModal')) {
        createClientRegisterModal();
    }
    const registerModal = new bootstrap.Modal(document.getElementById('clientRegisterModal'));
    registerModal.show();
}

// ============================================
// CREATE LOGIN MODALS
// ============================================

// Create Judge Login Modal
function createJudgeLoginModal() {
    const modalHTML = `
        <div class="modal fade" id="judgeLoginModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" style="background: linear-gradient(135deg, #4A6FA5, #6B8EB5);">
                        <h5 class="modal-title text-white">
                            <i class="fas fa-gavel me-2"></i>Judge Login
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="judgeLoginForm" onsubmit="handleLogin(event, 'judge')">
                            <div class="mb-3">
                                <label class="form-label">Judge ID</label>
                                <input type="text" class="form-control" placeholder="Enter your judge ID" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input type="password" class="form-control" placeholder="Enter password" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Authentication Code</label>
                                <input type="text" class="form-control" placeholder="Enter 6-digit code" required>
                                <small class="text-muted">Multi-factor authentication required</small>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="judgeRemember">
                                <label class="form-check-label" for="judgeRemember">Remember me</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100" style="background: #4A6FA5; border: none;">
                                <i class="fas fa-sign-in-alt me-2"></i>Login as Judge
                            </button>
                        </form>
                        <div class="text-center mt-3">
                            <a href="#" onclick="showJudgeRegister(); return false;" class="text-decoration-none">New judge? Register here</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Create Lawyer Login Modal
function createLawyerLoginModal() {
    const modalHTML = `
        <div class="modal fade" id="lawyerLoginModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" style="background: linear-gradient(135deg, #6B8C6B, #8AAE8A);">
                        <h5 class="modal-title text-white">
                            <i class="fas fa-user-graduate me-2"></i>Lawyer Login
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="lawyerLoginForm" onsubmit="handleLogin(event, 'lawyer')">
                            <div class="mb-3">
                                <label class="form-label">Bar ID / Lawyer ID</label>
                                <input type="text" class="form-control" placeholder="Enter your bar ID" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input type="password" class="form-control" placeholder="Enter password" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Specialization</label>
                                <select class="form-select">
                                    <option>Criminal Law</option>
                                    <option>Civil Law</option>
                                    <option>Corporate Law</option>
                                    <option>Family Law</option>
                                    <option>Tax Law</option>
                                </select>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="lawyerRemember">
                                <label class="form-check-label" for="lawyerRemember">Remember me</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100" style="background: #6B8C6B; border: none;">
                                <i class="fas fa-sign-in-alt me-2"></i>Login as Lawyer
                            </button>
                        </form>
                        <div class="text-center mt-3">
                            <a href="#" onclick="showLawyerRegister(); return false;" class="text-decoration-none">New lawyer? Register here</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Create Client Login Modal
function createClientLoginModal() {
    const modalHTML = `
        <div class="modal fade" id="clientLoginModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" style="background: linear-gradient(135deg, #C47A5A, #D99F82);">
                        <h5 class="modal-title text-white">
                            <i class="fas fa-user me-2"></i>Client Login
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="clientLoginForm" onsubmit="handleLogin(event, 'client')">
                            <div class="mb-3">
                                <label class="form-label">Email Address</label>
                                <input type="email" class="form-control" placeholder="Enter your email" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Case Number (Optional)</label>
                                <input type="text" class="form-control" placeholder="Enter case number if applicable">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input type="password" class="form-control" placeholder="Enter password" required>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="clientRemember">
                                <label class="form-check-label" for="clientRemember">Remember me</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100" style="background: #C47A5A; border: none;">
                                <i class="fas fa-sign-in-alt me-2"></i>Login as Client
                            </button>
                        </form>
                        <div class="text-center mt-3">
                            <a href="#" onclick="showClientRegister(); return false;" class="text-decoration-none">New client? Register here</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// ============================================
// CREATE REGISTRATION MODALS
// ============================================

// Create Judge Registration Modal
function createJudgeRegisterModal() {
    const modalHTML = `
        <div class="modal fade" id="judgeRegisterModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header" style="background: linear-gradient(135deg, #4A6FA5, #6B8EB5);">
                        <h5 class="modal-title text-white">
                            <i class="fas fa-gavel me-2"></i>Judge Registration
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form onsubmit="handleRegister(event, 'judge')">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Full Name *</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Judge ID *</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Court *</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Designation</label>
                                    <select class="form-select">
                                        <option>District Judge</option>
                                        <option>Session Judge</option>
                                        <option>Magistrate</option>
                                        <option>High Court Judge</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Email *</label>
                                    <input type="email" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Phone *</label>
                                    <input type="tel" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Password *</label>
                                    <input type="password" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Confirm Password *</label>
                                    <input type="password" class="form-control" required>
                                </div>
                                <div class="col-12 mb-3">
                                    <label class="form-label">Address</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="judgeTerms" required>
                                <label class="form-check-label" for="judgeTerms">I agree to the terms and conditions</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100" style="background: #4A6FA5; border: none;">
                                <i class="fas fa-user-plus me-2"></i>Register as Judge
                            </button>
                        </form>
                        <div class="text-center mt-3">
                            <a href="#" onclick="showJudgeLogin(); return false;" class="text-decoration-none">Already have an account? Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Create Lawyer Registration Modal
function createLawyerRegisterModal() {
    const modalHTML = `
        <div class="modal fade" id="lawyerRegisterModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header" style="background: linear-gradient(135deg, #6B8C6B, #8AAE8A);">
                        <h5 class="modal-title text-white">
                            <i class="fas fa-user-graduate me-2"></i>Lawyer Registration
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form onsubmit="handleRegister(event, 'lawyer')">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Full Name *</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Bar ID *</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Email *</label>
                                    <input type="email" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Phone *</label>
                                    <input type="tel" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Specialization *</label>
                                    <select class="form-select" required>
                                        <option value="">Select Specialization</option>
                                        <option>Criminal Law</option>
                                        <option>Civil Law</option>
                                        <option>Corporate Law</option>
                                        <option>Family Law</option>
                                        <option>Tax Law</option>
                                        <option>Property Law</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Years of Experience</label>
                                    <input type="number" class="form-control" min="0" max="50">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Hourly Rate ($)</label>
                                    <input type="number" class="form-control" min="0">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Law Firm (Optional)</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Password *</label>
                                    <input type="password" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Confirm Password *</label>
                                    <input type="password" class="form-control" required>
                                </div>
                                <div class="col-12 mb-3">
                                    <label class="form-label">Office Address</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="lawyerTerms" required>
                                <label class="form-check-label" for="lawyerTerms">I agree to the terms and conditions</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100" style="background: #6B8C6B; border: none;">
                                <i class="fas fa-user-plus me-2"></i>Register as Lawyer
                            </button>
                        </form>
                        <div class="text-center mt-3">
                            <a href="#" onclick="showLawyerLogin(); return false;" class="text-decoration-none">Already have an account? Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Create Client Registration Modal
function createClientRegisterModal() {
    const modalHTML = `
        <div class="modal fade" id="clientRegisterModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header" style="background: linear-gradient(135deg, #C47A5A, #D99F82);">
                        <h5 class="modal-title text-white">
                            <i class="fas fa-user me-2"></i>Client Registration
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form onsubmit="handleRegister(event, 'client')">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Full Name *</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Email *</label>
                                    <input type="email" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Phone *</label>
                                    <input type="tel" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Date of Birth</label>
                                    <input type="date" class="form-control">
                                </div>
                                <div class="col-12 mb-3">
                                    <label class="form-label">Address</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Password *</label>
                                    <input type="password" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Confirm Password *</label>
                                    <input type="password" class="form-control" required>
                                </div>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="clientTerms" required>
                                <label class="form-check-label" for="clientTerms">I agree to the terms and conditions</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100" style="background: #C47A5A; border: none;">
                                <i class="fas fa-user-plus me-2"></i>Register as Client
                            </button>
                        </form>
                        <div class="text-center mt-3">
                            <a href="#" onclick="showClientLogin(); return false;" class="text-decoration-none">Already have an account? Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// ============================================
// HANDLE LOGIN AND REGISTER SUBMISSIONS
// ============================================

// Handle Login Form Submission
function handleLogin(event, role) {
    event.preventDefault();
    
    // Show loading state
    const button = event.target.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Logging in...';
    button.disabled = true;
    
    // Simulate authentication
    setTimeout(() => {
        // Redirect to appropriate dashboard
        switch(role) {
            case 'judge':
                window.location.href = 'pages/judge-dashboard.html';
                break;
            case 'lawyer':
                window.location.href = 'pages/lawyer-dashboard.html';
                break;
            case 'client':
                window.location.href = 'pages/client-dashboard.html';
                break;
        }
    }, 1500);
}

// Handle Register Form Submission
function handleRegister(event, role) {
    event.preventDefault();
    
    // Show loading state
    const button = event.target.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Registering...';
    button.disabled = true;
    
    // Simulate registration
    setTimeout(() => {
        // Close the register modal
        const modalId = role + 'RegisterModal';
        const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
        modal.hide();
        
        // Show success message
        showNotification(`Registration successful! Please login as ${role}.`, 'success');
        
        // Reset button
        button.innerHTML = originalText;
        button.disabled = false;
        
        // Show login modal for the same role
        setTimeout(() => {
            switch(role) {
                case 'judge':
                    showJudgeLogin();
                    break;
                case 'lawyer':
                    showLawyerLogin();
                    break;
                case 'client':
                    showClientLogin();
                    break;
            }
        }, 1000);
    }, 1500);
}
