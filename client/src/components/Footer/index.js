import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function Footer() {
	return (
		<div className='bg-light footer'>
			<div className='creator-info-container'>
				<p className='copyright-notice'>© 2023 Brahm Van Houzen</p>
				<p className='created-by'>
					Created with love by,
					<Link style={{color: 'black'}} to='https://brahmvanhouzen.studio/'>Brahm Van Houzen Studio</Link>
				</p>
			</div>
			<div className='footer-link'>
				<Link to={'/contact'} style={{borderRight: '1px solid black'}} className='footer-link'>
					Contact
				</Link>
				<Link to={'/admin'} className='footer-link'>
					Admin
				</Link>
			</div>
		</div>
	);
}

export default Footer;
