import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/authService';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    getProfile(token)
      .then(data => setUser(data.user))
      .catch(() => { localStorage.clear(); navigate('/login'); })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) return <div style={styles.center}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Dashboard</h2>
            <p style={styles.subtitle}>You are successfully logged in!</p>
          </div>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
        <div style={styles.profileBox}>
          <div style={styles.avatar}>{user?.name?.charAt(0).toUpperCase()}</div>
          <div>
            <p style={styles.name}>{user?.name}</p>
            <p style={styles.email}>{user?.email}</p>
            <p style={styles.joined}>Joined: {new Date(user?.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        <div style={styles.statsRow}>
          <div style={styles.statBox}><span style={styles.statNum}>1</span><span style={styles.statLabel}>Account</span></div>
          <div style={styles.statBox}><span style={styles.statNum}>✓</span><span style={styles.statLabel}>Verified</span></div>
          <div style={styles.statBox}><span style={styles.statNum}>JWT</span><span style={styles.statLabel}>Auth Type</span></div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  center: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' },
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' },
  card: { background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '480px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' },
  title: { margin: '0 0 4px', fontSize: '24px', fontWeight: '700', color: '#1a1a2e' },
  subtitle: { margin: 0, color: '#888', fontSize: '13px' },
  logoutBtn: { padding: '8px 16px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' },
  profileBox: { display: 'flex', alignItems: 'center', gap: '16px', background: '#f8f9ff', padding: '20px', borderRadius: '10px', marginBottom: '24px' },
  avatar: { width: '56px', height: '56px', borderRadius: '50%', background: '#4f46e5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '700', flexShrink: 0 },
  name: { margin: '0 0 4px', fontWeight: '700', fontSize: '17px', color: '#1a1a2e' },
  email: { margin: '0 0 4px', fontSize: '13px', color: '#666' },
  joined: { margin: 0, fontSize: '12px', color: '#aaa' },
  statsRow: { display: 'flex', gap: '12px' },
  statBox: { flex: 1, background: '#f0f2f5', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  statNum: { fontSize: '20px', fontWeight: '700', color: '#4f46e5' },
  statLabel: { fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }
};

export default Dashboard;
