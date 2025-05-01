import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Tabs,
  Tab,
  Alert,
} from "@mui/material";

const AuthComponent = ({ login }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Simulación de autenticación
    // En una aplicación real, esto se conectaría a un backend
    if (formData.email && formData.password) {
      // Simulamos un usuario autenticado
      login({
        name: formData.email.split("@")[0],
        email: formData.email,
      });
    } else {
      setError("Por favor, completa todos los campos");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    // Validaciones básicas
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Por favor, completa todos los campos");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Simulación de registro
    // En una aplicación real, esto se conectaría a un backend
    login({
      name: formData.name,
      email: formData.email,
    });
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Accede a tu cuenta
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        <Tab label="Iniciar Sesión" />
        <Tab label="Registrarse" />
      </Tabs>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {activeTab === 0 ? (
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            margin="normal"
            label="Correo electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Iniciar Sesión
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleRegister}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Correo electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Registrarse
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default AuthComponent;
