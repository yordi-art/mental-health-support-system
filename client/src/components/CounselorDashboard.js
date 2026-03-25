import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CounselorDashboard = () => {
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

  // Mock data for counselor dashboard
  const todaySessions = [
    { id: 1, clientName: 'Emma Wilson', time: '10:00 AM', duration: '45 min', type: 'Counseling Session', focus: 'Anxiety management strategies', status: 'upcoming' },
    { id: 2, clientName: 'James Chen', time: '11:30 AM', duration: '45 min', type: 'Initial Consultation', focus: 'Life transition support', status: 'upcoming' },
    { id: 3, clientName: 'Sarah Miller', time: '2:00 PM', duration: '45 min', type: 'Follow-up Session', focus: 'Progress review', status: 'upcoming' },
    { id: 4, clientName: 'David Kim', time: '3:30 PM', duration: '45 min', type: 'Coping Skills Session', focus: 'Stress reduction techniques', status: 'upcoming' }
  ];

  const upcomingSessions = [
    { id: 5, clientName: 'Lisa Wong', date: 'March 26, 2024', time: '10:00 AM', type: 'Grief Counseling', status: 'confirmed' },
    { id: 6, clientName: 'Michael Brown', date: 'March 26, 2024', time: '1:00 PM', type: 'Career Counseling', status: 'confirmed' },
    { id: 7, clientName: 'Rachel Green', date: 'March 27, 2024', time: '11:00 AM', type: 'Family Counseling', status: 'pending' }
  ];

  const activeClients = [
    { id: 1, name: 'Emma Wilson', lastSession: 'March 18, 2024', concerns: 'Anxiety, Work stress', progress: 65, nextSession: 'March 25, 2024', goals: ['Stress management', 'Work-life balance'] },
    { id: 2, name: 'James Chen', lastSession: 'March 17, 2024', concerns: 'Life transitions, Career decisions', progress: 42, nextSession: 'March 26, 2024', goals: ['Clarity on career path', 'Confidence building'] },
    { id: 3, name: 'Sarah Miller', lastSession: 'March 16, 2024', concerns: 'Relationship issues', progress: 78, nextSession: 'March 25, 2024', goals: ['Communication skills', 'Boundary setting'] },
    { id: 4, name: 'David Kim', lastSession: 'March 15, 2024', concerns: 'Academic stress', progress: 53, nextSession: 'March 27, 2024', goals: ['Time management', 'Study techniques'] }
  ];

  const stats = {
    activeClients: 28,
    sessionsThisWeek: 18,
    completedSessions: 156,
    clientSatisfaction: 4.7,
    avgSessionRating: 4.8,
    availability: 'Mon-Thu, 9AM-5PM'
  };

  const clientFeedback = [
    { id: 1, client: 'Emma Wilson', rating: 5, comment: 'My counselor is incredibly supportive and understanding. I feel heard and validated.', date: 'March 18, 2024', topic: 'Anxiety Support' },
    { id: 2, client: 'James Chen', rating: 5, comment: 'Very helpful guidance during a difficult transition period.', date: 'March 15, 2024', topic: 'Career Counseling' },
    { id: 3, client: 'Sarah Miller', rating: 4, comment: 'Practical tools and strategies that actually work.', date: 'March 12, 2024', topic: 'Relationship Counseling' },
    { id: 4, client: 'David Kim', rating: 5, comment: 'My counselor helped me develop better study habits and reduce stress.', date: 'March 10, 2024', topic: 'Academic Support' }
  ];

  const counselingResources = [
    { title: 'Anxiety Management Techniques', type: 'Worksheet', downloads: 45 },
    { title: 'Mindfulness Exercises Guide', type: 'PDF', downloads: 38 },
    { title: 'Stress Reduction Strategies', type: 'Article', downloads: 52 },
    { title: 'Communication Skills Workbook', type: 'Workbook', downloads: 29 }
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
              <span style={{ fontSize: '12px', color: '#6B7A8F', marginLeft: '8px', fontWeight: '400' }}>Counselor Portal</span>
            </div>
            <div style={{ display: 'flex', gap: '32px' }}>
              <span style={{ color: '#1A4D8C', fontWeight: '500', fontSize: '14px', borderBottom: '2px solid #1A4D8C', paddingBottom: '24px' }}>Dashboard</span>
              <span style={{ color: '#6B7A8F', fontSize: '14px', cursor: 'pointer' }}>Schedule</span>
              <span style={{ color: '#6B7A8F', fontSize: '14px', cursor: 'pointer' }}>Clients</span>
              <span style={{ color: '#6B7A8F', fontSize: '14px', cursor: 'pointer' }}>Resources</span>
              <span style={{ color: '#6B7A8F', fontSize: '14px', cursor: 'pointer' }}>Notes</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7A8F" strokeWidth="1.5">
                <path d="M18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8V11.1C6 12.4 5.5 13.6 4.7 14.5L4.5 14.7C3.5 15.9 4.2 17.6 5.8 17.9C10.4 18.7 13.6 18.7 18.2 17.9C19.8 17.6 20.5 15.9 19.5 14.7L19.3 14.5C18.5 13.6 18 12.3 18 11.1V8Z" />
                <path d="M9 19C9.3978 20.1648 10.3352 21.1022 11.5 21.5" stroke="#6B7A8F" strokeWidth="1.5" />
              </svg>
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#E74C3C', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '16px', borderLeft: '1px solid #E9EDF2' }}>
              <div style={{ width: '40px', height: '40px', background: '#2C7A4D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '500', fontSize: '16px' }}>
                {user.fullName?.charAt(0) || 'C'}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#1A2C3E' }}>{user.fullName}</div>
                <div style={{ fontSize: '12px', color: '#6B7A8F' }}>{user.specialization || 'Licensed Professional Counselor'}</div>
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
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#9AA6B5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Counselor Menu</div>
            </div>
            <div style={{ padding: '8px 0' }}>
              {[
                { icon: '◉', label: 'Overview', active: true, id: 'overview' },
                { icon: '◌', label: 'Session Schedule', active: false, id: 'schedule' },
                { icon: '◌', label: 'Client List', active: false, id: 'clients' },
                { icon: '◌', label: 'Counseling Notes', active: false, id: 'notes' },
                { icon: '◌', label: 'Resources Library', active: false, id: 'resources' },
                { icon: '◌', label: 'Client Progress', active: false, id: 'progress' },
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
              <h1 style={{ fontSize: '28px', fontWeight: '500', color: '#1A2C3E', marginBottom: '8px', letterSpacing: '-0.3px' }}>{getGreeting()}, {user.fullName?.split(' ')[0]}.</h1>
              <p style={{ fontSize: '16px', color: '#6B7A8F', lineHeight: '1.5', marginBottom: '16px' }}>You have {todaySessions.length} counseling sessions today. Your support makes a difference.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ padding: '10px 24px', background: '#2C7A4D', color: 'white', border: 'none', borderRadius: '40px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>Start Session</button>
                <button style={{ padding: '10px 24px', background: 'transparent', border: '1px solid #E9EDF2', borderRadius: '40px', fontSize: '13px', cursor: 'pointer' }}>Client Resources</button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '32px' }}>
            {[
              { label: 'Active Clients', value: stats.activeClients, icon: '👥', color: '#1A4D8C' },
              { label: 'Sessions This Week', value: stats.sessionsThisWeek, icon: '📅', color: '#2C7A4D' },
              { label: 'Total Sessions', value: stats.completedSessions, icon: '📊', color: '#E67E22' },
              { label: 'Client Satisfaction', value: stats.clientSatisfaction, suffix: '★', icon: '⭐', color: '#F5A623' },
              { label: 'Avg Session Rating', value: stats.avgSessionRating, suffix: '★', icon: '🎯', color: '#9AA6B5' }
            ].map((stat, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', borderRadius: '16px', padding: '20px', border: '1px solid #E9EDF2', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
                <div style={{ fontSize: '28px', fontWeight: '500', color: stat.color, marginBottom: '4px' }}>{stat.value}{stat.suffix || ''}</div>
                <div style={{ fontSize: '12px', color: '#6B7A8F' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Today's Counseling Sessions */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', marginBottom: '32px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E9EDF2', background: '#FAFBFD' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '500', color: '#1A2C3E' }}>Today's Counseling Sessions</h2>
                <span style={{ fontSize: '13px', color: '#2C7A4D' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
            <div style={{ padding: '20px 24px' }}>
              {todaySessions.map((session, idx) => (
                <div key={session.id} style={{ padding: '16px 0', borderBottom: idx < todaySessions.length - 1 ? '1px solid #E9EDF2' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E' }}>{session.time}</span>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#2C7A4D' }}>{session.clientName}</span>
                        <span style={{ fontSize: '12px', color: '#9AA6B5' }}>{session.duration}</span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7A8F', marginBottom: '4px' }}>{session.type}</div>
                      <div style={{ fontSize: '12px', color: '#9AA6B5' }}>Focus: {session.focus}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{ padding: '8px 20px', background: '#2C7A4D', color: 'white', border: 'none', borderRadius: '40px', fontSize: '13px', cursor: 'pointer' }}>Start Session</button>
                      <button style={{ padding: '8px 20px', background: 'transparent', border: '1px solid #E9EDF2', borderRadius: '40px', fontSize: '13px', cursor: 'pointer' }}>Prepare Notes</button>
                    </div>
                  </div>
                </div>
              ))}
              <button style={{ marginTop: '16px', padding: '10px 0', background: 'transparent', border: 'none', color: '#2C7A4D', fontSize: '13px', cursor: 'pointer', width: '100%' }}>View Full Schedule →</button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            {/* Upcoming Sessions */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E9EDF2', background: '#FAFBFD' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E' }}>Upcoming Sessions</h3>
              </div>
              <div style={{ padding: '16px 24px' }}>
                {upcomingSessions.map((session, idx) => (
                  <div key={session.id} style={{ padding: '12px 0', borderBottom: idx < upcomingSessions.length - 1 ? '1px solid #E9EDF2' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#1A2C3E' }}>{session.clientName}</div>
                        <div style={{ fontSize: '12px', color: '#6B7A8F', marginTop: '2px' }}>{session.date} at {session.time} • {session.type}</div>
                      </div>
                      <div>
                        <span style={{ background: session.status === 'confirmed' ? '#E8F5E9' : '#FEF5E8', color: session.status === 'confirmed' ? '#2C7A4D' : '#E67E22', padding: '4px 12px', borderRadius: '20px', fontSize: '11px' }}>
                          {session.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Clients Progress */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E9EDF2', background: '#FAFBFD' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E' }}>Active Clients Progress</h3>
              </div>
              <div style={{ padding: '16px 24px' }}>
                {activeClients.slice(0, 3).map((client, idx) => (
                  <div key={client.id} style={{ padding: '12px 0', borderBottom: idx < 2 ? '1px solid #E9EDF2' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#1A2C3E' }}>{client.name}</span>
                        <span style={{ fontSize: '11px', color: '#9AA6B5', marginLeft: '8px' }}>{client.concerns}</span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#2C7A4D' }}>{client.progress}%</span>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ height: '4px', background: '#E9EDF2', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${client.progress}%`, height: '100%', background: '#2C7A4D', borderRadius: '2px' }}></div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#6B7A8F' }}>
                      <span>Goals: {client.goals.join(', ')}</span>
                    </div>
                    <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                      <button style={{ padding: '4px 12px', background: 'transparent', border: '1px solid #E9EDF2', borderRadius: '20px', fontSize: '11px', cursor: 'pointer' }}>View Progress</button>
                      <button style={{ padding: '4px 12px', background: 'transparent', border: '1px solid #E9EDF2', borderRadius: '20px', fontSize: '11px', cursor: 'pointer' }}>Session Notes</button>
                    </div>
                  </div>
                ))}
                <button style={{ marginTop: '12px', padding: '8px 0', background: 'transparent', border: 'none', color: '#2C7A4D', fontSize: '12px', cursor: 'pointer', width: '100%' }}>View All Clients →</button>
              </div>
            </div>
          </div>

          {/* Client Feedback */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', marginBottom: '32px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E9EDF2', background: '#FAFBFD' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E' }}>Client Feedback</h3>
            </div>
            <div style={{ padding: '20px 24px' }}>
              {clientFeedback.map((feedback, idx) => (
                <div key={feedback.id} style={{ padding: '16px 0', borderBottom: idx < clientFeedback.length - 1 ? '1px solid #E9EDF2' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#1A2C3E' }}>{feedback.client}</span>
                      <span style={{ marginLeft: '12px', fontSize: '11px', color: '#9AA6B5' }}>{feedback.topic}</span>
                      <span style={{ marginLeft: '12px', fontSize: '12px', color: '#F5A623' }}>{'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#9AA6B5' }}>{feedback.date}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7A8F', lineHeight: '1.5', fontStyle: 'italic' }}>"{feedback.comment}"</div>
                </div>
              ))}
              <button style={{ marginTop: '12px', padding: '8px 0', background: 'transparent', border: 'none', color: '#2C7A4D', fontSize: '12px', cursor: 'pointer', width: '100%' }}>View All Feedback →</button>
            </div>
          </div>

          {/* Counseling Resources */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', marginBottom: '32px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E9EDF2', background: '#FAFBFD' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E' }}>Popular Counseling Resources</h3>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {counselingResources.map((resource, idx) => (
                  <div key={idx} style={{ padding: '12px', background: '#F7F9FC', borderRadius: '12px', cursor: 'pointer' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1A2C3E', marginBottom: '4px' }}>{resource.title}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6B7A8F' }}>
                      <span>{resource.type}</span>
                      <span>{resource.downloads} downloads</span>
                    </div>
                  </div>
                ))}
              </div>
              <button style={{ marginTop: '16px', padding: '10px 0', background: 'transparent', border: 'none', color: '#2C7A4D', fontSize: '13px', cursor: 'pointer', width: '100%' }}>Browse Resource Library →</button>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { action: 'Schedule Session', icon: '📅', color: '#1A4D8C' },
              { action: 'Counseling Notes', icon: '📝', color: '#2C7A4D' },
              { action: 'Share Resource', icon: '📚', color: '#E67E22' },
              { action: 'Client Check-in', icon: '💬', color: '#9AA6B5' }
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
              <div style={{ width: '80px', height: '80px', background: '#2C7A4D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px', fontWeight: '500', margin: '0 auto 12px' }}>
                {user.fullName?.charAt(0) || 'C'}
              </div>
              <div style={{ fontSize: '18px', fontWeight: '500', color: '#1A2C3E' }}>{user.fullName}</div>
              <div style={{ fontSize: '13px', color: '#6B7A8F', marginTop: '4px' }}>{user.specialization || 'Licensed Professional Counselor'}</div>
              <div style={{ marginTop: '12px' }}>
                <span style={{ background: '#E8F5E9', color: '#2C7A4D', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>Active Provider</span>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #E9EDF2', paddingTop: '16px' }}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', color: '#9AA6B5', marginBottom: '4px' }}>License / Credential</div>
                <div style={{ fontSize: '13px', color: '#1A2C3E' }}>{user.licenseNumber || 'LPC-2024-12345'}</div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', color: '#9AA6B5', marginBottom: '4px' }}>Counseling Approach</div>
                <div style={{ fontSize: '13px', color: '#1A2C3E' }}>Person-Centered, CBT, Mindfulness</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#9AA6B5', marginBottom: '4px' }}>Availability</div>
                <div style={{ fontSize: '13px', color: '#1A2C3E' }}>{stats.availability}</div>
              </div>
            </div>
          </div>

          {/* Wellness Tip */}
          <div style={{ background: '#F0F4FA', borderRadius: '16px', padding: '20px', border: '1px solid #E9EDF2', marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#1A4D8C', marginBottom: '12px' }}>Counselor Wellness Tip</div>
            <div style={{ fontSize: '13px', color: '#4A5A6E', lineHeight: '1.5', marginBottom: '12px' }}>
              "Remember to practice self-care. Your well-being directly impacts the quality of care you provide."
            </div>
            <button style={{ width: '100%', padding: '8px', background: 'transparent', border: '1px solid #E9EDF2', borderRadius: '40px', fontSize: '12px', cursor: 'pointer' }}>Self-Care Resources</button>
          </div>

          {/* Supervision/Support */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '20px', border: '1px solid #E9EDF2' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#9AA6B5', marginBottom: '16px' }}>Clinical Support</div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Next Supervision</div>
              <div style={{ fontSize: '13px', color: '#2C7A4D' }}>March 28, 2024 • 2:00 PM</div>
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Peer Consultation Group</div>
              <div style={{ fontSize: '13px', color: '#6B7A8F' }}>Wednesdays • 4:00 PM</div>
            </div>
            <button style={{ marginTop: '16px', width: '100%', padding: '8px', background: 'transparent', border: '1px solid #E9EDF2', borderRadius: '40px', fontSize: '12px', cursor: 'pointer' }}>Request Consultation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorDashboard;
