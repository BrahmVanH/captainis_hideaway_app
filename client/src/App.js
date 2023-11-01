import { useState } from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import ContactPage from './pages/Contact';
import AdminPage from './pages/Admin';
import CaptainsHideaway from './pages/CaptainsHideaway';
import CaptainsCottage from './pages/CaptainsCottage';
import Footer from './components/Footer';

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
	

	return (
		<ApolloProvider client={client}>
			<Router>
				<Navbar />
					<div className='wrapper'>
				<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/captains_hideaway' element={<CaptainsHideaway />} />
						<Route path='/captains_cottage' element={<CaptainsCottage />} />
						<Route path='/about' element={<About />} />
						<Route path='/contact' element={<ContactPage />} />
						<Route path='/admin' element={<AdminPage />} />
				</Routes>
					</div>
				<Footer />
			</Router>
		</ApolloProvider>
	);
}

export default App;
