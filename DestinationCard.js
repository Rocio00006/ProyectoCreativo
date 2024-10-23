import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DestinationCard = ({ image, title, description, type }) => {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <span className="badge bg-secondary">{type}</span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
