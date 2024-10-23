import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css'
import MapComponent from './MapComponent';
//import MapView from './MapView';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
            <Link to="loginform">UrbanGo</Link>
        </div>
        <ul>
          <li><Link to="/dashboard">Mi ubicación</Link></li>
          <li>Mi destino</li>
          <li><Link to="/tourist-spots">Lugares turísticos</Link></li>
          <li>Restaurantes</li>
        </ul>
      </div>
      <div className="map-container">
        <MapComponent />
      </div>
    </div>
  );
}

export default Dashboard;
