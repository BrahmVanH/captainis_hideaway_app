import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function Footer() {
	return (
		<div className='footer'>
			<div className='creator-info-container'>
				<p className='copyright-notice'>© 2023</p>

				<Link style={{ color: 'black' }} to='https://brahmvanhouzen.studio/'>
					Brahm Van Houzen Studio
				</Link>
			</div>
			<div className='footer-link'>
				<Link to={'/contact'} style={{ borderRight: '1px solid black' }} className='footer-link'>
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
