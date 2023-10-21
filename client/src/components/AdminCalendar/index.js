import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { QUERY_UNAVAILABLE_DATES } from '../../utils/queries';
import { CREATE_UNAVAILABLE_DATE, REMOVE_UNAVAILABLE_DATE } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';

function AdminCalendar(props) {
	const [date, setDate] = useState(new Date());
	const [unavailableDates, setUnavailableDates] = useState([]);

	const { loading, error, data } = useQuery(QUERY_UNAVAILABLE_DATES);

	const [createUnavailableDate] = useMutation(CREATE_UNAVAILABLE_DATE);
	const [removeUnavailableDate] = useMutation(REMOVE_UNAVAILABLE_DATE);

	useEffect(() => {
		if (!loading && data) {
			setUnavailableDates(data.queryUnavailableDates);
		} else {
			return;
		}
	}, [data]);

	const tileContent = ({ date, view }) => {
		if (unavailableDates.length > 0) {
			const isUnavailable = unavailableDates?.some((unavailableDate) =>
				view === 'month'
					? unavailableDate.getFullYear() === date.getFullYear() && unavailableDate.getMonth() === date.getMonth() && unavailableDate.toDateString() === date.toDateString()
					: unavailableDate.toDateString() === date.toDateString()
			);

			return isUnavailable ? <div className='unavailable-day'>****</div> : null;
		} else {
			return null;
		}
	};

	const handleDateChange = (date) => {
		setDate(date);
	};

	const handleAddUnavailableDate = async (value) => {
		console.log('creating unavailable date:', value);
		try {
			const { data } = await createUnavailableDate({ variables: { date: value } });
			console.log('created unavailable date: ', data);
		} catch (err) {
			console.error(err);
		}
	};
	const handleRemoveUnavailableDate = (value) => {
		removeUnavailableDate(value);
	};
	const checkIfUnavailable = (value) => {
		console.log('checking if unavailable');
		if (unavailableDates.length > 0) {
			const proposedDate = unavailableDates.filter((date) => date === value);
			if (!proposedDate) {
				handleAddUnavailableDate(value);
			} else {
				handleRemoveUnavailableDate(value);
			}
		} else if (unavailableDates.length === 0 && !loading) {
			console.log('handling add unavailable date');
			handleAddUnavailableDate(value);
		}
	};

	const onClickDay = (value, event) => {
		console.log('called onClickDay...');
		checkIfUnavailable(value);
	};

	return (
		<div>
			<h1>Calendar App</h1>
			<div className='calendar-container'>
				<Calendar onChange={handleDateChange} value={date} tileContent={tileContent} onClickDay={onClickDay} />
			</div>
		</div>
	);
}

export default AdminCalendar;
