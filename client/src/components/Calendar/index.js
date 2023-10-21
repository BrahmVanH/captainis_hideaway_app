import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { QUERY_UNAVAILABLE_DATES } from '../../utils/queries';
import { useQuery } from '@apollo/client';

import 'react-calendar/dist/Calendar.css';


function Calendar() {

	const [date, setDate] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);

  const {error, loading, data } = useQuery(QUERY_UNAVAILABLE_DATES);

  useEffect(() => {
    if (!loading && data) {
      setUnavailableDates(data);
    } else {
      return
    }
  }, [data])


	const tileContent = ({ date, view }) => {
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
        {loading ? <div> Loading Calendar... </div> : (
          <Calendar onChange={handleDateChange} value={date} tileContent={tileContent} />
        )}
			</div>
		</div>
	);
}

export default Calendar;
