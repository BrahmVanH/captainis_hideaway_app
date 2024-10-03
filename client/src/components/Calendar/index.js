import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Button } from 'react-bootstrap';

import { QUERY_UNAVAILABLE_DATES } from '../../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { useErrorContext } from '../../utils/ErrorContext';
import { SET_THROW_ERROR } from '../../utils/actions';

import { getDateValues } from '../../utils/helpers';

import 'react-calendar/dist/Calendar.css';
import './style.css';

function AvailabilityCalendar(props) {
	const propertyName = props?.propertyName;
	// Global error state context - () => displays error message over app view
	const [state, dispatch] = useErrorContext();

	const [date, setDate] = useState(new Date());
	const [unavailableDates, setUnavailableDates] = useState([]);

	const [getUnavailableDates, { error, loading, data }] = useLazyQuery(QUERY_UNAVAILABLE_DATES, {
		variables: { propertyName },
	});

	useEffect(() => {
		if (propertyName) {
			getUnavailableDates(propertyName);
		}
	}, [propertyName]);

	useEffect(() => {
		if (!loading && data) {
			setUnavailableDates(data.queryUnavailableDatesByProperty);
		} else if (error && state) {

			dispatch({
				type: SET_THROW_ERROR,
				throwError: true,
				errorMessage: {
					code: error?.networkError?.statusCode,
					message: 'Sorry, there was a network error while loading this page. The issue should be resolved with a refresh.',
				},
			});
		}
	}, [loading, data, error]);

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
		if (unavailableDates !== null && unavailableDates.length > 0) {
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
			<div className=' calendar-container p-2 m-2 d-flex flex-column justify-content-center align-items-center'>
				{loading ? <div> Loading Calendar... </div> : <Calendar onChange={handleDateChange} value={date} tileDisabled={tileContent} tileClassName={tileClassName} />}
				<div className='calendar-key-container'>
					<div className='calendar-key'>
						<div className='calendar-key-tile' />
						<p className='calendar-key-text'>Booked</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AvailabilityCalendar;
