import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './RegisterForm.css'; // Archivo CSS para estilos personalizados

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !passwordConfirmation) {
      toast.error('Por favor, completa todos los campos');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Por favor, ingresa un correo electrónico válido');
      return;
    }

    if (!validateEmailDomain(email)) {
      toast.error('Por favor, ingresa un correo electrónico con un dominio válido');
      return;
    }

    if (password !== passwordConfirmation) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      toast.success('Registro exitoso');
      console.log(response.data);

      // Restablecer los campos del formulario después del registro exitoso
      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
    } catch (error) {
      toast.error('Error en el registro. Por favor, inténtalo de nuevo.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateEmailDomain = (email) => {
    // Verificar si el dominio del correo electrónico es válido
    const validDomains = ['example.com', 'gmail.com']; // Agrega los dominios válidos aquí

    const domain = email.split('@')[1];
    return validDomains.includes(domain);
  };

  return (
    <div className="register-form-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Correo electrónico:</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Confirmar contraseña:</label>
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          Registrarse
        </button>
      </form>
      <p>¿Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link></p>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;