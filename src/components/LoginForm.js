import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css'; // Asegúrate de crear un archivo CSS para los estilos
import axios from 'axios';
import rsa from 'js-crypto-rsa';

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Generar un par de claves RSA
    const generateKeys = async () => {
      const key = await rsa.generateKey(2048);
      return { publicKey: key.publicKey, privateKey: key.privateKey };
  };

    const handleLogin = async (e) => {
      e.preventDefault();

      // Generar claves RSA
      const { publicKey } = await generateKeys();

      // Cifrar credenciales
      const { encryptedEmail, encryptedPassword } = await encryptCredentials(publicKey, email, password);

      try {
          // Enviar las credenciales cifradas al backend
          const response = await axios.post('/api/auth/login', { email: encryptedEmail, password: encryptedPassword });

          // Si la respuesta es exitosa, redirigir a /cities
          if (response.status === 200) {
              navigate('/cities');
          }
      } catch (error) {
          // Manejar errores, como credenciales incorrectas
          console.error('Error al iniciar sesión:', error.response?.data?.message || error.message);
          setError('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    };
  
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
          <button className="login-button" onClick={handleLogin}>INGRESAR</button>
          <p>Aún no tiene una cuenta</p>
          <p><Link to="/register">REGISTRARSE</Link></p>
        </div>
      </div>
    );
  }
  
  export default LoginForm;
