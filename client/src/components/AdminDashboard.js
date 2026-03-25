import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

  // System Analytics Data
  const systemStats = {
    totalUsers: 1248,
    activeUsers: 892,
    newUsersThisMonth: 156,
    totalTherapists: 48,
    verifiedTherapists: 42,
    pendingVerification: 6,
    totalCounselors: 32,
    verifiedCounselors: 28,
    pendingCounselorVerification: 4,
    totalAppointments: 3452,
    completedAppointments: 2891,
    upcomingAppointments: 412,
    cancelledAppointments: 149,
    totalAssessments: 2156,
    phq9Completed: 1243,
    gad7Completed: 913,
    totalRevenue: 24580,
    pendingPayments: 1280,
    avgRating: 4.7,
    platformUptime: 99.8
  };

  // Recent verification requests
  const pendingVerifications = [
    { id: 1, name: 'Dr. Sarah Johnson', type: 'Therapist', license: 'PSY-2024-12345', submitted: '2024-03-20', specialization: 'Anxiety & Depression', status: 'pending', score: 85 },
    { id: 2, name: 'Dr. Michael Chen', type: 'Therapist', license: 'PSY-2024-12346', submitted: '2024-03-19', specialization: 'Trauma & PTSD', status: 'pending', score: 78 },
    { id: 3, name: 'Emily Rodriguez', type: 'Counselor', license: 'LPC-2024-78901', submitted: '2024-03-18', specialization: 'Family Counseling', status: 'pending', score: 92 },
    { id: 4, name: 'Dr. James Wilson', type: 'Therapist', license: 'PSY-2024-12347', submitted: '2024-03-17', specialization: 'Addiction', status: 'review', score: 65 },
    { id: 5, name: 'Lisa Thompson', type: 'Counselor', license: 'LPC-2024-78902', submitted: '2024-03-16', specialization: 'Stress Management', status: 'pending', score: 88 },
    { id: 6, name: 'David Kim', type: 'Therapist', license: 'PSY-2024-12348', submitted: '2024-03-15', specialization: 'Child Psychology', status: 'pending', score: 72 }
  ];

  // Recent flagged accounts
  const flaggedAccounts = [
    { id: 1, name: 'John Doe', type: 'Therapist', reason: 'License expired', date: '2024-03-20', status: 'investigating' },
    { id: 2, name: 'Jane Smith', type: 'Counselor', reason: 'Multiple complaints', date: '2024-03-18', status: 'review' }
  ];

  // Recent platform activity
  const recentActivity = [
    { id: 1, action: 'New therapist registration', user: 'Dr. Sarah Johnson', time: '2024-03-20 14:32', status: 'pending_verification' },
    { id: 2, action: 'Appointment completed', user: 'Emma Wilson', time: '2024-03-20 13:15', status: 'completed' },
    { id: 3, action: 'Assessment submitted', user: 'James Chen', time: '2024-03-20 11:45', status: 'phq9' },
    { id: 4, action: 'Payment processed', user: 'Sarah Miller', time: '2024-03-20 10:30', status: 'completed' },
    { id: 5, action: 'New client registration', user: 'Lisa Wong', time: '2024-03-20 09:20', status: 'active' },
    { id: 6, action: 'Counselor verification requested', user: 'Emily Rodriguez', time: '2024-03-19 16:45', status: 'pending' }
  ];

  // Top performing professionals
  const topProfessionals = [
    { id: 1, name: 'Dr. Sarah Johnson', type: 'Therapist', sessions: 142, rating: 4.9, clients: 28 },
    { id: 2, name: 'Dr. Michael Chen', type: 'Therapist', sessions: 128, rating: 4.8, clients: 24 },
    { id: 3, name: 'Emily Rodriguez', type: 'Counselor', sessions: 98, rating: 4.7, clients: 22 },
    { id: 4, name: 'Dr. James Wilson', type: 'Therapist', sessions: 87, rating: 4.9, clients: 19 }
  ];

  // System health metrics
  const systemHealth = {
    serverStatus: 'operational',
    databaseStatus: 'operational',
    apiLatency: 142,
    errorRate: 0.3,
    activeSessions: 156
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div style={{ background: '#F7F9FC', minHeight: '100vh', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Top Navigation */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E9EDF2', padding: '0 32px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            <div>
              <span style={{ fontSize: '22px', fontWeight: '600', color: '#1A4D8C', letterSpacing: '-0.3px' }}>MindCare</span>
              <span style={{ fontSize: '12px', color: '#6B7A8F', marginLeft: '8px', fontWeight: '400' }}>Admin Console</span>
            </div>
            <div style={{ display: 'flex', gap: '32px' }}>
              <span style={{ color: '#1A4D8C', fontWeight: '500', fontSize: '14px', borderBottom: '2px solid #1A4D8C', paddingBottom: '24px' }}>Dashboard</span>
              <span style={{ color: '#6B7A8F', fontSize: '14px', cursor: 'pointer' }}>Verification</span>
              <span style={{ color: '#6B7A8F', fontSize: '14px', cursor: 'pointer' }}>Users</span>
              <span style={{ color: '#6B7A8F', fontSize: '14px', cursor: 'pointer' }}>Analytics</span>
              <span style={{ color: '#6B7A8F', fontSize: '14px', cursor: 'pointer' }}>System Health</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7A8F" strokeWidth="1.5">
                <path d="M18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8V11.1C6 12.4 5.5 13.6 4.7 14.5L4.5 14.7C3.5 15.9 4.2 17.6 5.8 17.9C10.4 18.7 13.6 18.7 18.2 17.9C19.8 17.6 20.5 15.9 19.5 14.7L19.3 14.5C18.5 13.6 18 12.3 18 11.1V8Z" />
                <path d="M9 19C9.3978 20.1648 10.3352 21.1022 11.5 21.5" stroke="#6B7A8F" strokeWidth="1.5" />
              </svg>
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#E74C3C', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>6</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '16px', borderLeft: '1px solid #E9EDF2' }}>
              <div style={{ width: '40px', height: '40px', background: '#E74C3C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '500', fontSize: '16px' }}>
                A
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#1A2C3E' }}>Admin</div>
                <div style={{ fontSize: '12px', color: '#6B7A8F' }}>System Administrator</div>
              </div>
              <button onClick={handleLogout} style={{ marginLeft: '8px', padding: '6px 12px', background: 'transparent', border: '1px solid #E9EDF2', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#6B7A8F' }}>Sign Out</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px', display: 'flex', gap: '32px' }}>
        {/* Sidebar */}
        <div style={{ width: '280px', flexShrink: 0 }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', padding: '20px 0' }}>
            <div style={{ padding: '0 20px 16px 20px', borderBottom: '1px solid #E9EDF2' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#9AA6B5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Admin Menu</div>
            </div>
            <div style={{ padding: '8px 0' }}>
              {[
                { icon: '◉', label: 'Overview', active: true, id: 'overview' },
                { icon: '◌', label: 'Verification Queue', active: false, id: 'verification' },
                { icon: '◌', label: 'User Management', active: false, id: 'users' },
                { icon: '◌', label: 'Professional Oversight', active: false, id: 'professionals' },
                { icon: '◌', label: 'Platform Analytics', active: false, id: 'analytics' },
                { icon: '◌', label: 'Financial Reports', active: false, id: 'finance' },
                { icon: '◌', label: 'System Logs', active: false, id: 'logs' }
              ].map(item => (
                <div key={item.label} onClick={() => setActiveTab(item.id)} style={{ padding: '10px 20px', margin: '0 8px', borderRadius: '8px', background: item.active ? '#F0F4FA' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: item.active ? '#1A4D8C' : '#9AA6B5', fontSize: '14px' }}>{item.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: item.active ? '500' : '400', color: item.active ? '#1A4D8C' : '#4A5A6E' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {/* Welcome Hero */}
          <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '32px 40px', marginBottom: '32px', border: '1px solid #E9EDF2' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '500', color: '#1A2C3E', marginBottom: '8px', letterSpacing: '-0.3px' }}>{getGreeting()}, Admin.</h1>
              <p style={{ fontSize: '16px', color: '#6B7A8F', lineHeight: '1.5' }}>System Overview • {systemStats.totalUsers} total users • {systemStats.platformUptime}% uptime</p>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              <button onClick={() => setSelectedPeriod('day')} style={{ padding: '6px 16px', background: selectedPeriod === 'day' ? '#1A4D8C' : 'transparent', color: selectedPeriod === 'day' ? 'white' : '#6B7A8F', border: '1px solid #E9EDF2', borderRadius: '20px', fontSize: '13px', cursor: 'pointer' }}>Today</button>
              <button onClick={() => setSelectedPeriod('week')} style={{ padding: '6px 16px', background: selectedPeriod === 'week' ? '#1A4D8C' : 'transparent', color: selectedPeriod === 'week' ? 'white' : '#6B7A8F', border: '1px solid #E9EDF2', borderRadius: '20px', fontSize: '13px', cursor: 'pointer' }}>This Week</button>
              <button onClick={() => setSelectedPeriod('month')} style={{ padding: '6px 16px', background: selectedPeriod === 'month' ? '#1A4D8C' : 'transparent', color: selectedPeriod === 'month' ? 'white' : '#6B7A8F', border: '1px solid #E9EDF2', borderRadius: '20px', fontSize: '13px', cursor: 'pointer' }}>This Month</button>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
            {[
              { label: 'Total Users', value: systemStats.totalUsers, change: '+12%', icon: '👥', color: '#1A4D8C' },
              { label: 'Active Users', value: systemStats.activeUsers, change: '+8%', icon: '📊', color: '#2C7A4D' },
              { label: 'Total Sessions', value: systemStats.totalAppointments, change: '+15%', icon: '📅', color: '#E67E22' },
              { label: 'Revenue (Monthly)', value: `$${systemStats.totalRevenue}`, change: '+22%', icon: '💰', color: '#F5A623' }
            ].map((metric, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', borderRadius: '16px', padding: '20px', border: '1px solid #E9EDF2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{metric.icon}</span>
                  <span style={{ fontSize: '12px', color: '#2C7A4D', background: '#E8F5E9', padding: '2px 8px', borderRadius: '20px' }}>{metric.change}</span>
                </div>
                <div style={{ fontSize: '28px', fontWeight: '500', color: metric.color, marginBottom: '4px' }}>{metric.value}</div>
                <div style={{ fontSize: '12px', color: '#6B7A8F' }}>{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Verification Queue Section */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', marginBottom: '32px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E9EDF2', background: '#FAFBFD' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '500', color: '#1A2C3E' }}>Verification Queue</h2>
                <span style={{ fontSize: '13px', color: '#E67E22', background: '#FEF5E8', padding: '4px 12px', borderRadius: '20px' }}>{systemStats.pendingVerification + systemStats.pendingCounselorVerification} pending</span>
              </div>
            </div>
            <div style={{ padding: '0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#F7F9FC', borderBottom: '1px solid #E9EDF2' }}>
                  <tr>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7A8F' }}>Professional</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7A8F' }}>Type</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7A8F' }}>License</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7A8F' }}>Score</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7A8F' }}>Submitted</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7A8F' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingVerifications.map((item, idx) => (
                    <tr key={item.id} style={{ borderBottom: idx < pendingVerifications.length - 1 ? '1px solid #E9EDF2' : 'none' }}>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ fontWeight: '500', color: '#1A2C3E' }}>{item.name}</div>
                        <div style={{ fontSize: '12px', color: '#6B7A8F' }}>{item.specialization}</div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ background: item.type === 'Therapist' ? '#E8F5E9' : '#F0F4FA', color: item.type === 'Therapist' ? '#2C7A4D' : '#1A4D8C', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{item.type}</span>
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '13px', color: '#4A5A6E' }}>{item.license}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ color: item.score >= 80 ? '#2C7A4D' : item.score >= 70 ? '#E67E22' : '#E74C3C', fontWeight: '500' }}>{item.score}%</span>
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '13px', color: '#6B7A8F' }}>{formatDate(item.submitted)}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button style={{ padding: '6px 16px', background: '#2C7A4D', color: 'white', border: 'none', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>Verify</button>
                          <button style={{ padding: '6px 16px', background: 'transparent', border: '1px solid #E9EDF2', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>Review</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: '16px 20px', borderTop: '1px solid #E9EDF2', textAlign: 'center' }}>
                <button style={{ background: 'transparent', border: 'none', color: '#1A4D8C', fontSize: '13px', cursor: 'pointer' }}>View All Verification Requests →</button>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            {/* Platform Activity */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E9EDF2', background: '#FAFBFD' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E' }}>Recent Platform Activity</h3>
              </div>
              <div style={{ padding: '16px 24px' }}>
                {recentActivity.map((activity, idx) => (
                  <div key={activity.id} style={{ padding: '12px 0', borderBottom: idx < recentActivity.length - 1 ? '1px solid #E9EDF2' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '500', color: '#1A2C3E' }}>{activity.action}</div>
                        <div style={{ fontSize: '12px', color: '#6B7A8F', marginTop: '2px' }}>{activity.user}</div>
                      </div>
                      <div style={{ fontSize: '11px', color: '#9AA6B5' }}>{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Professionals */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E9EDF2', background: '#FAFBFD' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E' }}>Top Performing Professionals</h3>
              </div>
              <div style={{ padding: '16px 24px' }}>
                {topProfessionals.map((prof, idx) => (
                  <div key={prof.id} style={{ padding: '12px 0', borderBottom: idx < topProfessionals.length - 1 ? '1px solid #E9EDF2' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '500', color: '#1A2C3E' }}>{prof.name}</div>
                        <div style={{ fontSize: '11px', color: '#6B7A8F', marginTop: '2px' }}>{prof.type} • {prof.clients} clients</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '13px', fontWeight: '500', color: '#2C7A4D' }}>{prof.sessions} sessions</div>
                        <div style={{ fontSize: '11px', color: '#F5A623' }}>{'★'.repeat(Math.floor(prof.rating))} {prof.rating}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Health & Flagged Accounts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            {/* System Health */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E9EDF2', background: '#FAFBFD' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E' }}>System Health</h3>
              </div>
              <div style={{ padding: '20px 24px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#6B7A8F' }}>Server Status</span>
                    <span style={{ fontSize: '13px', color: '#2C7A4D', fontWeight: '500' }}>Operational</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#6B7A8F' }}>Database Status</span>
                    <span style={{ fontSize: '13px', color: '#2C7A4D', fontWeight: '500' }}>Operational</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#6B7A8F' }}>API Latency</span>
                    <span style={{ fontSize: '13px', color: '#1A2C3E', fontWeight: '500' }}>{systemHealth.apiLatency} ms</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#6B7A8F' }}>Error Rate</span>
                    <span style={{ fontSize: '13px', color: '#2C7A4D', fontWeight: '500' }}>{systemHealth.errorRate}%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: '#6B7A8F' }}>Active Sessions</span>
                    <span style={{ fontSize: '13px', color: '#1A2C3E', fontWeight: '500' }}>{systemHealth.activeSessions}</span>
                  </div>
                </div>
                <button style={{ width: '100%', padding: '8px', background: 'transparent', border: '1px solid #E9EDF2', borderRadius: '40px', fontSize: '12px', cursor: 'pointer' }}>View Detailed Metrics</button>
              </div>
            </div>

            {/* Flagged Accounts */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E9EDF2', background: '#FAFBFD' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E' }}>Flagged Accounts</h3>
              </div>
              <div style={{ padding: '16px 24px' }}>
                {flaggedAccounts.map((account, idx) => (
                  <div key={account.id} style={{ padding: '12px 0', borderBottom: idx < flaggedAccounts.length - 1 ? '1px solid #E9EDF2' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '500', color: '#1A2C3E' }}>{account.name}</div>
                        <div style={{ fontSize: '11px', color: '#6B7A8F', marginTop: '2px' }}>{account.type} • {account.reason}</div>
                      </div>
                      <div>
                        <span style={{ background: '#FEF5E8', color: '#E67E22', padding: '4px 12px', borderRadius: '20px', fontSize: '11px' }}>{account.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {flaggedAccounts.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#6B7A8F' }}>No flagged accounts</div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { action: 'User Management', icon: '👥', color: '#1A4D8C' },
              { action: 'Generate Report', icon: '📊', color: '#2C7A4D' },
              { action: 'System Settings', icon: '⚙️', color: '#E67E22' },
              { action: 'View Logs', icon: '📋', color: '#9AA6B5' }
            ].map((item, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', borderRadius: '12px', padding: '16px', border: '1px solid #E9EDF2', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: '500', color: item.color }}>{item.action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: '300px', flexShrink: 0 }}>
          {/* Platform Stats */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '20px', border: '1px solid #E9EDF2', marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#9AA6B5', marginBottom: '16px' }}>Platform Statistics</div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#6B7A8F' }}>Therapists</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A2C3E' }}>{systemStats.totalTherapists}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#6B7A8F' }}>Counselors</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A2C3E' }}>{systemStats.totalCounselors}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#6B7A8F' }}>Verified Providers</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#2C7A4D' }}>{systemStats.verifiedTherapists + systemStats.verifiedCounselors}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#6B7A8F' }}>Pending Verification</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#E67E22' }}>{systemStats.pendingVerification + systemStats.pendingCounselorVerification}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#6B7A8F' }}>Assessment Completion</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A2C3E' }}>{Math.round((systemStats.totalAssessments / systemStats.totalUsers) * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Assessment Distribution */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '20px', border: '1px solid #E9EDF2', marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#9AA6B5', marginBottom: '16px' }}>Assessment Distribution</div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: '#6B7A8F' }}>PHQ-9</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A2C3E' }}>{systemStats.phq9Completed}</span>
              </div>
              <div style={{ height: '6px', background: '#E9EDF2', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${(systemStats.phq9Completed / systemStats.totalAssessments) * 100}%`, height: '100%', background: '#1A4D8C', borderRadius: '3px' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: '#6B7A8F' }}>GAD-7</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A2C3E' }}>{systemStats.gad7Completed}</span>
              </div>
              <div style={{ height: '6px', background: '#E9EDF2', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${(systemStats.gad7Completed / systemStats.totalAssessments) * 100}%`, height: '100%', background: '#2C7A4D', borderRadius: '3px' }}></div>
              </div>
            </div>
          </div>

          {/* System Alerts */}
          <div style={{ background: '#FEF5E8', borderRadius: '16px', padding: '20px', border: '1px solid #F0E5D8' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#E67E22', marginBottom: '12px' }}>System Alerts</div>
            <div style={{ fontSize: '13px', color: '#4A5A6E', marginBottom: '12px' }}>
              • {systemStats.pendingVerification + systemStats.pendingCounselorVerification} professionals awaiting verification
            </div>
            <div style={{ fontSize: '13px', color: '#4A5A6E', marginBottom: '12px' }}>
              • 2 flagged accounts requiring review
            </div>
            <div style={{ fontSize: '13px', color: '#4A5A6E' }}>
              • System update scheduled for March 28, 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
