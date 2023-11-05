import React from 'react';

import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "./style.css";

function PropertyCard(props) {
  const property = props.property;
  
  return (
		<div className='col-lg-8 col-md-10 col-sm-11 flex-sm-row rental-card card'>
			<div className='card-body d-flex flex-column justify-content-center align-items-center align-content-center'>
				<div className='card-title-container'>

				<h4 className='card-title'>{property.title}</h4>
				</div>
				<p className='card-text rental-description'>{property.description}</p>
				<div className="info-btn-container">
					<Link to={property.urlEndpoint} className='info-btn'>
						Info and Booking
					</Link>
				</div>
			</div>
			<Image rounded alt='captains hideaway house from the beach' src={property.imagePath} className='card-img-bottom w-100 d-block' height='100%' />
		</div>
	);
}

export default PropertyCard;
