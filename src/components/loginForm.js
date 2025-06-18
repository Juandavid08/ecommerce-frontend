import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { graphqlRequest } from '../utils/api';

const LOGIN_QUERY = `
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
        name
      }
    }
  }
`;

export default function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await graphqlRequest(LOGIN_QUERY, form);

      if (res.errors) {
        console.error('Errores en GraphQL:', res.errors);
        setError('Usuario o contraseña incorrecta');
        return;
      }

      const data = res?.data?.login;
      if (!data) {
        setError('No se recibió la sesión');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);

      onLogin(data.user);
    } catch (err) {
      console.error('Error en login:', err);
      setError('Error inesperado durante el login');
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        padding: 4,
        maxWidth: 400,
        margin: '100px auto',
        borderRadius: 2
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Iniciar Sesión
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Usuario"
          variant="outlined"
          value={form.username}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          name="password"
          type="password"
          label="Contraseña"
          variant="outlined"
          value={form.password}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#ffdb00',
            color: '#000',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#e6c900'
            }
          }}
        >
          Entrar
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </form>
    </Paper>
  );
}
