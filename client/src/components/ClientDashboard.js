import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const [user, setUser] = useState(null);
  const [mood, setMood] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    const savedMood = localStorage.getItem(`mood_${userData?.email}`);
    if (savedMood) setMood(savedMood);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    localStorage.setItem(`mood_${user?.email}`, selectedMood);
  };

  if (!user) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div style={{ background: '#F7F9FC', minHeight: '100vh', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Top Navigation */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E9EDF2', padding: '0 32px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            <div>
              <span style={{ fontSize: '22px', fontWeight: '600', color: '#1A4D8C', letterSpacing: '-0.3px' }}>MindCare</span>
              <span style={{ fontSize: '12px', color: '#6B7A8F', marginLeft: '8px', fontWeight: '400' }}>Client Portal</span>
            </div>
            <div style={{ display: 'flex', gap: '32px' }}>
              <span style={{ color: '#1A4D8C', fontWeight: '500', fontSize: '14px', borderBottom: '2px solid #1A4D8C', paddingBottom: '24px' }}>Dashboard</span>
              <span style={{ color: '#6B7A8F', fontSize: '14px', cursor: 'pointer' }}>Assessments</span>
              <span style={{ color: '#6B7A8F', fontSize: '14px', cursor: 'pointer' }}>My Sessions</span>
              <span style={{ color: '#6B7A8F', fontSize: '14px', cursor: 'pointer' }}>Resources</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7A8F" strokeWidth="1.5">
                <path d="M18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8V11.1C6 12.4 5.5 13.6 4.7 14.5L4.5 14.7C3.5 15.9 4.2 17.6 5.8 17.9C10.4 18.7 13.6 18.7 18.2 17.9C19.8 17.6 20.5 15.9 19.5 14.7L19.3 14.5C18.5 13.6 18 12.3 18 11.1V8Z" />
                <path d="M9 19C9.3978 20.1648 10.3352 21.1022 11.5 21.5" stroke="#6B7A8F" strokeWidth="1.5" />
              </svg>
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#E74C3C', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '16px', borderLeft: '1px solid #E9EDF2' }}>
              <div style={{ width: '40px', height: '40px', background: '#1A4D8C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '500', fontSize: '16px' }}>
                {user.fullName?.charAt(0) || 'U'}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#1A2C3E' }}>{user.fullName}</div>
                <div style={{ fontSize: '12px', color: '#6B7A8F' }}>Member since March 2024</div>
              </div>
              <button onClick={handleLogout} style={{ marginLeft: '8px', padding: '6px 12px', background: 'transparent', border: '1px solid #E9EDF2', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#6B7A8F' }}>Sign Out</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 32px', display: 'flex', gap: '40px' }}>
        {/* Sidebar */}
        <div style={{ width: '260px', flexShrink: 0 }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E9EDF2', padding: '20px 0' }}>
            <div style={{ padding: '0 20px 16px 20px', borderBottom: '1px solid #E9EDF2' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#9AA6B5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Navigation</div>
            </div>
            <div style={{ padding: '8px 0' }}>
              {[
                { icon: '◉', label: 'Overview', active: true, id: 'dashboard' },
                { icon: '◌', label: 'Assessments', active: false, id: 'assessments' },
                { icon: '◌', label: 'My Support Team', active: false, id: 'team' },
                { icon: '◌', label: 'Appointments', active: false, id: 'appointments' },
                { icon: '◌', label: 'Session Records', active: false, id: 'records' },
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
          <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '40px', marginBottom: '32px', border: '1px solid #E9EDF2' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '500', color: '#1A2C3E', marginBottom: '12px', letterSpacing: '-0.3px' }}>{getGreeting()}, {user.fullName.split(' ')[0]}.</h1>
              <p style={{ fontSize: '16px', color: '#6B7A8F', lineHeight: '1.5', marginBottom: '28px', maxWidth: '500px' }}>Your well-being is our priority. Take a moment to check in with yourself today.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ padding: '12px 28px', background: '#1A4D8C', color: 'white', border: 'none', borderRadius: '40px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Take Assessment</button>
                <button style={{ padding: '12px 28px', background: 'transparent', border: '1px solid #D0D8E3', borderRadius: '40px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', color: '#4A5A6E' }}>View Support Team</button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
            {[
              { label: 'Latest PHQ-9 Score', value: '8/27', subtext: 'Screening completed Mar 20', status: 'improving', statusText: 'Improving' },
              { label: 'Latest GAD-7 Score', value: '11/21', subtext: 'Screening completed Mar 20', status: 'stable', statusText: 'Moderate' },
              { label: 'Sessions Completed', value: '2', subtext: 'Recommended: 12 sessions', status: 'progress', statusText: '16% complete' },
              { label: 'Next Appointment', value: 'Mar 25, 3:00 PM', subtext: 'Dr. Sarah Johnson', status: 'upcoming', statusText: 'Confirmed' }
            ].map((stat, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', borderRadius: '16px', padding: '20px', border: '1px solid #E9EDF2' }}>
                <div style={{ fontSize: '13px', color: '#9AA6B5', marginBottom: '12px' }}>{stat.label}</div>
                <div style={{ fontSize: '28px', fontWeight: '500', color: '#1A2C3E', marginBottom: '6px' }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: '#6B7A8F', marginBottom: '8px' }}>{stat.subtext}</div>
                <div style={{ fontSize: '11px', color: stat.status === 'improving' ? '#2C7A4D' : stat.status === 'stable' ? '#E67E22' : '#1A4D8C' }}>{stat.statusText}</div>
              </div>
            ))}
          </div>

          {/* Mood Check + Assessment Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
            {/* Mood Check Card */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E9EDF2' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E', marginBottom: '16px' }}>How are you feeling today?</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['Good', 'Okay', 'Stressed', 'Low'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleMoodSelect(option)}
                    style={{
                      padding: '8px 20px',
                      background: mood === option ? '#1A4D8C' : '#F7F9FC',
                      border: mood === option ? 'none' : '1px solid #E9EDF2',
                      borderRadius: '40px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: mood === option ? '500' : '400',
                      color: mood === option ? 'white' : '#4A5A6E'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {mood && (
                <div style={{ marginTop: '16px', padding: '12px', background: '#F7F9FC', borderRadius: '12px', fontSize: '13px', color: '#2C7A4D' }}>
                  Thank you for sharing. Your well-being matters.
                </div>
              )}
            </div>

            {/* Latest Assessment Result */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E9EDF2' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E', marginBottom: '12px' }}>Recent Assessment</h3>
              <div style={{ fontSize: '14px', color: '#6B7A8F', marginBottom: '16px' }}>GAD-7 (Generalized Anxiety Disorder) • March 20, 2024</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px', fontWeight: '500', color: '#E67E22' }}>11</span>
                <span style={{ fontSize: '16px', color: '#9AA6B5' }}>/ 21</span>
                <span style={{ fontSize: '14px', color: '#E67E22', background: '#FEF5E8', padding: '4px 12px', borderRadius: '20px' }}>Moderate</span>
              </div>
              <p style={{ fontSize: '13px', color: '#6B7A8F', lineHeight: '1.5', marginBottom: '16px' }}>Scores between 10-14 indicate moderate anxiety symptoms. Your therapist can help develop coping strategies.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ padding: '8px 20px', background: 'transparent', border: '1px solid #D0D8E3', borderRadius: '40px', fontSize: '13px', cursor: 'pointer' }}>View Full Report</button>
                <button style={{ padding: '8px 20px', background: '#1A4D8C', color: 'white', border: 'none', borderRadius: '40px', fontSize: '13px', cursor: 'pointer' }}>New Assessment</button>
              </div>
            </div>
          </div>

          {/* Recommended Next Step */}
          <div style={{ background: '#F0F4FA', borderRadius: '16px', padding: '24px', marginBottom: '32px', border: '1px solid #E9EDF2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#1A4D8C', marginBottom: '8px' }}>Recommended Next Step</div>
                <div style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E', marginBottom: '4px' }}>Your recent assessment suggests moderate anxiety</div>
                <div style={{ fontSize: '14px', color: '#6B7A8F' }}>Consider scheduling a follow-up session with your therapist to discuss coping strategies.</div>
              </div>
              <button style={{ padding: '10px 28px', background: '#1A4D8C', color: 'white', border: 'none', borderRadius: '40px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Book a Session</button>
            </div>
          </div>

          {/* Your Support Team */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#1A2C3E', marginBottom: '20px' }}>Your Support Team</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {[
                { name: 'Dr. Sarah Johnson, MD', title: 'Psychiatrist', specialty: 'Anxiety & Mood Disorders', rating: '4.9', education: 'Harvard Medical School', availability: 'Available today, 3:00 PM' },
                { name: 'Dr. Michael Chen, PhD', title: 'Clinical Psychologist', specialty: 'Trauma & PTSD', rating: '4.8', education: 'Stanford University', availability: 'Available tomorrow, 10:00 AM' },
                { name: 'Dr. Emily Rodriguez, PsyD', title: 'Licensed Psychologist', specialty: 'Stress Management', rating: '4.7', education: 'UCLA', availability: 'Available tomorrow, 2:00 PM' }
              ].map((provider, idx) => (
                <div key={idx} style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E9EDF2' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E', marginBottom: '4px' }}>{provider.name}</div>
                      <div style={{ fontSize: '12px', color: '#1A4D8C', marginBottom: '8px' }}>{provider.title}</div>
                    </div>
                    <div style={{ background: '#E8F5E9', color: '#2C7A4D', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '500' }}>Verified</div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#4A5A6E', marginBottom: '8px' }}>{provider.specialty}</div>
                  <div style={{ fontSize: '12px', color: '#6B7A8F', marginBottom: '12px' }}>{provider.education}</div>
                  <div style={{ fontSize: '12px', color: '#2C7A4D', marginBottom: '16px' }}>{provider.availability}</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid #D0D8E3', borderRadius: '40px', fontSize: '13px', cursor: 'pointer' }}>View Profile</button>
                    <button style={{ flex: 1, padding: '10px', background: '#1A4D8C', color: 'white', border: 'none', borderRadius: '40px', fontSize: '13px', cursor: 'pointer' }}>Request</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Session */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '28px', marginBottom: '32px', border: '1px solid #E9EDF2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '500', color: '#9AA6B5', textTransform: 'uppercase', marginBottom: '12px' }}>Upcoming Session</div>
                <div style={{ fontSize: '20px', fontWeight: '500', color: '#1A2C3E', marginBottom: '4px' }}>Dr. Sarah Johnson, MD</div>
                <div style={{ fontSize: '14px', color: '#6B7A8F', marginBottom: '12px' }}>Virtual Consultation • Department of Mental Health</div>
                <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
                  <div><span style={{ fontSize: '12px', color: '#9AA6B5' }}>Date</span><br /><span style={{ fontSize: '15px', fontWeight: '500', color: '#1A2C3E' }}>March 25, 2024</span></div>
                  <div><span style={{ fontSize: '12px', color: '#9AA6B5' }}>Time</span><br /><span style={{ fontSize: '15px', fontWeight: '500', color: '#1A2C3E' }}>3:00 PM</span></div>
                  <div><span style={{ fontSize: '12px', color: '#9AA6B5' }}>Status</span><br /><span style={{ fontSize: '12px', color: '#2C7A4D', background: '#E8F5E9', padding: '2px 12px', borderRadius: '20px' }}>Confirmed</span></div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                <button style={{ padding: '12px 32px', background: '#1A4D8C', color: 'white', border: 'none', borderRadius: '40px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Join Session</button>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ padding: '8px 20px', background: 'transparent', border: '1px solid #D0D8E3', borderRadius: '40px', fontSize: '13px', cursor: 'pointer' }}>Reschedule</button>
                  <button style={{ padding: '8px 20px', background: 'transparent', border: '1px solid #E9EDF2', borderRadius: '40px', fontSize: '13px', cursor: 'pointer', color: '#E74C3C' }}>Cancel</button>
                </div>
              </div>
            </div>
          </div>

          {/* Session History & Billing */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E9EDF2' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E', marginBottom: '20px' }}>Recent Sessions</h3>
              {[
                { therapist: 'Dr. Sarah Johnson, MD', date: 'March 18, 2024', type: 'Therapy Session', status: 'Completed' },
                { therapist: 'Dr. Michael Chen, PhD', date: 'March 10, 2024', type: 'Initial Assessment', status: 'Completed' }
              ].map((session, idx) => (
                <div key={idx} style={{ padding: '16px 0', borderBottom: idx === 0 ? '1px solid #E9EDF2' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#1A2C3E' }}>{session.therapist}</div>
                      <div style={{ fontSize: '12px', color: '#6B7A8F', marginTop: '4px' }}>{session.date} • {session.type}</div>
                    </div>
                    <button style={{ padding: '4px 16px', background: 'transparent', border: '1px solid #E9EDF2', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>View Notes</button>
                  </div>
                </div>
              ))}
              <button style={{ marginTop: '16px', padding: '8px 0', background: 'transparent', border: 'none', color: '#1A4D8C', fontSize: '13px', cursor: 'pointer', width: '100%' }}>View Full History</button>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E9EDF2' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1A2C3E', marginBottom: '20px' }}>Billing Summary</h3>
              {[
                { amount: '$80.00', date: 'March 18, 2024', method: 'Visa •••• 4242', status: 'Paid', receipt: 'INV-2024-001' },
                { amount: '$90.00', date: 'March 10, 2024', method: 'Visa •••• 4242', status: 'Paid', receipt: 'INV-2024-002' }
              ].map((bill, idx) => (
                <div key={idx} style={{ padding: '12px 0', borderBottom: idx === 0 ? '1px solid #E9EDF2' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#1A2C3E' }}>{bill.amount}</div>
                      <div style={{ fontSize: '11px', color: '#6B7A8F' }}>{bill.date} • {bill.method}</div>
                    </div>
                    <div>
                      <span style={{ color: '#2C7A4D', fontSize: '12px', marginRight: '12px' }}>{bill.status}</span>
                      <button style={{ padding: '2px 12px', background: 'transparent', border: '1px solid #E9EDF2', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Receipt</button>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #E9EDF2', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: '#6B7A8F' }}>Total Paid</span>
                <span style={{ fontSize: '18px', fontWeight: '500', color: '#1A2C3E' }}>$170.00</span>
              </div>
              <button style={{ marginTop: '16px', padding: '8px 0', background: 'transparent', border: 'none', color: '#1A4D8C', fontSize: '13px', cursor: 'pointer', width: '100%' }}>View All Transactions</button>
            </div>
          </div>

          {/* Wellness Note */}
          <div style={{ background: '#F7F9FC', borderRadius: '16px', padding: '20px 24px', border: '1px solid #E9EDF2' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px' }}>📄</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#1A2C3E', marginBottom: '4px' }}>Note from Your Care Team</div>
                <div style={{ fontSize: '13px', color: '#6B7A8F', lineHeight: '1.5' }}>Your progress is encouraging. Continue practicing the breathing exercises we discussed. Looking forward to our next session on March 25.</div>
                <div style={{ fontSize: '11px', color: '#9AA6B5', marginTop: '8px' }}>Dr. Sarah Johnson • March 20, 2024</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: '280px', flexShrink: 0 }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E9EDF2', marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#9AA6B5', textTransform: 'uppercase', marginBottom: '20px' }}>Patient Information</div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#9AA6B5', marginBottom: '4px' }}>Date of Birth</div>
              <div style={{ fontSize: '14px', color: '#1A2C3E' }}>May 15, 1995</div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#9AA6B5', marginBottom: '4px' }}>Patient ID</div>
              <div style={{ fontSize: '14px', color: '#1A2C3E' }}>P-{user.email?.substring(0, 8) || '12345678'}</div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#9AA6B5', marginBottom: '4px' }}>Insurance</div>
              <div style={{ fontSize: '14px', color: '#1A2C3E' }}>Blue Cross Blue Shield</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#9AA6B5', marginBottom: '4px' }}>Primary Diagnosis</div>
              <div style={{ fontSize: '14px', color: '#1A2C3E' }}>F41.1 - Generalized Anxiety Disorder</div>
            </div>
          </div>

          <div style={{ background: '#FEF5E8', borderRadius: '16px', padding: '24px', border: '1px solid #F0E5D8' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#E67E22', marginBottom: '16px' }}>Emergency Support</div>
            <div style={{ fontSize: '13px', marginBottom: '12px', color: '#4A5A6E' }}>If you need immediate assistance:</div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ marginBottom: '8px' }}><span style={{ fontWeight: '500' }}>988</span> - Crisis Lifeline</div>
              <div style={{ marginBottom: '8px' }}><span style={{ fontWeight: '500' }}>911</span> - Emergency Services</div>
              <div><span style={{ fontWeight: '500' }}>741741</span> - Text Support</div>
            </div>
            <button style={{ width: '100%', padding: '10px', background: '#E67E22', color: 'white', border: 'none', borderRadius: '40px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>Get Help Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
