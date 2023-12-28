import React from 'react';

import './style.css';


function AboutCard(props) {
	const image = props.image;

	return (
		<div className='card about-us-card align-self-center col-lg-5 col-11 '>
			<h3 className='text-center mb-4'>About Us</h3>
			<div className='d-flex flex-column align-items-center justify-content-around'>
				{image ? (
					<div className='about-image-container'>
						<img className='about-us-image' src={image} width='240px' />
					</div>
				) : (
					<></>
				)}
				<p className='about-us-text'>
					The UP has always been a home away from home for us. Our hopes are that you find yourself just as welcomed as we did when we first found this property. Captain’s Hideaway was a dream come
					true for us. The chance to retrieve to a private getaway with our family offers all of us a chance to get away from the day-to-day and come back together. We hope that extending our reprieve
					to you will offer you the same chance to check out and take it all in. The UP offers outdoor enthusiasts of all genres a chance to take in the untouched grace of North America, where the
					rich tapestry of ecology, topography, and landscape unfolds in a mesmerizing display.
				</p>
			</div>
		</div>
	);
}

export default AboutCard;
