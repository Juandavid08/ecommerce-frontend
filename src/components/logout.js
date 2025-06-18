import React from 'react';

export default function LogoutButton({ onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout(); 
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: '#ffdb00',
        color: 'black',
        fontWeight: 'bold',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '5px',
        marginBottom: '1rem',
        cursor: 'pointer'
      }}
    >
      Cerrar sesión
    </button>
  );
}
