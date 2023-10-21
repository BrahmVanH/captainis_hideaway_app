import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Calendar from 'react-calendar';
import AdminCalendar from './components/AdminCalendar';
import { Button } from 'react-bootstrap';

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
			<div className='App'>
				<AdminCalendar />
				{/* <Button onClick={handleButtonClick}>Click</Button> */}
			</div>
		</ApolloProvider>
	);
}

export default App;
