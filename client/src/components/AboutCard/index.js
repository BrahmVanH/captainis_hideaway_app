import React from 'react';

import './style.css';

import temp_photo from '../../assets/img/temp_about_us.png';

function AboutCard() {
	return (
		<div className='card about-us-card align-self-center col-6 '>
			<h3 className='text-center mb-4'>About Us</h3>
			<div className='d-flex flex-row align-items-center justify-content-around'>
				<img className='about-us-image' src={temp_photo} height='300px' width='400px' />
				<p className='about-us-text'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis scelerisque fermentum dui faucibus in ornare. Ac turpis
					egestas integer eget aliquet nibh. Egestas integer eget aliquet nibh. Donec ac odio tempor orci dapibus ultrices in iaculis nunc. Pharetra diam sit amet nisl. Quis commodo odio aenean sed
					adipiscing diam. Tristique magna sit amet purus gravida quis blandit. Pellentesque elit eget gravida cum sociis natoque penatibus. Placerat vestibulum lectus mauris ultrices. Pharetra diam
					sit amet nisl suscipit. Enim blandit volutpat maecenas volutpat blandit aliquam etiam. Ac turpis egestas maecenas pharetra. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu.
					Turpis massa tincidunt dui ut. Vitae tempus quam pellentesque nec. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Magna fermentum iaculis eu non diam
					phasellus vestibulum lorem. Non curabitur gravida arcu ac. Tempus egestas sed sed risus pretium quam vulputate. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Pulvinar
					etiam non quam lacus suspendisse faucibus. Nullam vehicula ipsum a arcu. Quam id leo in vitae turpis massa sed. Egestas sed tempus urna et pharetra pharetra massa. Hendrerit gravida rutrum
					quisque non tellus orci.
				</p>
			</div>
		</div>
	);
}

export default AboutCard;
