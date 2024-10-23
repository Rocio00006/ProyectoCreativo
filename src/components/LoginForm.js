import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginForm.css'; // Asegúrate de crear un archivo CSS para los estilos

function LoginForm() {
  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="logoUrban.png" alt="UrbanGo Logo" className="logo" />
        <p>Conoce más lugares, sé feliz.</p>
      </div>
      <div className="login-form">
        <h2>BIENVENIDO</h2>
        <input type="text" placeholder="Usuario" className="input-field" />
        <input type="password" placeholder="Contraseña" className="input-field" />
        <button className="login-button">INGRESAR</button>
        <p>Aún no tiene una cuenta</p>
        <p><Link to="/register">REGISTRARSE</Link></p>
      </div>
    </div>
  );
}

export default LoginForm;
