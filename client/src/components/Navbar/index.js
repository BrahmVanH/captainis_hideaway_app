import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { RxHamburgerMenu } from 'react-icons/rx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Button } from 'react-bootstrap';

function Navbar() {
	const [mobileViewport, setMobileViewport] = useState(false);
	const [showDropdownMenu, setShowDropdownMenu] = useState(false);
	const [dropdownMenuDisplay, setDropdownMenuDisplay] = useState('none');

	const isMediumViewport = () => {
		return window.innerWidth < 766;
	};

	const toggleDropDown = () => {
		showDropdownMenu ? setShowDropdownMenu(false) : setShowDropdownMenu(true);
	};

	useEffect(() => {
		const mobile = isMediumViewport();
		mobile ? setMobileViewport(true) : setMobileViewport(false);
	}, []);

	useEffect(() => {
		showDropdownMenu ? setDropdownMenuDisplay('') : setDropdownMenuDisplay('none');
	}, [showDropdownMenu]);

	return (
		<>
			<nav className='navbar navbar-expand navigation-clean navbar-light'>
				<div className='navbar-inner-container container'>
					<Link className='navbar-brand' to={'/'}>
						Captains Rentals
					</Link>
					{mobileViewport ? (
						<button onClick={toggleDropDown}>
							<RxHamburgerMenu />
						</button>
					) : (
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
								<Link to='/' onClick={() => Auth.logout()} className='navbar-link'>
									Log Out
								</Link>
							) : (
								<></>
							)}
						</div>
					)}
				</div>
			</nav>
			<div style={{ display: dropdownMenuDisplay }} className='dropdown'>
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
					<Link to='/' onClick={() => Auth.logout()} className='navbar-link'>
						Log Out
					</Link>
				) : (
					<></>
				)}
			</div>
		</>
	);
}

export default Navbar;
