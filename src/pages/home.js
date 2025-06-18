import React, { useState } from 'react';
import LogoutButton from '../components/logout';
import Dashboard from './dashboard';
import Profile from './profile';

export default function Home({ user, setUser }) {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <LogoutButton onLogout={() => window.location.reload()} />

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            backgroundColor: activeTab === 'profile' ? '#ffdb00' : '#f0f0f0',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Mi Perfil
        </button>
        <button
          onClick={() => setActiveTab('products')}
          style={{
            backgroundColor: activeTab === 'products' ? '#ffdb00' : '#f0f0f0',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Productos VTEX
        </button>
      </div>

      {activeTab === 'profile' && (
        <Profile user={user} onUserUpdated={setUser} />
      )}
      {activeTab === 'products' && <Dashboard />}
    </div>
  );
}
