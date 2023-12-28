import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

import { GET_HOME_PG_IMGS } from '../utils/queries';
import { useErrorContext } from '../utils/ErrorContext';
import { SET_THROW_ERROR } from '../utils/actions';

import PropertyCard from '../components/PropertyCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
	const [state, dispatch] = useErrorContext();

	const main = useRef();
	const smoother = useRef();

	const [cottageImgUrl, setCottageImgUrl] = useState(null);
	const [hideawayImgUrl, setHideawayImgUrl] = useState(null);
	const [headerUrl, setHeaderUrl] = useState(null);
	const [hideawayCard, setHideawayCard] = useState(null);
	const [cottageCard, setCottageCard] = useState(null);

	const { loading, error, data } = useQuery(GET_HOME_PG_IMGS);

	useEffect(() => {
		if (!error && !loading && data) {
			setHeaderUrl(data.getHomePgImgs.headerImgUrl);
			setCottageImgUrl(data.getHomePgImgs.cottageImgUrl);
			setHideawayImgUrl(data.getHomePgImgs.hideawayImgUrl);
		} else if (error && state) {
			dispatch({
				type: SET_THROW_ERROR,
				throwError: true,
				errorMessage: {
					code: error?.networkError?.statusCode,
					message: 'Sorry, there was a network error while loading this page. The issue should be resolved with a refresh.',
				},
			});
		}
	}, [loading, data, error, state, dispatch]);

	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

		const ctx = gsap.context(() => {
			// create the smooth scroller FIRST!
			smoother.current = ScrollSmoother.create({
				smooth: 1,
				effects: true,
			});
		}, main);
		return () => ctx.revert();
	}, []);

	// When image urls available from s3, pass property props to cards
	useEffect(() => {
		if (headerUrl !== null && cottageImgUrl !== null && hideawayImgUrl !== null) {
			setHideawayCard({
		title: "Captain's Hideaway",
		description:
			"This 4 bedroom, 3 full bath home overlooking spectacular Lake Superior is every vacationer's dream. Spend your days hunting for agates on the beaches of Lake Superior, beach access is simply a few steps away from the back porch. If relaxing indoors is more your speed, spend the day lounging in the 4 season room that overlooks miles and miles of unobstructed views of Lake Superior.",
		urlEndpoint: '/captains_hideaway',
		imagePath: hideawayImgUrl,
	});
			setCottageCard({
				title: "Captain's Cottage",
				description: '3 acres of private Lake Superior beach front! Located on the North Country Trail. Muskallonge Lake located directly behind the property for great fishing, hiking or kayaking. ',
				urlEndpoint: '/captains_cottage',
				imagePath: cottageImgUrl,
			});
		}
	}, [headerUrl, cottageImgUrl, hideawayImgUrl]);

	return (
		<div id='smooth-wrapper' ref={main}>
			<div id='smooth-content'>
				{hideawayCard !== null && cottageCard !== null && headerUrl !== null && !loading ? (
					<>
						<Navbar />
						<header style={{ backgroundImage: `url(${headerUrl})` }} className='home-header text-center text-white masthead'>
							<div className='overlay'>
								<div className='container welcome-message-container'>
									<div style={{ textAlign: 'left' }} className='col-xl-9 mx-auto position-relative'>
										<h1 className='welcome-message-text'>Welcome to Captain's Properties on Lake Superior</h1>
									</div>
								</div>
							</div>
						</header>
						<section className='text-center bg-light rental-cards features-icons'>
							<PropertyCard data-speed='0.8' property={hideawayCard} />
							<PropertyCard data-speed='0.8' property={cottageCard} />
						</section>
						<Footer />
					</>
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
}

export default Home;
