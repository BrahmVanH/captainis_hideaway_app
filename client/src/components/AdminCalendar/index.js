import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

import { QUERY_UNAVAILABLE_DATES } from '../../utils/queries';
import { CREATE_UNAVAILABLE_DATE, REMOVE_UNAVAILABLE_DATE } from '../../utils/mutations';
import { useErrorContext } from '../../utils/ErrorContext';
import { SET_THROW_ERROR } from '../../utils/actions';
import { useQuery, useMutation } from '@apollo/client';

import { getDateValues, isSameDay } from '../../utils/helpers';

import 'react-calendar/dist/Calendar.css';
import './style.css';

function AdminCalendar(props) {
	const [state, dispatch] = useErrorContext();

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

	const [createUnavailableDate] = useMutation(CREATE_UNAVAILABLE_DATE);
	const [removeUnavailableDate] = useMutation(REMOVE_UNAVAILABLE_DATE);

	// Set the unavailableDates state to the query response. Contains an array of dates
	useEffect(() => {
		if (!loading && data) {
			setUnavailableDates(data.queryUnavailableDatesByProperty);
		} else if (error && !loading) {
			dispatch({
				type: SET_THROW_ERROR,
				throwError: true,
				errorMessage: {
					code: error?.networkError?.statusCode,
					message: 'Sorry, there was a network error while loading this page. The issue should be resolved with a refresh.',
				},
			});
		}
	}, [data, loading]);

	const reloadPage = () => {
		window.location.reload();
	};

	// Function to generate custom class for the current day
	const tileClassName = ({ date, view }) => {
		const unavailableDateValues = getDateValues(unavailableDates);
		if (unavailableDateValues.some((unavailableDate) => isSameDay(unavailableDate, date))) {
			return 'admin-unavailable-day';
		}
		return '';
	};

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

			return isUnavailable;
		} else {
			return null;
		}
	};

	const handleDateChange = (date) => {
		setDate(date);
	};
	// This adds an entry to the datebase representing a date that is unavailable to rent
	const handleAddUnavailableDate = async (value) => {
		try {
			const { data, error } = await createUnavailableDate({ variables: { propertyName: propertyName, dateValue: value } });
			if (!error & data) {
				reloadPage();
			} else if (error) {
				alert('There was an issue booking this date, please refresh and try again.');
			}
		} catch (err) {
			console.error(err);
		}
	};

	// This removes an entry from the database representing a date that was unavailable to rent
	const handleRemoveUnavailableDate = async (value) => {
		try {
			const { error, loading, data } = await removeUnavailableDate({ variables: { propertyName: propertyName, dateValue: value } });
			if (data && !loading && !error) {
				reloadPage();
			} else if (error && !loading) {
				dispatch({
					type: SET_THROW_ERROR,
					throwError: true,
					errorMessage: {
						code: error?.networkError?.statusCode,
						message: 'Sorry, there was a network error while loading this page. The issue should be resolved with a refresh.',
					},
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	// This takes in the selected date value from the calendar and compares to the unavailableDates state
	// and returns a value if there is a match. the value is created as an unavailableDate object in db
	// if there is no return value from the filter, the matching date object will be removed from the db
	const checkIfUnavailable = (value) => {
		if (unavailableDates.length > 0) {
			const proposedDate = unavailableDates.filter((date) => date.dateValue === value);
			if (proposedDate.length === 0) {
				handleAddUnavailableDate(value);
			} else {
				handleRemoveUnavailableDate(value);
			}
		} else if (unavailableDates.length === 0 && !loading) {
			handleAddUnavailableDate(value);
		}
	};
	// This is a handler function that is called when the user clicks on a date on the calendar
	const onClickDay = (value, event) => {
		const date = new Date(value);
		checkIfUnavailable(date.toISOString());
	};

	return (
		<div>
			<div className='admin-calendar-container'>
				<Calendar tileContent={tileContent} onChange={handleDateChange} value={date} onClickDay={onClickDay} tileClassName={tileClassName} />
			</div>
		</div>
	);
}

export default AdminCalendar;
