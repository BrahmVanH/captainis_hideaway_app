import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { RxHamburgerMenu } from 'react-icons/rx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function Navbar() {
	const [mobileViewport, setMobileViewport] = useState(false);
	const [showDropdownMenu, setShowDropdownMenu] = useState(false);
	const [dropdownMenuDisplay, setDropdownMenuDisplay] = useState('none');

	const nav = useRef();
	const dropdown = useRef();

	const [isLargeViewport, setIsLargeViewport] = useState(null);

	const checkLargeViewport = () => {
		return window.innerWidth > 766;
	};

	useEffect(() => {
		const isLarge = checkLargeViewport();
		setIsLargeViewport(isLarge);
	});


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
			<nav ref={nav} className='navbar navbar-expand navigation-clean navbar-light'>
				<div className='navbar-inner-container container'>
					<Link className='navbar-brand' to={'/'}>
						Captains Rentals
					</Link>
					{mobileViewport ? (
						<button className='dropdown-btn' onClick={toggleDropDown}>
							<RxHamburgerMenu size={'20px'} />
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
			<div ref={dropdown} style={{ display: dropdownMenuDisplay }} className='dropdown'>
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
