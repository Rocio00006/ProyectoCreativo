import React, { useState } from 'react';
import DestinationCard from './DestinationCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const destinations = [
  { id: 1, title: 'Monasterio Santa Catalina', description: 'Un lugar lleno de cultura.', image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/76/da.jpg', type: 'cultura' },
  { id: 2, title: 'Plaza de Armas', description: 'El centro de la historia de Arequipa', image: 'https://blogs.incarail.com/hs-fs/hubfs/Plaza%20de%20Armas%20de%20arequipa%20-%20parte%202%20-%201.jpg?width=488&height=488&name=Plaza%20de%20Armas%20de%20arequipa%20-%20parte%202%20-%201.jpg', type: 'aventura' },
  { id: 3, title: 'Molino de Sabandía', description: 'Naturaleza y aventura al máximo', image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/9f/65/77.jpg', type: 'naturaleza' },
];

const DestinationSelection = () => {
  const [filter, setFilter] = useState('todos');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredDestinations = filter === 'todos'
    ? destinations
    : destinations.filter(dest => dest.type === filter);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">¿A dónde quieres ir?</h2>

      {/* Filtros */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-4">
          <label htmlFor="filterSelect" className="form-label">Filtrar por tipo:</label>
          <select className="form-select" id="filterSelect" onChange={handleFilterChange}>
            <option value="todos">Todos</option>
            <option value="aventura">Aventura</option>
            <option value="cultura">Cultura</option>
            <option value="naturaleza">Naturaleza</option>
          </select>
        </div>
      </div>

      {/* Lista de destinos */}
      <div className="row">
        {filteredDestinations.map((dest) => (
          <DestinationCard 
            key={dest.id}
            image={dest.image}
            title={dest.title}
            description={dest.description}
            type={dest.type}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationSelection;
