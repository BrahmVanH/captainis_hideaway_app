import { useState } from 'react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

import '@csstools/normalize.css';

// HTTP link for server
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

// Create new Apollo Client instance for connection to server
const client = new ApolloClient({
	link: httpLink,

	cache: new InMemoryCache(),
});

function App() {

	// Register GSAP plugins for all components. ScrollSmoother relies on ScrollTrigger
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


	return (
		<ApolloProvider client={client}>
			<Router>
				{/* <Navbar /> */}
				<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/captains_hideaway' element={<CaptainsHideaway />} />
						<Route path='/captains_cottage' element={<CaptainsCottage />} />
						<Route path='/about' element={<About />} />
						<Route path='/contact' element={<ContactPage />} />
						<Route path='/admin' element={<AdminPage />} />
				</Routes>
				{/* <Footer /> */}
			</Router>
		</ApolloProvider>
	);
}

export default App;
