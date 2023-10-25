import { useState } from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import ContactPage from './pages/Contact';
import AdminPage from './pages/Admin';
import CaptainsHideaway from './pages/CaptainsHideaway';



const httpLink = createHttpLink({
	uri: 'http://localhost:3001/graphql',
});

// const authLink = setContext((_, { headers }) => {
// 	const token = localStorage.getItem('id_token');
// 	return {
// 		headers: {
// 			...headers,
// 			authorization: token ? `Bearer ${token}` : '',
// 		},
// 	};
// });

const client = new ApolloClient({
	link: httpLink,

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
					<Route path='/contact' element={<ContactPage />} />
					<Route path='/admin' element={<AdminPage />} />
				</Routes>
			</Router>
		</ApolloProvider>
	);
}

export default App;
