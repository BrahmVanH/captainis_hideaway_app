import React, { useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';

import Mousetrap from 'mousetrap';

import SigninForm from '../components/Signin.js';
import CreateUser from '../components/CreateUser/index.js';
import AdminPropertyCard from '../components/AdminPropertyCard/index.js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Auth from '../utils/auth.js';

import './Admin.css';

function AdminPage() {
	const main = useRef();
	const smoother = useRef();
	const [showCreateUser, setShowCreateUser] = useState(false);

	Mousetrap.bind('ctrl+alt+1+5', function () {
		if (showCreateUser === false) {
			setShowCreateUser(true);
		} else {
			setShowCreateUser(false);
		}
	});

	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

		const ctx = gsap.context(() => {
			smoother.current = ScrollSmoother.create({
				smooth: 1,
				effects: true,
			});
		}, main);
		return () => ctx.revert();
	}, []);

	const captainsHideaway = 'captainsHideaway';
	const captainsCottage = 'captainsCottage';
	return (
		<div ref={main} id='smooth-wrapper'>
			<div id='smooth-content'>
				<Navbar />
				<div className='admin-container'>
					{showCreateUser ? (
						<CreateUser />
					) : (
						<>
							{Auth.loggedIn() ? (
								<>
									<div className='col-lg-10 admin-header-container card'>
										<h1>Administrator Dashboard</h1>
										<h4>Hi, Elyse</h4>
									</div>
									<div className='admin-property-card-container d-flex flex-md-row flex-column '>
										<AdminPropertyCard propertyName={captainsHideaway} />
										<AdminPropertyCard propertyName={captainsCottage} />
									</div>
								</>
							) : (
								<SigninForm />
							)}
						</>
					)}
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default AdminPage;
