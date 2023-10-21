import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Calendar from 'react-calendar';
import AdminCalendar from './components/AdminCalendar';
import {Button} from 'react-bootstrap';

function App() {
	const [calendarVisible, setCalendarVisible] = useState(true);
	const [adminCalendarVisible, setAdminCalendarVisible] = useState(false);

	const handleButtonClick = (event) => {
		event.preventDefault();
		if (calendarVisible === true) {
			setCalendarVisible(false);
			setAdminCalendarVisible(true);
		} else {
			setCalendarVisible(true);
			setAdminCalendarVisible(false);
		}
	};
	return (
		<div className='App'>
			{calendarVisible ? <Calendar /> : <></>}
			{adminCalendarVisible ? <AdminCalendar /> : <></>}
      <Button onClick={handleButtonClick}>Click</Button>
		</div>
	);
}

export default App;
