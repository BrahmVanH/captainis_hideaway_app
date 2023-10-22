import React from "react";
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


function Navbar() {
  return (
		<nav className='navbar navbar-expand bg-light navigation-clean navbar-light'>
			<div className='container'>
				<a className='navbar-brand' href='#'>
					Captains Rentals
				</a>
				<button data-bs-toggle='collapse' className='navbar-toggler' data-bs-target='#navcol-1'></button>
				<div className='collapse navbar-collapse' id='navcol-1'></div>
				<Link to={'/'} className="navbar-link">
					About Us
				</Link>
				<Link to={'/'} className="navbar-link">
					Contact
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;