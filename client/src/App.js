import React from 'react';
import gsap from 'gsap';

import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import LogRocket from 'logrocket';

import NotFound from './pages/404';
import ErrorBoundary from './components/ErrorBoundary';
import { ErrorProvider } from './utils/ErrorContext';
import ToastNotif from './components/ToastNotif';
import Home from './pages/Home';
import About from './pages/About';
import ContactPage from './pages/Contact';
import AdminPage from './pages/Admin';
import CaptainsHideaway from './pages/CaptainsHideaway';
import CaptainsCottage from './pages/CaptainsCottage';

import { isLocalEnvironment } from './utils/helpers';
import '@csstools/normalize.css';

// const errorLink = onError(({ graphQLErrors, networkError }) => {
// 	if (graphQLErrors) {
// 		graphQLErrors.forEach(({ message, locations, path }) => {

// 			// LogRocket.captureMessage(`[GraphQL error]: ${message}`);
// 		});
// 	}

// 	if (networkError) {

// 		// LogRocket.captureMessage(`[Network error]: ${networkError}`);
// 	}
// });

const client = new ApolloClient({
	uri: process.env.NODE_ENV === 'production' ? '/graphql' : 'http://localhost:3001/graphql',
	cache: new InMemoryCache(),
	// link: errorLink,
});

function App() {
	// Register GSAP plugins for all components. ScrollSmoother relies on ScrollTrigger
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

	return (
		<ApolloProvider client={client}>
			<Router>
				<ErrorProvider>
					<ToastNotif>
						<ErrorBoundary>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/captains_hideaway' element={<CaptainsHideaway />} />
								<Route path='/captains_cottage' element={<CaptainsCottage />} />
								<Route path='/about' element={<About />} />
								<Route path='/contact' element={<ContactPage />} />
								<Route path='/admin' element={<AdminPage />} />
								<Route path='*' element={<NotFound />} />
							</Routes>
						</ErrorBoundary>
					</ToastNotif>
				</ErrorProvider>
			</Router>
		</ApolloProvider>
	);
}

export default App;
