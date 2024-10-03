import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
// import ReactGA from 'react-ga';


import { createScrollSmoother } from '../utils/gsapHelpers';
import { useQuery } from '@apollo/client';
import { GET_ABOUT_PG_IMAGES } from '../utils/queries';
import { SET_THROW_ERROR } from '../utils/actions';
import { useErrorContext } from '../utils/ErrorContext';

import AboutCard from '../components/AboutCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

function About() {
	//  useEffect(() => {
	// 		ReactGA.pageview(window.location.pathname + window.location.search);
	// 	}, []);

	const [state, dispatch] = useErrorContext();

	const [cardImgUrl, setCardImgUrl] = useState(null);

	const main = useRef();
	const smoother = useRef();

	const { loading, error, data } = useQuery(GET_ABOUT_PG_IMAGES);

	useEffect(() => {
		if (!loading && !error && data) {
			setCardImgUrl(data.getAboutPgImg);
		} else if (error) {
			dispatchEvent({
				type: SET_THROW_ERROR,
				throwError: true,
				errorMessage: {
					code: error?.networkError?.statusCode,
					message: 'Sorry, there was a network error while loading this page. The issue should be resolved with a refresh.',
				},
			});
		}
	}, [loading, data, error]);

	useLayoutEffect(() => {
		createScrollSmoother(main, smoother);
	}, []);

	return (
		<div ref={main} id='smooth-wrapper'>
			<div id='smooth-content'>
				<Navbar />
				{cardImgUrl !== null && !loading ? (
					<div className='d-flex justify-content-center' style={{ width: '100%' }}>
						<AboutCard image={cardImgUrl} />
					</div>
				) : (
					<Loading />
				)}
				<Footer />
			</div>
		</div>
	);
}

export default About;
