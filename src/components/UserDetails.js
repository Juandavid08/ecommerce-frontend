import React, { useState } from 'react';
import { graphqlRequest } from '../utils/api';

const UPDATE_USER_MUTATION = `
  mutation UpdateUser($id: ID!, $name: String, $lastName: String, $email: String) {
    updateUser(id: $id, name: $name, lastName: $lastName, email: $email) {
      id
      name
      lastName
      email
    }
  }
`;

export default function UserDetails({ user, onUserUpdated }) {
  const [form, setForm] = useState({
    name: user.name || '',
    lastName: user.lastName || '',
    email: user.email || '',
  });

  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await graphqlRequest(
        UPDATE_USER_MUTATION,
        { id: user.id, ...form },
        token
      );
      onUserUpdated(res.data.updateUser);
      setMessage('Usuario actualizado con éxito');
    } catch (err) {
      setMessage('Error al actualizar usuario');
      console.error(err);
    }
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <h3>👤 Detalles del Usuario</h3>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>User Type:</strong> {user.userType}</p>
      <p><strong>Fecha de creación:</strong> {new Date(user.createdAt).toLocaleString()}</p>

      <div>
        <label>Nombre:</label>
        <input name="name" value={form.name} onChange={handleChange} /><br />
        <label>Apellido:</label>
        <input name="lastName" value={form.lastName} onChange={handleChange} /><br />
        <label>Email:</label>
        <input name="email" value={form.email} onChange={handleChange} /><br />

        <button
          onClick={handleUpdate}
          style={{
            marginTop: '10px',
            padding: '10px 15px',
            backgroundColor: '#ffdb00',
            border: 'none',
            borderRadius: 5,
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Guardar Cambios
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
}
