import React from 'react';

import AdminCalendar from '../AdminCalendar';

import './style.css';

function AdminPropertyCard(props) {
	const propertyName = props.propertyName;
	let formattedName = '';
	if (propertyName === 'captainsHideaway') {
		formattedName = "Captain's Hideaway"
	} else if (propertyName === 'captainsCottage') {
		formattedName = "Captain's Cottage";
	}
	return (
		<div className='property-card card col-lg-6'>
			<div className='property-information-container'>
				<h3>{formattedName}</h3>
			</div>
			<div className='admin-calendar-container'>
				<AdminCalendar propertyName={propertyName} />
			</div>
		</div>
	);
}

export default AdminPropertyCard;
