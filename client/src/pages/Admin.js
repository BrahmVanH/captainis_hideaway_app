import React from 'react';
import SigninForm from '../components/Signin.js';
import AdminPropertyCard from '../components/AdminPropertyCard/index.js';
import Auth from '../utils/auth.js';

import './Admin.css';

function AdminPage() {
	const captainsHideaway = 'captainsHideaway';
	const captainsCottage = 'captainsCottage';
	return (
		<div style={{ height: '75vh' }}>
			{!Auth.loggedIn() ? <SigninForm /> : <></>}
			{Auth.loggedIn() ? (
				<div className='admin-container'>
					<AdminPropertyCard propertyName={captainsHideaway} />
					<AdminPropertyCard propertyName={captainsCottage} />
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default AdminPage;
