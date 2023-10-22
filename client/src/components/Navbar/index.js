import React from "react";
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


function Navbar() {
  return (
		<nav class='navbar navbar-expand bg-light navigation-clean navbar-light'>
			<div class='container'>
				<a class='navbar-brand' href='#'>
					Captains Rentals
				</a>
				<button data-bs-toggle='collapse' class='navbar-toggler' data-bs-target='#navcol-1'></button>
				<div class='collapse navbar-collapse' id='navcol-1'></div>
				<a href='#' style='padding: 1rem;'>
					About Us
				</a>
				<a href='#' style='padding: 1rem;'>
					Contact
				</a>
			</div>
		</nav>
	);
}

export default Navbar;