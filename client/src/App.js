import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { isLocalEnvironment } from './utils/helpers';

import Home from './pages/Home';
import About from './pages/About';
import ContactPage from './pages/Contact';
import AdminPage from './pages/Admin';
import CaptainsHideaway from './pages/CaptainsHideaway';
import CaptainsCottage from './pages/CaptainsCottage';

import '@csstools/normalize.css';


const client = new ApolloClient({
	uri: isLocalEnvironment ? 'http://localhost:3001/graphql' : '/graphql',
	cache: new InMemoryCache(),
});


function App() {

	// Register GSAP plugins for all components. ScrollSmoother relies on ScrollTrigger
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

	return (
		<ApolloProvider client={client}>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/captains_hideaway' element={<CaptainsHideaway />} />
					<Route path='/captains_cottage' element={<CaptainsCottage />} />
					<Route path='/about' element={<About />} />
					<Route path='/contact' element={<ContactPage />} />
					<Route path='/admin' element={<AdminPage />} />
				</Routes>
			</Router>
		</ApolloProvider>
	);
}

export default App;
