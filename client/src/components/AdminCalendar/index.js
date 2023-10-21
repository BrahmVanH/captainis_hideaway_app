import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function AdminCalendar(props) {
	const [date, setDate] = useState(new Date());

	const tileContent = ({ date, view }) => {
		// const unavailableDates = [new Date('2023-10-21'), new Date('2023-10-22'), new Date('2023-10-23'), new Date('2023-10-24'), new Date('2023-10-25')];
		const unavailableDates = props.unavailableDates;
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

	const handleAddUnavailableDate = (value) => {
		props.addUnavailableDates(value);
	};
	const handleRemoveUnavailableDate = (value) => {
		props.removeUnavailableDate(value);
	};

	const onClickDay = (value, event) => {
		// event.preventDefault();
		console.log('Clicked day: ', value);
		handleAddUnavailableDate(value);
		handleRemoveUnavailableDate(value);
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
