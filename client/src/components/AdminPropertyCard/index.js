import React from 'react';

import AdminCalendar from '../AdminCalendar';

import './style.css';

function AdminPropertyCard(props) {
	const propertyName = props.propertyName;
	let formattedName = '';
	if (propertyName === 'captainsHideaway') {
		formattedName = 'Captains Hideaway'
	} else if (propertyName === 'captainsCottage') {
		formattedName = 'Captains Cottage';
	}
	return (
		<div className='property-card card col-4'>
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
