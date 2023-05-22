import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './LoginForm.css'; // Archivo CSS para estilos personalizados

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Por favor, completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const { access_token, expires_in } = response.data;

      toast.success('Inicio de sesión exitoso');
      console.log(response.data);

      setEmail('');
      setPassword('');

      // Guardar el token en el almacenamiento local y la fecha de expiración
      const expirationDate = new Date().getTime() + expires_in * 1000;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('tokenExpiration', expirationDate);
      console.log('Desde LoginForm - Token: ', access_token);

      navigate('/index');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Correo o contraseña incorrectos');
      } else {
        toast.error('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
      }
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="container login-form-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>
      <div className="register-link">
        ¿No tienes una cuenta?{' '}
        <Link to="/register">Regístrate aquí</Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;