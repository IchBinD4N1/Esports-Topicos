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
  const navigate = useNavigate(); // Importamos la función useNavigate

  const handleSubmit = async (e) => {
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

      const token = response.data.token; // Obtenemos el token de la respuesta

      toast.success('Inicio de sesión exitoso');
      console.log(response.data);

      // Restablecer los campos del formulario después del inicio de sesión exitoso
      setEmail('');
      setPassword('');

      // Guardar el token en el almacenamiento local
      localStorage.setItem('token', response.data.token);
      console.log('token:', token);

      // Redirigir al usuario al IndexPage después del inicio de sesión exitoso
      navigate('/index'); // Cambia '/index' por la ruta correcta de tu página IndexPage
    } catch (error) {
      toast.error('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
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