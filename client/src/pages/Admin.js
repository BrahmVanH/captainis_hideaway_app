import React from 'react';
import SigninForm from '../components/Signin.js';
import AdminPropertyCard from '../components/AdminPropertyCard/index.js';

import './Admin.css';


function AdminPage() {
  const captainsHideaway = 'captainsHideaway'
  const captainsCottage = 'captainsCottage';
  return (
		<div>
			{/* <SigninForm /> */}
			<div className='admin-container'>
				<AdminPropertyCard propertyName={captainsHideaway} />
				{/* <AdminPropertyCard propertyName={captainsCottage} /> */}
			</div>
		</div>
	);
}

export default AdminPage;