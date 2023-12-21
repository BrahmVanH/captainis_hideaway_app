import React, { useEffect, useState } from 'react';

import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.css';

function PropertyCard(props) {
	const property = props.property;
	const [responsiveImageStyle, setResponsiveImageStyle] = useState({
		maxHeight: '300px',
		maxWidth: '400px',
		margin: '1rem',
	});

	const isMediumViewport = () => {
		return window.innerWidth < 766;
	};
	useEffect(() => {
		const medium = isMediumViewport();

		medium ? setResponsiveImageStyle({ width: '100%', padding: '0.5rem' }) : setResponsiveImageStyle({ maxHeight: '300px', maxWidth: '400px', margin: '1rem' });
	}, []);

	return (
		<div className='col-lg-8 col-md-10 col-sm-11 d-flex flex-lg-row flex-column-reverse align-items-center rental-card card'>
			<div className='card-body d-flex flex-column justify-content-center align-items-center align-content-center'>
				<div className='card-title-container'>
					<h4 className='card-title'>{property.title}</h4>
				</div>
				<p className='rental-description'>{property.description}</p>
				<div className='info-btn-container'>
					<Link to={property.urlEndpoint} className='info-btn'>
						Info and Booking
					</Link>
				</div>
			</div>
			<Image style={responsiveImageStyle} rounded alt='captains hideaway house from the beach' src={property.imagePath} className='align-self-center align-self-lg-start col-sm-10 card-img-bottom' />
		</div>
	);
}

export default PropertyCard;
