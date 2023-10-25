import React from 'react';

import AdminCalendar from '../AdminCalendar';

import './style.css';

function AdminPropertyCard(props) {
	const propertyName = props.propertyName;
	return (
		<div className='card col-6'>
			<div className='property-information-container'>
				<h3>{propertyName}</h3>
			</div>
      <div className='admin-calendar-container'>
        <AdminCalendar propertyName={propertyName} /> 
      </div>
		</div>
	);
}

export default AdminPropertyCard;
