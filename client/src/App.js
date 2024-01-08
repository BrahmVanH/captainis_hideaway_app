import React, {useEffect} from 'react';
import ReactGA from 'react-ga';
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, gql } from '@apollo/client';
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

import '@csstools/normalize.css';



const typeDefs = gql`
	type imageObject {
		original: String
		thumbnail: String
		originalAlt: String
		thumbnailAlt: String
	}
	type homePgImgPack {
		headerImgUrl: String
		hideawayImgUrl: String
		cottageImgUrl: String
	}
	type hideawayImgPack {
		headerUrl: String
		galleryArray: [imageObject]
	}
	type cottageImgPack {
		headerUrl: String
		galleryArray: [imageObject]
	}
	type Query {
		getHomePgImgs: homePgImgPack
		getHideawayImgs: hideawayImgPack
		getCottageImgs: cottageImgPack
		getAboutPgImg: String
	}
`;

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }) => {
			LogRocket.captureMessage(`[GraphQL error]: ${message}`);
		});
	}

	if (networkError) {
		LogRocket.captureMessage(`[Network error]: ${networkError}`);
	}
});

const httpLink = new HttpLink({
	uri: process.env.NODE_ENV === 'production' ? '/graphql' : 'http://localhost:3001/graphql',
});
const link = ApolloLink.from([errorLink, httpLink]);

// Define cache policies
const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				getHomePgImgs: {
					keyArgs: [],
					merge(existing, incoming) {
						return incoming;
					},
				},
				getHideawayImgs: {
					keyArgs: [],
					merge(existing, incoming) {
						return incoming;
					},
				},
				getCottageImgs: {
					keyArgs: [],
					merge(existing, incoming) {
						return incoming;
					},
				},
				getAboutPgImg: {
					keyArgs: [],
					merge(existing, incoming) {
						return incoming;
					},
				},
			},
		},
	},
});

const client = new ApolloClient({
	link,
	cache: cache,
	typeDefs: typeDefs,
});

function App() {

	 useEffect(() => {
			ReactGA.pageview(window.location.pathname + window.location.search);
		}, []);

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
