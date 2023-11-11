import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Button } from 'react-bootstrap';

import { QUERY_UNAVAILABLE_DATES } from '../../utils/queries';
import { useQuery } from '@apollo/client';

import { getDateValues } from '../../utils/helpers';

import 'react-calendar/dist/Calendar.css';
import './style.css';

function AvailabilityCalendar(props) {
	const propertyName = props.propertyName;
	const [date, setDate] = useState(new Date());
	const [unavailableDates, setUnavailableDates] = useState([]);

	const { loading, error, data } = useQuery(QUERY_UNAVAILABLE_DATES, {
		variables: { propertyName },
	});

	useEffect(() => {
		if (error) {
			console.error({ message: 'There was an error querying the db from calendar', details: error });
		}
	}, [loading, error, data]);

	useEffect(() => {
		if (!loading && data) {
			setUnavailableDates(data.queryUnavailableDatesByProperty);
		} else {
			return;
		}
	}, [loading, data]);

	// Function to generate custom class for the current day
	const tileClassName = ({ date, view }) => {
		if (view === 'month') {
			const currentDate = new Date();
			if (date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) {
				return 'current-day';
			}
		}
		return '';
	};

	// This creates an elements to be appended to each date on the calendar that matches a date in a new unavailableDates array
	// 	created from calling getDateValues
	const tileContent = ({ date, view }) => {
		const unavailableDateValues = getDateValues(unavailableDates);
		if (unavailableDates.length > 0) {
			const isUnavailable = unavailableDateValues.some((unavailableDate) =>
				view === 'month'
					? unavailableDate.getFullYear() === date.getFullYear() && unavailableDate.getMonth() === date.getMonth() && unavailableDate.toDateString() === date.toDateString()
					: unavailableDate.toDateString() === date.toDateString()
			);

			return isUnavailable;
		} else {
			return null;
		}
	};

	const handleDateChange = (date) => {
		setDate(date);
	};

	return (
		<div>
			<div className=' calendar-container p-2 m-2 d-flex flex-lg-column flex-row justify-content-center' >
				{loading ? <div> Loading Calendar... </div> : <Calendar onChange={handleDateChange} value={date} tileDisabled={tileContent} tileClassName={tileClassName} />}
				<div className='calendar-key-container'>
					<div className='calendar-key'>
						<Button className='calendar-key-tile' disabled={true} />
						<p className='calendar-key-text'>Booked</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AvailabilityCalendar;
