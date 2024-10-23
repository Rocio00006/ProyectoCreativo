import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Dashboard.css'
//import MapComponent from './MapComponent';
import MapView from './MapView';
import CryptoJS from 'crypto-js';
import rsa from 'js-crypto-rsa';

function Dashboard({ destination }) {
  const [locationName, setLocationName] = useState('Arequipa');
  const [publicKey, setPublicKey] = useState(null);
    
  // Generar un par de claves RSA
  const generateKeys = async () => {
      const key = await rsa.generateKey(2048);
      setPublicKey(key.publicKey); // Almacena solo la clave pública
  };

  // Función para cifrar la ubicación
  const encryptLocation = async (location) => {
    if (!publicKey) {
        throw new Error('La clave pública no está disponible');
    }
    const encryptedLocation = await rsa.encrypt(
        new TextEncoder().encode(location), // Convierte la ubicación a Uint8Array
        publicKey,
        { name: "RSA-OAEP", hash: "SHA-256" }
    );
    return Buffer.from(encryptedLocation).toString('base64'); // Convierte a base64 para facilitar el envío
  };

   // Función para manejar la actualización de la ubicación
   const handleLocationUpdate = async (newLocationName) => {
        try {
            // Cifrar la nueva ubicación
            const encryptedLocation = await encryptLocation(newLocationName);
            
            // Actualizar el estado con la ubicación cifrada
            setLocationName(encryptedLocation);

            // Aquí podrías enviar la ubicación cifrada a un servidor si es necesario
            console.log('Ubicación cifrada:', encryptedLocation);
        } catch (error) {
            console.error('Error al cifrar la ubicación:', error.message);
        }
    };

    // Generar claves al montar el componente
    useEffect(() => {
        generateKeys();
    }, []);


  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
            <Link to="loginform">UrbanGo</Link>
        </div>
        <ul>
          <li>{locationName}</li> {/* Actualizamos con el nombre de la ubicación */}
          {/*<li><Link to="/dashboard">Mi ubicación</Link></li>*/}
          <li>{destination ? `Destino: ${destination.name}` : 'Mi destino'}</li>
          <li><Link to="/tourist-spots">Lugares turísticos</Link></li>
          <li><Link to="/routes-options">Rutas</Link></li>
        </ul>
      </div>
      <div className="map-container">
        <MapView onLocationUpdate={handleLocationUpdate} destination={destination} />

      </div>
    </div>
  );
}

export default Dashboard;

