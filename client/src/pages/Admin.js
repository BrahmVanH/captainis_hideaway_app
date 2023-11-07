import React, { useLayoutEffect, useRef } from 'react';

import SigninForm from '../components/Signin.js';
import AdminPropertyCard from '../components/AdminPropertyCard/index.js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Auth from '../utils/auth.js';
import { createScrollSmoother } from '../utils/gsapHelpers.js';

import './Admin.css';

function AdminPage() {
	const main = useRef();
	const smoother = useRef();

	

	useLayoutEffect(() => {
		createScrollSmoother(main, smoother);
	}, []);

	const captainsHideaway = 'captainsHideaway';
	const captainsCottage = 'captainsCottage';
	return (
		<div ref={main} id='smooth-wrapper'>
			<div id='smooth-content'>
				<Navbar />
				<div className='admin-container'>
					{Auth.loggedIn() ? (
						<>
							<div className='col-lg-10 admin-header-container card'>
								<h1>Administrator Dashboard</h1>
								<h4>Hi, Elyse</h4>
							</div>
							<div className='admin-property-card-container'>
								<AdminPropertyCard propertyName={captainsHideaway} />
								<AdminPropertyCard propertyName={captainsCottage} />
							</div>
						</>
					) : (
						<SigninForm />
					)}
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default AdminPage;
