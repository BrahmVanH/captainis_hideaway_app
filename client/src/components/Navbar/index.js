import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Link, NavLink } from 'react-router-dom';
import Auth from '../../utils/auth';
import { RxHamburgerMenu } from 'react-icons/rx';

import mobileLogoSvg from '../../assets/logo/logo.svg';
import logoSvg from '../../assets/logo/logo_no_trees.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function Navbar() {
	const [mobileViewport, setMobileViewport] = useState(false);
	const [showDropdownMenu, setShowDropdownMenu] = useState(false);
	const [dropdownMenuDisplay, setDropdownMenuDisplay] = useState('none');
	const [brandLogo, setBrandLogo] = useState({
		image: mobileLogoSvg, width: '100px'});
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
		mobile ? setBrandLogo({
			image: mobileLogoSvg, width: '75px'}) : setBrandLogo({
			image: logoSvg, width: '125px'});
	}, []);

	useEffect(() => {
		showDropdownMenu ? setDropdownMenuDisplay('') : setDropdownMenuDisplay('none');
	}, [showDropdownMenu]);

	return (
		<>
			<nav ref={nav} className='my-navbar navbar-expand navigation-clean navbar-light'>
				<div className='navbar-inner-container '>
					<Link className='navbar-brand' to={'/'}>
						<img src={brandLogo.image} width={brandLogo.width} />
					</Link>
					{mobileViewport ? (
						<button className='dropdown-btn' onClick={toggleDropDown}>
							<RxHamburgerMenu size={'20px'} />
						</button>
					) : (
						<div className='link-container'>
							<NavLink  to={'/'} className='navbar-link'>
								Home
							</NavLink>
							<NavLink to={'/about'} className='navbar-link'>
								About Us
							</NavLink>
							<NavLink to={'/contact'} className='navbar-link'>
								Contact
							</NavLink>
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
