import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { QUERY_UNAVAILABLE_DATES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { getDateValues } from '../../utils/helpers';

import 'react-calendar/dist/Calendar.css';
import './style.css'


function AvailabilityCalendar() {
	const [date, setDate] = useState(new Date());
	const [unavailableDates, setUnavailableDates] = useState([]);

	const { loading, error, data } = useQuery(QUERY_UNAVAILABLE_DATES);

	useEffect(() => {
		if (!loading && data) {
			setUnavailableDates(data.queryUnavailableDates);
		} else {
			return;
		}
	}, [loading, data]);

	// This creates an elements to be appended to each date on the calendar that matches a date in a new unavailableDates array
	// created from calling getDateValues
	const tileContent = ({ date, view }) => {
		const unavailableDateValues = getDateValues(unavailableDates);
		if (unavailableDates.length > 0) {
			const isUnavailable = unavailableDateValues.some((unavailableDate) =>
				view === 'month'
					? unavailableDate.getFullYear() === date.getFullYear() && unavailableDate.getMonth() === date.getMonth() && unavailableDate.toDateString() === date.toDateString()
					: unavailableDate.toDateString() === date.toDateString()
			);

			return isUnavailable ? <div className='unavailable-day'></div> : null;
		} else {
			return null;
		}
	};

	const handleDateChange = (date) => {
		setDate(date);
	};

	return (
		<div>
			<h1>Calendar App</h1>
			<div className='calendar-container'>{loading ? <div> Loading Calendar... </div> : <Calendar onChange={handleDateChange} value={date} tileContent={tileContent} />}</div>
		</div>
	);
}

export default AvailabilityCalendar;
