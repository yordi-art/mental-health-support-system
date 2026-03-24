// Mental Health Support System - Complete Frontend with All Dashboards
// Using localStorage for data persistence (no database needed!)

// ==================== MOCK DATA ====================
// Pre-populate with sample data for demonstration

// Sample Therapists/Counselors
const sampleTherapists = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        role: "Clinical Psychologist",
        specialty: "Anxiety & Depression",
        experience: 12,
        rating: 4.9,
        price: 80,
        image: "👩‍⚕️",
        availability: ["Mon 9AM-5PM", "Wed 9AM-5PM", "Fri 9AM-5PM"],
        verified: true,
        bio: "Specializing in CBT and anxiety disorders with 12+ years experience"
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        role: "Psychiatrist",
        specialty: "Trauma & PTSD",
        experience: 15,
        rating: 4.8,
        price: 90,
        image: "👨‍⚕️",
        availability: ["Tue 10AM-6PM", "Thu 10AM-6PM"],
        verified: true,
        bio: "Trauma-informed care specialist"
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Licensed Counselor",
        specialty: "Family & Relationships",
        experience: 8,
        rating: 4.7,
        price: 75,
        image: "👩‍⚕️",
        availability: ["Mon 1PM-7PM", "Wed 1PM-7PM", "Fri 1PM-7PM"],
        verified: true,
        bio: "Relationship and family therapy expert"
    },
    {
        id: 4,
        name: "Dr. James Wilson",
        role: "Addiction Specialist",
        specialty: "Addiction & Recovery",
        experience: 10,
        rating: 4.9,
        price: 85,
        image: "👨‍⚕️",
        availability: ["Mon 10AM-4PM", "Thu 10AM-4PM", "Sat 10AM-2PM"],
        verified: true,
        bio: "Certified addiction counselor"
    },
    {
        id: 5,
        name: "Lisa Thompson",
        role: "Stress Management Coach",
        specialty: "Stress & Burnout",
        experience: 7,
        rating: 4.6,
        price: 70,
        image: "👩‍⚕️",
        availability: ["Tue 9AM-5PM", "Thu 9AM-5PM", "Sat 9AM-1PM"],
        verified: true,
        bio: "Mindfulness and stress reduction specialist"
    }
];

// Initialize localStorage with sample data if empty
function initializeData() {
    if (!localStorage.getItem('therapists')) {
        localStorage.setItem('therapists', JSON.stringify(sampleTherapists));
    }
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('assessments')) {
        localStorage.setItem('assessments', JSON.stringify([]));
    }
    if (!localStorage.getItem('appointments')) {
        localStorage.setItem('appointments', JSON.stringify([]));
    }
    if (!localStorage.getItem('pendingVerifications')) {
        localStorage.setItem('pendingVerifications', JSON.stringify([]));
    }
    if (!localStorage.getItem('reviews')) {
        localStorage.setItem('reviews', JSON.stringify([]));
    }
    if (!localStorage.getItem('messages')) {
        localStorage.setItem('messages', JSON.stringify([]));
    }
}

// Call initialization
initializeData();

// ==================== STATE MANAGEMENT ====================
let currentUser = null;
let currentAssessment = null;
let assessmentResponses = [];
let currentQuestionIndex = 0;

// ==================== NAVIGATION ====================
function navigate(page) {
    window.history.pushState({}, '', `#${page}`);
    renderPage(page);
}

// ==================== MAIN RENDER FUNCTION ====================
function renderPage(page) {
    const app = document.getElementById('app');
    
    switch(page) {
        case 'home':
            app.innerHTML = renderHome();
            break;
        case 'login':
            app.innerHTML = renderLogin();
            break;
        case 'register':
            app.innerHTML = renderRegister();
            break;
        case 'client-dashboard':
            if (localStorage.getItem('user')) {
                currentUser = JSON.parse(localStorage.getItem('user'));
                app.innerHTML = renderClientDashboard();
            } else {
                navigate('login');
            }
            break;
        case 'therapist-dashboard':
            if (localStorage.getItem('user')) {
                currentUser = JSON.parse(localStorage.getItem('user'));
                app.innerHTML = renderTherapistDashboard();
            } else {
                navigate('login');
            }
            break;
        case 'counselor-dashboard':
            if (localStorage.getItem('user')) {
                currentUser = JSON.parse(localStorage.getItem('user'));
                app.innerHTML = renderCounselorDashboard();
            } else {
                navigate('login');
            }
            break;
        case 'admin-dashboard':
            if (localStorage.getItem('user')) {
                currentUser = JSON.parse(localStorage.getItem('user'));
                app.innerHTML = renderAdminDashboard();
            } else {
                navigate('login');
            }
            break;
        case 'assessment':
            if (localStorage.getItem('user')) {
                app.innerHTML = renderAssessmentList();
            } else {
                navigate('login');
            }
            break;
        case 'take-assessment':
            if (currentAssessment) {
                app.innerHTML = renderAssessmentQuestions();
            } else {
                navigate('assessment');
            }
            break;
        case 'therapists':
            if (localStorage.getItem('user')) {
                app.innerHTML = renderTherapistsList();
            } else {
                navigate('login');
            }
            break;
        case 'appointments':
            if (localStorage.getItem('user')) {
                app.innerHTML = renderAppointments();
            } else {
                navigate('login');
            }
            break;
        case 'profile':
            if (localStorage.getItem('user')) {
                app.innerHTML = renderProfile();
            } else {
                navigate('login');
            }
            break;
        default:
            app.innerHTML = renderHome();
    }
}

// ==================== HOME PAGE ====================
function renderHome() {
    return `
        <div class="navbar">
            <div class="nav-content">
                <div class="logo">
                    <h1>🌿 MindCare</h1>
                    <p>Mental Health Support System</p>
                </div>
                <div class="nav-links">
                    <a href="#" onclick="navigate('login')">Login</a>
                    <a href="#" onclick="navigate('register')">Sign Up</a>
                </div>
            </div>
        </div>
        
        <div class="hero">
            <h1>Your Mental Wellness Journey Starts Here</h1>
            <p>Connect with professional therapists, track your mental health, and find support in a safe, confidential environment.</p>
            <button class="btn btn-primary" onclick="navigate('register')">Get Started</button>
            <button class="btn btn-secondary" onclick="navigate('login')">Sign In</button>
        </div>
        
        <div class="container">
            <h2 style="text-align: center; margin: 30px 0;">How We Help You</h2>
            <div class="feature-grid">
                <div class="card feature-card">
                    <div class="feature-icon">🤖</div>
                    <h3>AI Assessment</h3>
                    <p>Complete PHQ-9 and GAD-7 assessments with AI analysis</p>
                </div>
                <div class="card feature-card">
                    <div class="feature-icon">👥</div>
                    <h3>Professional Matching</h3>
                    <p>Get matched with licensed therapists</p>
                </div>
                <div class="card feature-card">
                    <div class="feature-icon">📅</div>
                    <h3>Easy Scheduling</h3>
                    <p>Book appointments with just a few taps</p>
                </div>
                <div class="card feature-card">
                    <div class="feature-icon">🎥</div>
                    <h3>Video Sessions</h3>
                    <p>Secure video calls with your therapist</p>
                </div>
            </div>
        </div>
    `;
}

// ==================== LOGIN PAGE ====================
function renderLogin() {
    return `
        <div class="navbar">
            <div class="nav-content">
                <div class="logo">
                    <h1>🌿 MindCare</h1>
                </div>
                <div class="nav-links">
                    <a href="#" onclick="navigate('home')">Home</a>
                </div>
            </div>
        </div>
        
        <div class="form-container">
            <h2 style="text-align: center; margin-bottom: 20px;">Welcome Back</h2>
            <form id="loginForm" onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="email" required placeholder="Enter your email">
                </div>
                
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" id="password" required placeholder="Enter your password">
                </div>
                
                <div class="form-group">
                    <label>User Type</label>
                    <select id="userType">
                        <option value="client">Client - Seeking Support</option>
                        <option value="therapist">Therapist - Licensed Therapist</option>
                        <option value="counselor">Counselor - Mental Health Counselor</option>
                        <option value="admin">System Administrator</option>
                    </select>
                </div>
                
                <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
            </form>
            
            <p style="text-align: center; margin-top: 20px;">
                Don't have an account? <a href="#" onclick="navigate('register')">Register here</a>
            </p>
        </div>
    `;
}

// ==================== REGISTER PAGE ====================
function renderRegister() {
    return `
        <div class="navbar">
            <div class="nav-content">
                <div class="logo">
                    <h1>🌿 MindCare</h1>
                </div>
                <div class="nav-links">
                    <a href="#" onclick="navigate('home')">Home</a>
                </div>
            </div>
        </div>
        
        <div class="form-container">
            <h2 style="text-align: center; margin-bottom: 20px;">Create Account</h2>
            <form id="registerForm" onsubmit="handleRegister(event)">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="fullName" required placeholder="Enter your full name">
                </div>
                
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="email" required placeholder="Enter your email">
                </div>
                
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" id="password" required placeholder="Create a password (min 6 characters)">
                </div>
                
                <div class="form-group">
                    <label>User Type</label>
                    <select id="userType">
                        <option value="client">Client - Seeking Support</option>
                        <option value="therapist">Therapist - Licensed Therapist</option>
                        <option value="counselor">Counselor - Mental Health Counselor</option>
                    </select>
                </div>
                
                <div id="professionalFields" style="display: none;">
                    <div class="form-group">
                        <label>License Number</label>
                        <input type="text" id="licenseNumber" placeholder="Enter your license number">
                    </div>
                    <div class="form-group">
                        <label>Years of Experience</label>
                        <input type="number" id="experience" placeholder="Years of experience">
                    </div>
                    <div class="form-group">
                        <label>Specialization</label>
                        <input type="text" id="specialization" placeholder="e.g., Anxiety, Depression, Trauma">
                    </div>
                    <div class="form-group">
                        <label>Hourly Rate ($)</label>
                        <input type="number" id="hourlyRate" placeholder="Your hourly rate">
                    </div>
                </div>
                
                <button type="submit" class="btn btn-primary" style="width: 100%;">Register</button>
            </form>
            
            <p style="text-align: center; margin-top: 20px;">
                Already have an account? <a href="#" onclick="navigate('login')">Login here</a>
            </p>
        </div>
        
        <script>
            document.getElementById('userType').addEventListener('change', function() {
                const profFields = document.getElementById('professionalFields');
                if (this.value === 'therapist' || this.value === 'counselor') {
                    profFields.style.display = 'block';
                } else {
                    profFields.style.display = 'none';
                }
            });
        </script>
    `;
}

// ==================== CLIENT DASHBOARD ====================
function renderClientDashboard() {
    const user = currentUser;
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const userAppointments = appointments.filter(a => a.clientId === user.email);
    
    return `
        <div class="dashboard-header">
            <div class="nav-content">
                <div class="logo">
                    <h1>🌿 MindCare</h1>
                    <p>Client Dashboard</p>
                </div>
                <div class="nav-links">
                    <a href="#" onclick="navigate('profile')">👤 Profile</a>
                    <a href="#" onclick="handleLogout()">🚪 Logout</a>
                </div>
            </div>
        </div>
        
        <div class="container">
            <!-- Welcome Card -->
            <div class="card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; cursor: default;">
                <h2>Welcome back, ${user.fullName}! 👋</h2>
                <p>How are you feeling today? Your mental wellness journey continues.</p>
                <div style="margin-top: 15px;">
                    <span style="background: rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 20px;">📊 ${assessments.length} Assessments</span>
                    <span style="background: rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 20px; margin-left: 10px;">📅 ${userAppointments.filter(a => a.status === 'confirmed').length} Upcoming</span>
                </div>
            </div>
            
            <!-- Stats -->
            <div class="stats">
                <div class="stat-box">
                    <div class="stat-number">${assessments.length}</div>
                    <div>Assessments Taken</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${userAppointments.filter(a => a.status === 'confirmed').length}</div>
                    <div>Upcoming Sessions</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${userAppointments.filter(a => a.status === 'completed').length}</div>
                    <div>Completed Sessions</div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <h3 style="margin: 20px 0 10px 0;">Quick Actions</h3>
            <div class="card" onclick="navigate('assessment')">
                <h3>📊 Take Mental Health Assessment</h3>
                <p>Check your anxiety and depression levels with PHQ-9 and GAD-7</p>
            </div>
            
            <div class="card" onclick="navigate('therapists')">
                <h3>👥 Find a Therapist</h3>
                <p>Connect with verified mental health professionals</p>
            </div>
            
            <div class="card" onclick="navigate('appointments')">
                <h3>📅 My Appointments</h3>
                <p>View and manage your therapy sessions</p>
            </div>
            
            <!-- Recent Assessments -->
            <h3 style="margin: 20px 0 10px 0;">Recent Assessments</h3>
            ${assessments.slice(-3).reverse().map(a => `
                <div class="card" style="cursor: default;">
                    <div style="display: flex; justify-content: space-between;">
                        <strong>${a.type}</strong>
                        <span>Score: ${a.score}/${a.maxScore}</span>
                    </div>
                    <p>Severity: <strong>${a.severity}</strong></p>
                    <small>${new Date(a.date).toLocaleDateString()}</small>
                </div>
            `).join('') || '<div class="card"><p>No assessments taken yet</p></div>'}
        </div>
    `;
}

// ==================== THERAPIST DASHBOARD ====================
function renderTherapistDashboard() {
    const user = currentUser;
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const myAppointments = appointments.filter(a => a.therapistId === user.email);
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const myReviews = reviews.filter(r => r.therapistId === user.email);
    const avgRating = myReviews.length > 0 ? (myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1) : 'No ratings';
    
    return `
        <div class="dashboard-header">
            <div class="nav-content">
                <div class="logo">
                    <h1>🌿 MindCare</h1>
                    <p>Therapist Dashboard</p>
                </div>
                <div class="nav-links">
                    <a href="#" onclick="navigate('profile')">👤 Profile</a>
                    <a href="#" onclick="handleLogout()">🚪 Logout</a>
                </div>
            </div>
        </div>
        
        <div class="container">
            <!-- Welcome Card -->
            <div class="card" style="background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%); color: white; cursor: default;">
                <h2>Welcome, ${user.fullName}! 👋</h2>
                <p>${user.specialization || 'Mental Health Professional'} | ${user.experience || 'Experienced'} years</p>
                <div style="margin-top: 15px;">
                    <span style="background: rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 20px;">⭐ Rating: ${avgRating}</span>
                    <span style="background: rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 20px; margin-left: 10px;">💰 $${user.hourlyRate || 80}/hr</span>
                </div>
            </div>
            
            <!-- Stats -->
            <div class="stats">
                <div class="stat-box">
                    <div class="stat-number">${myAppointments.length}</div>
                    <div>Total Clients</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${myAppointments.filter(a => a.status === 'confirmed').length}</div>
                    <div>Upcoming</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${myAppointments.filter(a => a.status === 'completed').length}</div>
                    <div>Completed</div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <h3 style="margin: 20px 0 10px 0;">Today's Schedule</h3>
            ${myAppointments.filter(a => a.status === 'confirmed').slice(0, 3).map(a => `
                <div class="card">
                    <div style="display: flex; justify-content: space-between;">
                        <div>
                            <strong>${a.clientName}</strong>
                            <p>📅 ${new Date(a.date).toLocaleDateString()}</p>
                            <p>⏰ ${a.time}</p>
                        </div>
                        <div>
                            <span style="background: #4caf50; color: white; padding: 4px 12px; border-radius: 20px;">Confirmed</span>
                        </div>
                    </div>
                    <button class="btn btn-secondary" onclick="startVideoSession('${a.id}')" style="margin-top: 10px;">🎥 Start Session</button>
                </div>
            `).join('') || '<div class="card"><p>No appointments scheduled for today</p></div>'}
            
            <!-- Recent Reviews -->
            <h3 style="margin: 20px 0 10px 0;">Client Reviews</h3>
            ${myReviews.slice(-3).reverse().map(r => `
                <div class="card" style="cursor: default;">
                    <div style="display: flex; justify-content: space-between;">
                        <strong>${r.clientName}</strong>
                        <span>⭐ ${r.rating}/5</span>
                    </div>
                    <p>"${r.comment}"</p>
                    <small>${new Date(r.date).toLocaleDateString()}</small>
                </div>
            `).join('') || '<div class="card"><p>No reviews yet</p></div>'}
        </div>
    `;
}

// ==================== COUNSELOR DASHBOARD ====================
function renderCounselorDashboard() {
    const user = currentUser;
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const myAppointments = appointments.filter(a => a.therapistId === user.email);
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const myReviews = reviews.filter(r => r.therapistId === user.email);
    
    return `
        <div class="dashboard-header">
            <div class="nav-content">
                <div class="logo">
                    <h1>🌿 MindCare</h1>
                    <p>Counselor Dashboard</p>
                </div>
                <div class="nav-links">
                    <a href="#" onclick="navigate('profile')">👤 Profile</a>
                    <a href="#" onclick="handleLogout()">🚪 Logout</a>
                </div>
            </div>
        </div>
        
        <div class="container">
            <!-- Welcome Card -->
            <div class="card" style="background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%); color: white; cursor: default;">
                <h2>Welcome, Counselor ${user.fullName}! 🤝</h2>
                <p>${user.specialization || 'Mental Health Counselor'} | Providing compassionate support</p>
                <div style="margin-top: 15px;">
                    <span style="background: rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 20px;">📊 ${myAppointments.length} Sessions</span>
                    <span style="background: rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 20px; margin-left: 10px;">💬 ${myReviews.length} Reviews</span>
                </div>
            </div>
            
            <!-- Stats -->
            <div class="stats">
                <div class="stat-box">
                    <div class="stat-number">${myAppointments.filter(a => a.status === 'completed').length}</div>
                    <div>Completed</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${myAppointments.filter(a => a.status === 'confirmed').length}</div>
                    <div>Upcoming</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${myReviews.length}</div>
                    <div>Testimonials</div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <h3 style="margin: 20px 0 10px 0;">Today's Counseling Sessions</h3>
            ${myAppointments.filter(a => a.status === 'confirmed').slice(0, 3).map(a => `
                <div class="card">
                    <div style="display: flex; justify-content: space-between;">
                        <div>
                            <strong>${a.clientName}</strong>
                            <p>📅 ${new Date(a.date).toLocaleDateString()} at ${a.time}</p>
                            <p>📝 ${a.notes || 'No notes'}</p>
                        </div>
                        <button class="btn btn-primary" onclick="startVideoSession('${a.id}')">Join Session</button>
                    </div>
                </div>
            `).join('') || '<div class="card"><p>No sessions scheduled for today</p></div>'}
            
            <!-- Resources -->
            <h3 style="margin: 20px 0 10px 0;">Helpful Resources for Clients</h3>
            <div class="card">
                <h4>📚 Share These Resources</h4>
                <p>• Mindfulness exercises for anxiety</p>
                <p>• Journaling prompts for depression</p>
                <p>• Breathing techniques for stress relief</p>
                <p>• Self-care checklist for clients</p>
            </div>
        </div>
    `;
}

// ==================== ADMIN DASHBOARD ====================
function renderAdminDashboard() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const therapists = JSON.parse(localStorage.getItem('therapists') || '[]');
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    const pendingVerifications = JSON.parse(localStorage.getItem('pendingVerifications') || '[]');
    
    return `
        <div class="dashboard-header">
            <div class="nav-content">
                <div class="logo">
                    <h1>🌿 MindCare</h1>
                    <p>Admin Dashboard</p>
                </div>
                <div class="nav-links">
                    <a href="#" onclick="handleLogout()">🚪 Logout</a>
                </div>
            </div>
        </div>
        
        <div class="container">
            <!-- Welcome Card -->
            <div class="card" style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; cursor: default;">
                <h2>Admin Control Panel 🔧</h2>
                <p>System Overview & Management</p>
            </div>
            
            <!-- Stats -->
            <div class="stats">
                <div class="stat-box">
                    <div class="stat-number">${users.length}</div>
                    <div>Total Users</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${therapists.length}</div>
                    <div>Therapists</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${appointments.length}</div>
                    <div>Total Sessions</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${assessments.length}</div>
                    <div>Assessments</div>
                </div>
            </div>
            
            <!-- Pending Verifications -->
            <h3 style="margin: 20px 0 10px 0;">⏳ Pending Verifications (${pendingVerifications.length})</h3>
            ${pendingVerifications.map(v => `
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>${v.name}</strong>
                            <p>${v.role} | License: ${v.licenseNumber}</p>
                            <p>Specialization: ${v.specialization}</p>
                        </div>
                        <div>
                            <button class="btn-primary" style="padding: 8px 16px; margin-right: 5px;" onclick="verifyProfessional('${v.id}', true)">✓ Verify</button>
                            <button class="btn-secondary" style="padding: 8px 16px;" onclick="verifyProfessional('${v.id}', false)">✗ Reject</button>
                        </div>
                    </div>
                </div>
            `).join('') || '<div class="card"><p>No pending verifications</p></div>'}
            
            <!-- Users List -->
            <h3 style="margin: 20px 0 10px 0;">👥 Registered Users</h3>
            ${users.slice(-5).reverse().map(u => `
                <div class="card" style="cursor: default;">
                    <div style="display: flex; justify-content: space-between;">
                        <div>
                            <strong>${u.fullName}</strong>
                            <p>${u.email}</p>
                            <small>${u.userType} | Joined: ${new Date(u.registeredAt).toLocaleDateString()}</small>
                        </div>
                        <button class="btn-secondary" onclick="deleteUser('${u.email}')" style="padding: 5px 10px;">Delete</button>
                    </div>
                </div>
            `).join('') || '<div class="card"><p>No users registered</p></div>'}
            
            <!-- System Stats -->
            <h3 style="margin: 20px 0 10px 0;">📊 System Analytics</h3>
            <div class="card">
                <p>📈 Total Appointments: ${appointments.length}</p>
                <p>📝 Total Assessments: ${assessments.length}</p>
                <p>👥 Active Users: ${users.filter(u => u.userType !== 'admin').length}</p>
                <p>⭐ Average Rating: 4.7/5</p>
            </div>
        </div>
    `;
}

// ==================== ASSESSMENT PAGES ====================
function renderAssessmentList() {
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    const userAssessments = assessments.filter(a => a.clientId === currentUser?.email);
    
    return `
        <div class="navbar">
            <div class="nav-content">
                <div class="logo">
                    <h1>🌿 MindCare</h1>
                </div>
                <div class="nav-links">
                    <a href="#" onclick="navigate('client-dashboard')">Back</a>
                </div>
            </div>
        </div>
        
        <div class="container">
            <div class="card" style="cursor: default;">
                <h2>Mental Health Assessments</h2>
                <p>Choose an assessment to check your mental wellbeing:</p>
                
                <div class="card" onclick="startAssessment('PHQ-9')" style="margin-top: 20px;">
                    <h3>📝 PHQ-9 Depression Screening</h3>
                    <p>9 questions to assess depression symptoms</p>
                    <small>Time: 3-5 minutes | Evidence-based screening tool</small>
                </div>
                
                <div class="card" onclick="startAssessment('GAD-7')" style="margin-top: 10px;">
                    <h3>😰 GAD-7 Anxiety Screening</h3>
                    <p>7 questions to assess anxiety symptoms</p>
                    <small>Time: 2-3 minutes | Clinically validated</small>
                </div>
            </div>
            
            <div class="card" style="cursor: default;">
                <h3>📋 Your Assessment History</h3>
                ${userAssessments.length > 0 ? userAssessments.slice(-5).reverse().map(a => `
                    <div style="margin-bottom: 10px; padding: 10px; background: #f8f9fa; border-radius: 8px;">
                        <strong>${a.type}</strong> - Score: ${a.score}/${a.maxScore} - ${a.severity}<br>
                        <small>${new Date(a.date).toLocaleDateString()}</small>
                    </div>
                `).join('') : '<p>No previous assessments found. Take your first assessment above!</p>'}
            </div>
        </div>
    `;
}

// ==================== ASSESSMENT QUESTIONS ====================
const phq9Questions = [
    { text: "Little interest or pleasure in doing things", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Feeling down, depressed, or hopeless", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Trouble falling or staying asleep, or sleeping too much", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Feeling tired or having little energy", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Poor appetite or overeating", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Feeling bad about yourself - or that you are a failure", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Trouble concentrating on things", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Moving or speaking so slowly that others could notice", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Thoughts that you would be better off dead", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] }
];

const gad7Questions = [
    { text: "Feeling nervous, anxious, or on edge", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Not being able to stop or control worrying", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Worrying too much about different things", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Trouble relaxing", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Being so restless that it's hard to sit still", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Becoming easily annoyed or irritable", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    { text: "Feeling afraid as if something awful might happen", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] }
];

function renderAssessmentQuestions() {
    const questions = currentAssessment === 'PHQ-9' ? phq9Questions : gad7Questions;
    const currentQuestion = questions[currentQuestionIndex];
    
    return `
        <div class="navbar">
            <div class="nav-content">
                <div class="logo">
                    <h1>🌿 MindCare</h1>
                </div>
                <div class="nav-links">
                    <a href="#" onclick="cancelAssessment()">Cancel</a>
                </div>
            </div>
        </div>
        
        <div class="container">
            <div class="card">
                <div class="progress">
                    Question ${currentQuestionIndex + 1} of ${questions.length}
                </div>
                <div class="assessment-question">
                    <h3>${currentQuestion.text}</h3>
                </div>
                <div class="answer-options">
                    ${currentQuestion.options.map((option, idx) => `
                        <button class="answer-btn ${assessmentResponses[currentQuestionIndex] === idx ? 'selected' : ''}" 
                                onclick="selectAnswer(${idx})">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                
                ${currentQuestionIndex > 0 ? `
                    <button class="btn btn-secondary" onclick="previousQuestion()" style="margin-top: 20px; margin-right: 10px;">
                        Previous
                    </button>
                ` : ''}
                
                ${currentQuestionIndex < questions.length - 1 ? `
                    <button class="btn btn-primary" onclick="nextQuestion()" style="margin-top: 20px;">
                        Next Question
                    </button>
                ` : `
                    <button class="btn btn-primary" onclick="submitAssessment()" style="margin-top: 20px;">
                        Submit Assessment
                    </button>
                `}
            </div>
        </div>
    `;
}

// ==================== THERAPISTS LIST ====================
function renderTherapistsList() {
    const therapists = JSON.parse(localStorage.getItem('therapists') || '[]');
    
    return `
        <div class="navbar">
            <div class="nav-content">
                <div class="logo">
                    <h1>🌿 MindCare</h1>
                </div>
                <div class="nav-links">
                    <a href="#" onclick="navigate('client-dashboard')">Back</a>
                </div>
            </div>
        </div>
        
        <div class="container">
            <h2 style="margin-bottom: 20px;">Find Your Therapist</h2>
            <p style="margin-bottom: 20px; color: #666;">All therapists are licensed and verified professionals</p>
            
            ${therapists.map(t => `
                <div class="card" onclick="bookWithTherapist('${t.name}', '${t.id}')">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 3rem;">${t.image}</div>
                        <div style="flex: 1;">
                            <h3>${t.name}</h3>
                            <p style="color: #4a90e2;">${t.specialty}</p>
                            <p>⭐ ${t.rating} • ${t.experience} years experience</p>
                            <p>💰 $${t.price}/session</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ==================== APPOINTMENTS ====================
function renderAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const user = currentUser;
    const userAppointments = user.userType === 'client' ? 
        appointments.filter(a => a.clientId === user.email) :
        appointments.filter(a => a.therapistId === user.email);
    
    return `
        <div class="navbar">
            <div class="nav-content">
                <div class="logo">
                    <h1>🌿 MindCare</h1>
                </div>
                <div class="nav-links">
                    <a href="#" onclick="navigate('${user.userType}-dashboard')">Back</a>
                </div>
            </div>
        </div>
        
        <div class="container">
            <h2 style="margin-bottom: 20px;">My Appointments</h2>
            
            ${user.userType === 'client' ? `
                <div class="card" onclick="navigate('therapists')" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                    <h3>+ Book New Session</h3>
                    <p>Schedule your next therapy session</p>
                </div>
            ` : ''}
            
            <h3 style="margin: 20px 0 10px 0;">Upcoming Sessions</h3>
            ${userAppointments.filter(a => a.status === 'confirmed').length > 0 ? 
                userAppointments.filter(a => a.status === 'confirmed').map(a => `
                    <div class="card">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h3>With: ${a.therapistName || a.clientName}</h3>
                                <p>📅 ${new Date(a.date).toLocaleDateString()}</p>
                                <p>⏰ ${a.time}</p>
                            </div>
                            <div>
                                <span style="background: #4caf50; color: white; padding: 4px 12px; border-radius: 20px;">Confirmed</span>
                            </div>
                        </div>
                        ${user.userType !== 'client' ? 
                            `<button class="btn btn-primary" onclick="startVideoSession('${a.id}')" style="margin-top: 10px;">🎥 Start Session</button>` :
                            ''
                        }
                        <button class="btn btn-secondary" onclick="cancelAppointment('${a.id}')" style="margin-top: 10px;">Cancel</button>
                    </div>
                `).join('') :
                '<div class="card"><p>No upcoming appointments</p></div>'
            }
            
            <h3 style="margin: 20px 0 10px 0;">Past Sessions</h3>
            ${userAppointments.filter(a => a.status === 'completed').length > 0 ? 
                userAppointments.filter(a => a.status === 'completed').map(a => `
                    <div class="card">
                        <div>
                            <h3>With: ${a.therapistName || a.clientName}</h3>
                            <p>📅 ${new Date(a.date).toLocaleDateString()}</p>
                            <span style="background: #e0e0e0; padding: 4px 12px; border-radius: 20px;">Completed</span>
                        </div>
                        ${user.userType === 'client' ? 
                            `<button class="btn btn-secondary" onclick="leaveReview('${a.therapistId}', '${a.therapistName}')" style="margin-top: 10px;">⭐ Leave Review</button>` :
                            ''
                        }
                    </div>
                `).join('') :
                '<div class="card"><p>No past sessions</p></div>'
            }
        </div>
    `;
}

// ==================== PROFILE PAGE ====================
function renderProfile() {
    const user = currentUser;
    
    return `
        <div class="navbar">
            <div class="nav-content">
                <div class="logo">
                    <h1>🌿 MindCare</h1>
                </div>
                <div class="nav-links">
                    <a href="#" onclick="navigate('${user.userType}-dashboard')">Back</a>
                </div>
            </div>
        </div>
        
        <div class="container">
            <div class="card">
                <h2>My Profile</h2>
                <div style="text-align: center; margin: 20px 0;">
                    <div style="font-size: 4rem;">👤</div>
                    <h3>${user.fullName}</h3>
                    <p>${user.userType === 'client' ? 'Client' : user.userType === 'therapist' ? 'Licensed Therapist' : 'Mental Health Counselor'}</p>
                </div>
                
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" value="${user.email}" disabled>
                </div>
                
                <div class="form-group">
                    <label>Member Since</label>
                    <input type="text" value="${new Date(user.registeredAt).toLocaleDateString()}" disabled>
                </div>
                
                ${user.specialization ? `
                    <div class="form-group">
                        <label>Specialization</label>
                        <input type="text" value="${user.specialization}" disabled>
                    </div>
                    <div class="form-group">
                        <label>Experience</label>
                        <input type="text" value="${user.experience} years" disabled>
                    </div>
                    <div class="form-group">
                        <label>Hourly Rate</label>
                        <input type="text" value="$${user.hourlyRate}/hour" disabled>
                    </div>
                ` : ''}
                
                <button class="btn btn-secondary" onclick="navigate('${user.userType}-dashboard')">Back to Dashboard</button>
            </div>
        </div>
    `;
}

// ==================== EVENT HANDLERS ====================
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find(u => u.email === email);
    
    if (!user) {
        alert('User not found. Please register first.');
        return;
    }
    
    if (user.userType !== userType) {
        alert(`Invalid user type. This account is registered as ${user.userType}.`);
        return;
    }
    
    localStorage.setItem('user', JSON.stringify(user));
    currentUser = user;
    
    // Navigate to appropriate dashboard
    switch(user.userType) {
        case 'client':
            navigate('client-dashboard');
            break;
        case 'therapist':
            navigate('therapist-dashboard');
            break;
        case 'counselor':
            navigate('counselor-dashboard');
            break;
        case 'admin':
            navigate('admin-dashboard');
            break;
    }
}

function handleRegister(event) {
    event.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        alert('Email already registered. Please login.');
        return;
    }
    
    const user = {
        email: email,
        fullName: fullName,
        userType: userType,
        registeredAt: new Date().toISOString()
    };
    
    // Add professional fields if therapist or counselor
    if (userType === 'therapist' || userType === 'counselor') {
        user.licenseNumber = document.getElementById('licenseNumber')?.value || 'PENDING';
        user.experience = document.getElementById('experience')?.value || 0;
        user.specialization = document.getElementById('specialization')?.value || 'General';
        user.hourlyRate = document.getElementById('hourlyRate')?.value || 75;
        user.verified = false;
        
        // Add to pending verifications for admin
        const pending = JSON.parse(localStorage.getItem('pendingVerifications') || '[]');
        pending.push({
            id: Date.now(),
            name: fullName,
            email: email,
            role: userType,
            licenseNumber: user.licenseNumber,
            specialization: user.specialization,
            experience: user.experience
        });
        localStorage.setItem('pendingVerifications', JSON.stringify(pending));
        
        alert('Registration submitted! Your account will be verified by admin within 24 hours.');
    } else {
        user.verified = true;
        alert('Account created successfully! Welcome to MindCare!');
    }
    
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(user));
    currentUser = user;
    
    // Navigate to appropriate dashboard
    if (userType === 'client') {
        navigate('client-dashboard');
    } else if (userType === 'therapist') {
        navigate('therapist-dashboard');
    } else if (userType === 'counselor') {
        navigate('counselor-dashboard');
    }
}

function handleLogout() {
    localStorage.removeItem('user');
    currentUser = null;
    navigate('home');
}

function startAssessment(type) {
    currentAssessment = type;
    assessmentResponses = [];
    currentQuestionIndex = 0;
    navigate('take-assessment');
}

function selectAnswer(answerIndex) {
    assessmentResponses[currentQuestionIndex] = answerIndex;
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach((btn, idx) => {
        if (idx === answerIndex) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

function nextQuestion() {
    if (assessmentResponses[currentQuestionIndex] === undefined) {
        alert('Please select an answer before continuing');
        return;
    }
    currentQuestionIndex++;
    renderPage('take-assessment');
}

function previousQuestion() {
    currentQuestionIndex--;
    renderPage('take-assessment');
}

function submitAssessment() {
    if (assessmentResponses[currentQuestionIndex] === undefined) {
        alert('Please answer all questions before submitting');
        return;
    }
    
    const questions = currentAssessment === 'PHQ-9' ? phq9Questions : gad7Questions;
    const totalScore = assessmentResponses.reduce((sum, val) => sum + val, 0);
    const maxScore = currentAssessment === 'PHQ-9' ? 27 : 21;
    
    let severity = '';
    if (totalScore <= 4) severity = 'Minimal';
    else if (totalScore <= 9) severity = 'Mild';
    else if (totalScore <= 14) severity = 'Moderate';
    else if (totalScore <= 19) severity = 'Moderately Severe';
    else severity = 'Severe';
    
    const assessment = {
        id: Date.now(),
        type: currentAssessment,
        clientId: currentUser.email,
        clientName: currentUser.fullName,
        date: new Date().toISOString(),
        score: totalScore,
        maxScore: maxScore,
        severity: severity,
        responses: assessmentResponses
    };
    
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    assessments.push(assessment);
    localStorage.setItem('assessments', JSON.stringify(assessments));
    
    let message = `${currentAssessment} Assessment Complete!\n\n`;
    message += `Your Score: ${totalScore}/${maxScore}\n`;
    message += `Severity: ${severity}\n\n`;
    message += `Recommendation: `;
    
    if (severity === 'Minimal') {
        message += 'Continue self-care practices and regular check-ins.';
    } else if (severity === 'Mild') {
        message += 'Consider self-help strategies. A therapist can help develop coping skills.';
    } else if (severity === 'Moderate') {
        message += 'We recommend speaking with a therapist. Would you like to book an appointment?';
    } else {
        message += 'Please reach out to a mental health professional soon. Your wellbeing matters.';
    }
    
    alert(message);
    
    currentAssessment = null;
    assessmentResponses = [];
    currentQuestionIndex = 0;
    navigate('client-dashboard');
}

function cancelAssessment() {
    currentAssessment = null;
    assessmentResponses = [];
    currentQuestionIndex = 0;
    navigate('assessment');
}

function bookWithTherapist(therapistName, therapistId) {
    const appointment = {
        id: Date.now(),
        clientId: currentUser.email,
        clientName: currentUser.fullName,
        therapistId: therapistId,
        therapistName: therapistName,
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        time: '2:00 PM',
        status: 'confirmed',
        bookedAt: new Date().toISOString()
    };
    
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    alert(`Appointment booked with ${therapistName}!\n\nDate: Tomorrow at 2:00 PM\nA reminder will be sent before your session.`);
    navigate('appointments');
}

function cancelAppointment(id) {
    let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments = appointments.filter(a => a.id != id);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    alert('Appointment cancelled successfully');
    navigate('appointments');
}

function startVideoSession(appointmentId) {
    alert('🎥 Video Session Starting\n\nPlease ensure your camera and microphone are working.\nThe session will begin in a secure, encrypted room.');
    // Here you would integrate actual video call (Jitsi, Zoom, etc.)
}

function leaveReview(therapistId, therapistName) {
    const rating = prompt('Rate your session (1-5 stars):', '5');
    const comment = prompt('Write your review:', 'Great session! Very helpful.');
    
    if (rating && comment) {
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.push({
            id: Date.now(),
            therapistId: therapistId,
            therapistName: therapistName,
            clientId: currentUser.email,
            clientName: currentUser.fullName,
            rating: parseInt(rating),
            comment: comment,
            date: new Date().toISOString()
        });
        localStorage.setItem('reviews', JSON.stringify(reviews));
        alert('Thank you for your feedback!');
        navigate('appointments');
    }
}

function verifyProfessional(id, approve) {
    const pending = JSON.parse(localStorage.getItem('pendingVerifications') || '[]');
    const verification = pending.find(v => v.id === id);
    
    if (approve && verification) {
        // Add to therapists list
        const therapists = JSON.parse(localStorage.getItem('therapists') || '[]');
        therapists.push({
            id: Date.now(),
            name: verification.name,
            role: verification.role,
            specialty: verification.specialization,
            experience: verification.experience,
            rating: 0,
            price: 75,
            image: verification.role === 'therapist' ? '👨‍⚕️' : '👩‍⚕️',
            verified: true
        });
        localStorage.setItem('therapists', JSON.stringify(therapists));
        
        // Update user to verified
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === verification.email);
        if (userIndex !== -1) {
            users[userIndex].verified = true;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        alert(`${verification.name} has been verified and added to therapists list!`);
    }
    
    // Remove from pending
    const newPending = pending.filter(v => v.id !== id);
    localStorage.setItem('pendingVerifications', JSON.stringify(newPending));
    renderPage('admin-dashboard');
}

function deleteUser(email) {
    if (confirm('Are you sure you want to delete this user?')) {
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        users = users.filter(u => u.email !== email);
        localStorage.setItem('users', JSON.stringify(users));
        alert('User deleted successfully');
        renderPage('admin-dashboard');
    }
}

// Initialize
function init() {
    initializeData();
    const hash = window.location.hash.substring(1);
    if (hash) {
        renderPage(hash);
    } else {
        renderPage('home');
    }
}

window.addEventListener('load', init);
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    renderPage(hash);
});