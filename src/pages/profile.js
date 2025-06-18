import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { graphqlRequest } from '../utils/api';

const UPDATE_USER_MUTATION = `
  mutation UpdateUser(
    $id: ID!
    $name: String
    $lastName: String
    $email: String
  ) {
    updateUser(
      id: $id
      name: $name
      lastName: $lastName
      email: $email
    ) {
      id
      name
      lastName
      email
    }
  }
`;

export default function Profile({ user, onUserUpdated }) {
  const [form, setForm] = useState({
    username: user.username || '',
    userType: user.userType || '',
    name: user.name || '',
    lastName: user.lastName || '',
    email: user.email || ''
  });

  const token = localStorage.getItem('token');

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

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
      onUserUpdated({ ...user, ...res.data.updateUser });
      setSnackbar({
        open: true,
        message: 'Datos actualizados correctamente',
        severity: 'success'
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: 'Error al actualizar los datos',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Card sx={{ padding: 3, marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Perfil de Usuario
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Fecha de creación: {new Date(user.createdAt).toLocaleString()}
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre de usuario"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tipo de usuario"
                  name="userType"
                  value={form.userType}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apellido"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="warning"
                onClick={handleUpdate}
              >
                Guardar Cambios
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
