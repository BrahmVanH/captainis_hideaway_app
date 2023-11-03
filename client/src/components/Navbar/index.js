import React, { useLayoutEffect, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Link } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

gsap.registerPlugin(ScrollSmoother);

function Navbar() {

	const main = useRef();
	const smoother = useRef();

	// useEffect(() => {
	// 	const ctx = gsap.context(() => {
	// 		// create the smooth scroller FIRST!
	// 		smoother.current = ScrollSmoother.create({
	// 			smooth: 4, // seconds it takes to catch up to native scroll position
	// 			effects: true, // look for data-speed and data-lag attrivutes on elements and animate accordingly
	// 		});
	// 	}, main);
	// 	return () => ctx.revert();
	// }, [main, smoother]);

	return (
		<nav ref={main} id='smooth-wrapper' className='navbar navbar-expand navigation-clean navbar-light'>
			<div id='smooth-content' className='navbar-inner-container container'>
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
