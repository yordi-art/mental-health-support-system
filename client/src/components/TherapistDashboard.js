import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TherapistDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Mock data for demonstration
  const todayAppointments = [
    { id: 1, clientName: 'Emma Wilson', time: '10:00 AM', duration: '50 min', type: 'Therapy Session', status: 'upcoming', notes: 'Follow-up on anxiety management' },
    { id: 2, clientName: 'James Chen', time: '11:30 AM', duration: '50 min', type: 'Initial Assessment', status: 'upcoming', notes: 'New client intake' },
    { id: 3, clientName: 'Sarah Miller', time: '2:00 PM', duration: '50 min', type: 'Therapy Session', status: 'upcoming', notes: 'CBT progress review' },
    { id: 4, clientName: 'David Kim', time: '3:30 PM', duration: '50 min', type: 'Therapy Session', status: 'upcoming', notes: 'Trauma-informed care' }
  ];

  const upcomingAppointments = [
    { id: 5, clientName: 'Lisa Wong', date: 'March 26, 2024', time: '10:00 AM', type: 'Therapy Session', status: 'confirmed' },
    { id: 6, clientName: 'Michael Brown', date: 'March 26, 2024', time: '1:00 PM', type: 'Follow-up', status: 'confirmed' },
    { id: 7, clientName: 'Rachel Green', date: 'March 27, 2024', time: '11:00 AM', type: 'Initial Assessment', status: 'pending' }
  ];

  const recentClients = [
    { id: 1, name: 'Emma Wilson', lastSession: 'March 18, 2024', diagnosis: 'Generalized Anxiety Disorder (F41.1)', progress: 65, nextSession: 'March 25, 2024' },
    { id: 2, name: 'James Chen', lastSession: 'March 17, 2024', diagnosis: 'Major Depressive Disorder (F32.9)', progress: 42, nextSession: 'March 26, 2024' },
    { id: 3, name: 'Sarah Miller', lastSession: 'March 16, 2024', diagnosis: 'Social Anxiety (F40.1)', progress: 78, nextSession: 'March 25, 2024' }
  ];

  const pendingVerifications = user.verificationStatus !== 'verified' ? {
    status: 'pending',
    submittedDate: 'March 20, 2024',
    licenseNumber: user.licenseNumber || 'MH-2024-12345',
    issuingAuthority: user.issuingAuthority || 'State Board of Psychology',
    verificationScore: 85
  } : null;

  const stats = {
    activeClients: 24,
    sessionsThisWeek: 16,
    completedSessions: 142,
    avgRating: 4.8,
    responseRate: 98,
    availability: 'Mon, Wed, Fri'
  };

  const recentReviews = [
    { id: 1, client: 'Emma Wilson', rating: 5, comment: 'Dr. Johnson has been incredibly helpful. I feel much more in control of my anxiety.', date: 'March 18, 2024' },
    { id: 2, client: 'James Chen', rating: 5, comment: 'Very professional and understanding. Great therapist.', date: 'March 15, 2024' },
    { id: 3, client: 'Sarah Miller', rating: 4, comment: 'Helpful sessions, looking forward to continuing.', date: 'March 12, 2024' }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div style={{ background: '#F7F9FC', minHeight: '100vh', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Top Navigation */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E9EDF2', padding: '0 32px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            <div>
              <span style={{ fontSize: '22px', fontWeight: '600', color: '#1A4D8C', letterSpacing: '-0.3px' }}>MindCare</span>
              <span style={{ fontSize: '12px', color: '#6B7A8F', marginLeft: '8px', fontWeight: '400' }}>Provider Portal</span>
            </div>
            <div style={{ display: 'flex', gap: '32px' }}>
              <span style={{ color: '#1A4D8C', fontWeight: '500', fontSize: '14px', borderBottom: '2px solid #1A4D8C', paddingBottom: '24px' }}>Dashboard</span>
              <span style={{ color: '#6B7A8F', fontSize: '14px', cursor: 'pointer' }}>Schedule</span>
              <span style={{ color: '#6B7A8F', fontSize: '14px', cursor: 'pointer' }}>Clients</span>
              <span style={{ color: '#6B7A8F', fontSize: '14px', cursor: 'pointer' }}>Notes</span>
              <span style={{ color: '#6B7A8F', fontSize: '14px', cursor: 'pointer' }}>Billing</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7A8F" strokeWidth="1.5">
                <path d="M18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8V11.1C6 12.4 5.5 13.6 4.7 14.5L4.5 14.7C3.5 15.9 4.2 17.6 5.8 17.9C10.4 18.7 13.6 18.7 18.2 17.9C19.8 17.6 20.5 15.9 19.5 14.7L19.3 14.5C18.5 13.6 18 12.3 18 11.1V8Z" />
                <path d="M9 19C9.3978 20.1648 10.3352 21.1022 11.5 21.5" stroke="#6B7A8F" strokeWidth="1.5" />
              </svg>
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#E74C3C', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '16px', borderLeft: '1px solid #E9EDF2' }}>
              <div style={{ width: '40px', height: '40px', background: '#1A4D8C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '500', fontSize: '16px' }}>
                {user.fullName?.charAt(0) || 'D'}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#1A2C3E' }}>{user.fullName}</div>
                <div style={{ fontSize: '12px', color: '#6B7A8F' }}>{user.specialization || 'Clinical Psychologist'}</div>
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
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#9AA6B5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Provider Menu</div>
            </div>
            <div style={{ padding: '8px 0' }}>
              {[
                { icon: '◉', label: 'Overview', active: true, id: 'overview' },
                { icon: '◌', label: 'Schedule', active: false, id: 'schedule' },
                { icon: '◌', label: 'Client Roster', active: false, id: 'clients' },
                { icon: '◌', label: 'Clinical Notes', active: false, id: 'notes' },
                { icon: '◌', label: 'Resources', active: false, id: 'resources' },
                { icon: '◌', label: 'Billing', active: false, id: 'billing' },
                { icon: '◌', label: 'Settings', active: false, id: 'settings' }
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
              <h1 style={{ fontSize: '28px', fontWeight: '500', color: '#1A2C3E', marginBottom: '8px', letterSpacing: '-0.3px' }}>{getGreeting()}, Dr. {user.fullName?.split(' ')[1] || user.fullName?.split(' ')[0]}.</h1>
              <p style={{ fontSize: '16px', color: '#6B7A8F', lineHeight: '1.5' }}>You have {todayAppointments.length} appointments today. Your clients are counting on you.</p>
            </div>
          </div>

          {/* Verification Status Card - Only if not verified */}
          {pendingVerifications && (
            <div style={{ background: '#FEF5E8', borderRadius: '16px', padding: '24px', marginBottom: '32px', border: '1px solid #F0E5D8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#E67E22', marginBottom: '8px', textTransform: 'uppercase' }}>Verification Status</div>
                  <div style={{ fontSize: '18px', fontWeight: '500', color: '#1A2C3E', marginBottom: '4px' }}>Credential Verification Pending</div>
                  <div style={{ fontSize: '14px', color: '#6B7A8F' }}>Your license is being reviewed by the system. Verification score: {pendingVerifications.verificationScore}%</div>
                  <div style={{ marginTop: '12px', fontSize: '13px', color: '#9AA6B5' }}>License: {pendingVerifications.licenseNumber} • Issued by: {pendingVerifications.issuingAuthority}</div>
                </div>
                <button style={{ padding: '10px 24px', background: '#E67E22', color: 'white', border: 'none', borderRadius: '40px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>View Details</button>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '32px' }}>
            {[
              { label: 'Active Clients', value: stats.activeClients, icon: '👥' },
              { label: 'Sessions This Week', value: stats.sessionsThisWeek, icon: '📅' },
              { label: 'Total Sessions', value: stats.completedSessions, icon: '📊' },
              { label: 'Client Rating', value: stats.avgRating, suffix: '★', icon: '⭐' },
              { label: 'Response Rate', value: stats.responseRate, suffix: '%', icon: '⚡' }
            ].map((stat, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', borderRadius: '16px', padding: '20px', border: '1px solid #E9EDF2', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
                <div style={{ fontSize: '28px', fontWeight: '500', color: '#1A4D8C', marginBottom: '4px' }}>{stat.value}{stat.suffix || ''}</div>
                <div style={{ fontSize: '12px', color: '#6B7A8F' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Today's Schedule */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', marginBottom: '32px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E9EDF2', background: '#FAFBFD' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '500', color: '#1A2C3E' }}>Today's Schedule</h2>
                <span style={{ fontSize: '13px', color: '#1A4D8C' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
            <div style={{ padding: '20px 24px' }}>
              {todayAppointments.map((apt, idx) => (
                <div key={apt.id} style={{ padding: '16px 0', borderBottom: idx < todayAppointments.length - 1 ? '1px solid #E9EDF2' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E' }}>{apt.time}</span>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#1A4D8C' }}>{apt.clientName}</span>
                        <span style={{ fontSize: '12px', color: '#9AA6B5' }}>{apt.duration}</span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7A8F', marginBottom: '8px' }}>{apt.type}</div>
                      <div style={{ fontSize: '12px', color: '#9AA6B5' }}>{apt.notes}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{ padding: '8px 20px', background: '#1A4D8C', color: 'white', border: 'none', borderRadius: '40px', fontSize: '13px', cursor: 'pointer' }}>Start Session</button>
                      <button style={{ padding: '8px 20px', background: 'transparent', border: '1px solid #E9EDF2', borderRadius: '40px', fontSize: '13px', cursor: 'pointer' }}>View Notes</button>
                    </div>
                  </div>
                </div>
              ))}
              <button style={{ marginTop: '16px', padding: '10px 0', background: 'transparent', border: 'none', color: '#1A4D8C', fontSize: '13px', cursor: 'pointer', width: '100%' }}>View Full Schedule →</button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            {/* Upcoming Appointments */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E9EDF2', background: '#FAFBFD' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E' }}>Upcoming Appointments</h3>
              </div>
              <div style={{ padding: '16px 24px' }}>
                {upcomingAppointments.map((apt, idx) => (
                  <div key={apt.id} style={{ padding: '12px 0', borderBottom: idx < upcomingAppointments.length - 1 ? '1px solid #E9EDF2' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#1A2C3E' }}>{apt.clientName}</div>
                        <div style={{ fontSize: '12px', color: '#6B7A8F', marginTop: '2px' }}>{apt.date} at {apt.time} • {apt.type}</div>
                      </div>
                      <div>
                        <span style={{ background: apt.status === 'confirmed' ? '#E8F5E9' : '#FEF5E8', color: apt.status === 'confirmed' ? '#2C7A4D' : '#E67E22', padding: '4px 12px', borderRadius: '20px', fontSize: '11px' }}>
                          {apt.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Client Activity */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E9EDF2', background: '#FAFBFD' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E' }}>Recent Client Activity</h3>
              </div>
              <div style={{ padding: '16px 24px' }}>
                {recentClients.map((client, idx) => (
                  <div key={client.id} style={{ padding: '12px 0', borderBottom: idx < recentClients.length - 1 ? '1px solid #E9EDF2' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#1A2C3E' }}>{client.name}</span>
                        <span style={{ fontSize: '11px', color: '#9AA6B5', marginLeft: '8px' }}>{client.diagnosis}</span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#2C7A4D' }}>{client.progress}% progress</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6B7A8F' }}>
                      <span>Last: {client.lastSession}</span>
                      <span>Next: {client.nextSession}</span>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ height: '4px', background: '#E9EDF2', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${client.progress}%`, height: '100%', background: '#1A4D8C', borderRadius: '2px' }}></div>
                      </div>
                    </div>
                  </div>
                ))}
                <button style={{ marginTop: '12px', padding: '8px 0', background: 'transparent', border: 'none', color: '#1A4D8C', fontSize: '12px', cursor: 'pointer', width: '100%' }}>View All Clients →</button>
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', marginBottom: '32px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E9EDF2', background: '#FAFBFD' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E' }}>Client Feedback</h3>
            </div>
            <div style={{ padding: '20px 24px' }}>
              {recentReviews.map((review, idx) => (
                <div key={review.id} style={{ padding: '16px 0', borderBottom: idx < recentReviews.length - 1 ? '1px solid #E9EDF2' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#1A2C3E' }}>{review.client}</span>
                      <span style={{ marginLeft: '12px', fontSize: '12px', color: '#F5A623' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#9AA6B5' }}>{review.date}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7A8F', lineHeight: '1.5' }}>"{review.comment}"</div>
                </div>
              ))}
              <button style={{ marginTop: '12px', padding: '8px 0', background: 'transparent', border: 'none', color: '#1A4D8C', fontSize: '12px', cursor: 'pointer', width: '100%' }}>View All Reviews →</button>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { action: 'Schedule Appointment', icon: '📅', color: '#1A4D8C' },
              { action: 'Clinical Notes', icon: '📝', color: '#2C7A4D' },
              { action: 'Client Resources', icon: '📚', color: '#E67E22' },
              { action: 'Set Availability', icon: '⏰', color: '#9AA6B5' }
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
          {/* Profile Summary */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E9EDF2', marginBottom: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '80px', height: '80px', background: '#1A4D8C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px', fontWeight: '500', margin: '0 auto 12px' }}>
                {user.fullName?.charAt(0) || 'D'}
              </div>
              <div style={{ fontSize: '18px', fontWeight: '500', color: '#1A2C3E' }}>{user.fullName}</div>
              <div style={{ fontSize: '13px', color: '#6B7A8F', marginTop: '4px' }}>{user.specialization || 'Clinical Psychologist'}</div>
              <div style={{ marginTop: '12px' }}>
                <span style={{ background: user.verificationStatus === 'verified' ? '#E8F5E9' : '#FEF5E8', color: user.verificationStatus === 'verified' ? '#2C7A4D' : '#E67E22', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>
                  {user.verificationStatus === 'verified' ? 'Verified Provider' : 'Verification Pending'}
                </span>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #E9EDF2', paddingTop: '16px' }}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', color: '#9AA6B5', marginBottom: '4px' }}>License Number</div>
                <div style={{ fontSize: '13px', color: '#1A2C3E' }}>{user.licenseNumber || 'PSY-2024-12345'}</div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', color: '#9AA6B5', marginBottom: '4px' }}>Years of Experience</div>
                <div style={{ fontSize: '13px', color: '#1A2C3E' }}>{user.experience || '12'} years</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#9AA6B5', marginBottom: '4px' }}>Availability</div>
                <div style={{ fontSize: '13px', color: '#1A2C3E' }}>{stats.availability}</div>
              </div>
            </div>
          </div>

          {/* Availability Status */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '20px', border: '1px solid #E9EDF2', marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#9AA6B5', marginBottom: '16px' }}>Availability Status</div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px' }}>Today</span>
                <span style={{ fontSize: '13px', color: '#2C7A4D' }}>Available</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px' }}>Tomorrow</span>
                <span style={{ fontSize: '13px', color: '#2C7A4D' }}>Available</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px' }}>Wednesday</span>
                <span style={{ fontSize: '13px', color: '#E67E22' }}>Limited</span>
              </div>
            </div>
            <button style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid #E9EDF2', borderRadius: '40px', fontSize: '13px', cursor: 'pointer' }}>Update Schedule</button>
          </div>

          {/* Resources */}
          <div style={{ background: '#F0F4FA', borderRadius: '16px', padding: '20px', border: '1px solid #E9EDF2' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#1A4D8C', marginBottom: '16px' }}>Clinical Resources</div>
            <div style={{ marginBottom: '12px', fontSize: '13px', color: '#4A5A6E', cursor: 'pointer' }}>• Assessment Templates (PHQ-9, GAD-7)</div>
            <div style={{ marginBottom: '12px', fontSize: '13px', color: '#4A5A6E', cursor: 'pointer' }}>• Clinical Documentation Guidelines</div>
            <div style={{ marginBottom: '12px', fontSize: '13px', color: '#4A5A6E', cursor: 'pointer' }}>• Client Handouts & Worksheets</div>
            <div style={{ fontSize: '13px', color: '#4A5A6E', cursor: 'pointer' }}>• Continuing Education</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboard;
