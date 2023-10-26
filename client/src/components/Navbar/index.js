import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function Navbar() {
	return (
		<nav className='navbar navbar-expand navigation-clean navbar-light'>
			<div className='navbar-inner-container container'>
				<Link className='navbar-brand' to={'/'}>
					Captains Rentals
				</Link>
				<div className='link-container'>
					<Link to={'/'} className='navbar-link'>
						Home
					</Link>
					<Link to={'/about'} className='navbar-link'>
						About Us
					</Link>
					<Link to={'/contact'} className='navbar-link'>
						Contact
					</Link>
					{Auth.loggedIn() ? (
						<Link to='#' onClick={() => Auth.logout()} className='navbar-link'>
							Log Out
						</Link>
					) : (
						<></>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
