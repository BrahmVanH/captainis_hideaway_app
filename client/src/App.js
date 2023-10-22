import { useState } from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import AvailabilityCalendar from './components/Calendar';
import Calendar from 'react-calendar';
import AdminCalendar from './components/AdminCalendar';
import { Button } from 'react-bootstrap';
import CaptainsHideaway from './pages/CaptainsHideaway';

const client = new ApolloClient({
	uri: 'http://localhost:3001/graphql',
	cache: new InMemoryCache(),
});

function App() {
	const [calendarVisible, setCalendarVisible] = useState(true);
	const [adminCalendarVisible, setAdminCalendarVisible] = useState(false);

	// const handleButtonClick = (event) => {
	// 	event.preventDefault();
	// 	if (calendarVisible === true) {
	// 		setCalendarVisible(false);
	// 		setAdminCalendarVisible(true);
	// 	} else {
	// 		setCalendarVisible(true);
	// 		setAdminCalendarVisible(false);
	// 	}
	// };
	return (
		<ApolloProvider client={client}>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/captains_hideaway' element={<CaptainsHideaway />} />
				</Routes>
			</Router>
		</ApolloProvider>
	);
}

export default App;
