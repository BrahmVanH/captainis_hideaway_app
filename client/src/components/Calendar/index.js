import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calendar(props) {
	const [date, setDate] = useState(new Date());

	const tileContent = ({ date, view }) => {
		const unavailableDates = props.unavailableDates;
		// const unavailableDates = [new Date('2023-10-25'), new Date('2023-10-27')];
		const isUnavailable = unavailableDates.some((unavailableDate) =>
			view === 'month'
				? unavailableDate.getFullYear() === date.getFullYear() && unavailableDate.getMonth() === date.getMonth() && unavailableDate.toDateString() === date.toDateString()
				: unavailableDate.toDateString() === date.toDateString()
		);

		return isUnavailable ? <div className='unavailable-day'>****</div> : null;
	};

	const handleDateChange = (date) => {
		setDate(date);
	};

	return (
		<div>
			<h1>Calendar App</h1>
			<div className='calendar-container'>
				<Calendar onChange={handleDateChange} value={date} tileContent={tileContent} />
			</div>
		</div>
	);
}

export default Calendar;
