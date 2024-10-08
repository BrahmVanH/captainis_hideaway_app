import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import gsap from 'gsap';
// import ReactGA from 'react-ga';


import { useQuery } from '@apollo/client';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';

import _ from 'lodash';

import { GET_HIDEAWAY_IMAGES } from '../utils/queries';
import { useErrorContext } from '../utils/ErrorContext';
import { SET_THROW_ERROR } from '../utils/actions';

import ImageGallery from 'react-image-gallery';

import { CiCoffeeBean } from 'react-icons/ci';
import { GiBathtub, GiBunkBeds, GiBeachBucket, GiThermometerCold, GiHeatHaze } from 'react-icons/gi';
import { BsFillDoorOpenFill, BsSun } from 'react-icons/bs';
import { LuBedDouble, LuBedSingle } from 'react-icons/lu';
import { IoBedOutline } from 'react-icons/io5';
import { PiCookingPot, PiCouch, PiFlowerTulipDuotone } from 'react-icons/pi';
import { MdOutlineOutdoorGrill, MdOutlineBrunchDining, MdOutlineKitchen } from 'react-icons/md';
import { TbWifi, TbWashMachine, TbWashDry1, TbToolsKitchen2, TbDeviceTv, TbKayak } from 'react-icons/tb';

import dishwasherIcon from '../assets/icons/dishwasher_icon.svg';
import porchIcon from '../assets/icons/porch-icon-noun.svg';
import deckIcon from '../assets/icons/deck-icon-noun.svg';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AvailabilityCalendar from '../components/Calendar';
import Loading from '../components/Loading';

import amenities from '../utils/amenities.json';
import './CaptainsHideaway.css';
import 'react-image-gallery/styles/css/image-gallery.css';

function CaptainsHideaway() {
	
	//  useEffect(() => {
	// 		ReactGA.pageview(window.location.pathname + window.location.search);
	// 	}, []);

	// Global error state context - () => displays error message over app view
	const [state, dispatch] = useErrorContext();

	const propertyName = 'captainsHideaway';
	const hideawayAmenities = amenities.hideawayAmenities;

	const imageGalleryRef = useRef(null);
	const main = useRef();
	const smoother = useRef();

	// State variables
	const [hideawayGalObjs, setHideawayGalObjs] = useState(null);
	const [headerUrl, setHeaderUrl] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// Amenity modal acts weird, modulating this variable will
	// directly affect the visibility of modal
	const [mainContentStyle, setMainContentStyle] = useState({
		transform: 'translateY(0px)',
	});

	// Header image style
	const [imageStyle, setImageStyle] = useState({
		width: '1200px',
	});

	// Add class to amenities card when user chooses to 'see more...'
	const [showAmenitiesClass, setShowAmenitiesClass] = useState('');
	const [moreAmenitiesDisplay, setMoreAmenitiesDisplay] = useState({ display: 'none' });
	const [showAmenities, setShowAmenities] = useState(false);

	// Reveal additional amenities when user clicks 'see more...' button
	const revealAmenities = () => {
		if (!showAmenities) {
			setShowAmenitiesClass('show-amenities');
			setMoreAmenitiesDisplay({ display: '' });
			setShowAmenities(true);
		} else {
			setShowAmenitiesClass('');
			setMoreAmenitiesDisplay({ display: 'none' });
			setShowAmenities(false);
		}
	};

	// Responsive page layout
	useEffect(() => {
		window.innerWidth < 500 ? setImageStyle({ width: '600px', height: '350px' }) : setImageStyle({ width: '1200px', height: '800px' });
		window.innerWidth < 500 ? setMainContentStyle({ transform: 'translateY(-250.5px)' }) : setMainContentStyle({ transform: 'translateY(0px)' });
	}, []);
	const trigger = useRef(null);

	// Allows view to be painted when masthead image and gallery image objects are loaded
	useEffect(() => {
		if (hideawayGalObjs && headerUrl) {
			setIsLoading(false);
		}
	}, [hideawayGalObjs, headerUrl]);

	// Get images from AWS S3
	const { loading, error, data } = useQuery(GET_HIDEAWAY_IMAGES);

	// Setting state variables, view-rendering is dependent on these
	useEffect(() => {
		if (!error && !loading && data) {
			setHeaderUrl(data.getHideawayImgs.headerUrl);
			setHideawayGalObjs(data.getHideawayImgs.galleryArray);
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
	}, [loading, data, error]);

	// Apply gsap effects on architecture before view is painted
	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

		const ctx = gsap.context(() => {
			smoother.current = ScrollSmoother.create({
				smooth: 1,
				effects: true,
			});
		}, main);
		return () => ctx.revert();
	}, []);

	// Click on header image to toggle image gallery full screen
	const toggleGalleryFullScreen = () => {
		imageGalleryRef.current.fullScreen();
	};

	return (
		<div ref={main} id='smooth-wrapper'>
			<div id='smooth-content'>
				{!isLoading ? (
					<>
						<Navbar />
						
						<div onClick={toggleGalleryFullScreen} className='mt-2 col-lg-10 d-flex justify-content-center' style={{ overflow: 'hidden', height: '600px', margin: 'auto' }}>
							<img alt='house at top of hill from beach' style={imageStyle} src={headerUrl} />
						</div>
						<div style={mainContentStyle} className='d-flex align-items-center flex-column'>
							<div className='col-lg-10 col-11 d-flex flex-lg-row flex-column justify-content-center'>
								<div className='col-lg-8 col-12'>
									<div className='overview-card card'>
										<div className='captains-hideaway-card-body card-body d-flex flex-column'>
											<h3 className='card-title'>Captain's Hideaway</h3>
											<div className='overview d-flex  justify-content-lg-around justify-content-center'>
												<div className='overview-item'>
													<BsFillDoorOpenFill size='24px' className='overview-item-icon' />
													<p>4 Bedrooms</p>
												</div>
												<div className='overview-item'>
													<GiBathtub size='24px' className='overview-item-icon' />
													<p>3 Bathrooms</p>
												</div>
												<div className='overview-item'>
													<LuBedDouble size='24px' className='overview-item-icon' />
													<p>Sleeps 10</p>
												</div>
											</div>
										</div>
									</div>
									<div className='rooms-and-beds-card card'>
										<div className='captains-hideaway-card-body card-body d-flex flex-column'>
											<div className='rooms-and-beds-inner-container d-flex flex-lg-row flex-column'>
												<h3 style={{ padding: '0.5rem 0.5rem 0.5rem 1rem', margin: '0px' }}>Rooms &amp; Beds</h3>
												<div className='d-flex flex-row justify-content-between flex-md-nowrap flex-wrap' style={{ padding: '0.5rem', width: '100%', margin: '0.5rem' }}>
													<div className='hideaway-bedroom-description-container '>
														<p>Bedroom 1</p>
														<IoBedOutline size='22px' />
														<p className='bedroom-description-text'>1 King Bed</p>
													</div>
													<div className='hideaway-bedroom-description-container'>
														<p>Bedroom 2</p>
														<LuBedDouble style={{ marginTop: '0.25rem' }} size='18px' />

														<p className='bedroom-description-text'>1 Queen Bed</p>
													</div>
													<div className='hideaway-bedroom-description-container'>
														<p>Bedroom 3</p>
														<LuBedSingle style={{ marginTop: '0.25rem' }} size='18px' />
														<p className='bedroom-description-text'>1 Double Bed</p>
													</div>
													<div className='hideaway-bedroom-description-container'>
														<p>Bedroom 4</p>
														<GiBunkBeds style={{ marginTop: '0.25rem' }} size='18px' />
														<p className='bedroom-description-text'>1 Twin Bunk Bed</p>
													</div>
													<div className='hideaway-bedroom-description-container'>
														<p>Common Area</p>
														<div style={{ lineHeight: '20px', display: 'inline-block' }}>
															<PiCouch style={{ marginTop: '0.25rem' }} size='16px' />
															<PiCouch style={{ marginTop: '0.25rem' }} size='16px' />
														</div>
														<p style={{ padding: '0px' }} className='bedroom-description-text'>
															2 Sleeper Sofas
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className='spaces-card card'>
										<div className='captains-hideaway-card-body card-body d-flex flex-column'>
											<div className='d-flex flex-lg-row flex-column' style={{ padding: '0.5rem' }}>
												<h3 className='spaces-header-text'>Spaces</h3>
												<div className='d-flex flex-lg-row flex-column align-items-center justify-content-around' style={{ width: '100%', padding: '0.5rem' }}>
													<div className='spaces-item-container'>
														<MdOutlineBrunchDining size='18px' />
														<p className='spaces-text'>Dining Area</p>
													</div>
													<div className='spaces-item-container'>
														<img alt='deck icon' src={deckIcon} height={'18px'} />
														<p className='spaces-text'>Deck/Patio</p>
													</div>
													<div className='spaces-item-container'>
														<img alt='porch icon' src={porchIcon} height={'18px'} width={'18px'} />
														<p className='spaces-text'>Porch/Veranda</p>
													</div>
													<div className='spaces-item-container'>
														<MdOutlineKitchen size='18px' />
														<p className='spaces-text'>Kitchen</p>
													</div>
													<div className='spaces-item-container'>
														<PiFlowerTulipDuotone size='18px' />
														<p className='spaces-text'>Lawn &amp; Garden</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<AvailabilityCalendar id='calendar' propertyName={propertyName} />
							</div>

							<div className='about-property-card card col-sm-11 col-md-10 ' style={{ padding: '0.5rem' }}>
								<div className='captains-hideaway-card-body card-body d-flex flex-column'>
									<div className='d-flex flex-lg-row flex-column' style={{ padding: '0.5rem' }}>
										<h3 className='about-property-header' style={{ margin: '0px', padding: '0.5rem' }}>
											About the Property
										</h3>
										<div className='d-flex justify-content-center'>
											<div className='d-flex flex-column justify-content-between' style={{ width: '100%', padding: '0.5rem' }}>
												<p className='about-property-subheader'>Captains Hideaway on Lake Superior</p>
												<p className='about-property-text' style={{ padding: '0.5rem' }}>
													Captain's Hideaway in Deer Park, Newberry, The Official Moose Capital of Michigan, offers a spacious layout that will accommodate up to 10 guests in utmost comfort. This 4
													bedroom, 3 full bath home overlooking spectacular Lake Superior is every vacationer's dream. Spend your days hunting for agates on the beaches of Lake Superior, beach access
													is simply a few steps away from the back porch. If relaxing indoors is more your speed, spend the day lounging in the 4 season room that overlooks miles and miles of
													unobstructed views of Lake Superior. Lake Muskallonge is a short walk from the property and boasts terrific inland fishing, boating and much more! Grand Marais, MI is a short
													drive 18 miles west and is the eastern Gateway to Pictured Rocks National Lakeshore. The North Country Trail is accessible from the beach for endless miles of hiking or go
													fishing in the famous Two Hearted River. Trail maps are available in the house or download AllTrails app. Bring your clubs for golfing at beautiful Newberry Country Club. A
													stay at Captain's Hideaway will truly refuel your soul and provide unparalleled memories for years to come.facebook.com/captainshideaway1
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='amenities-card card col-sm-11 col-md-10 ' style={{ margin: '0.5rem' }}>
								<div className='captains-hideaway-card-body card-body d-flex flex-column' style={{ padding: '0.5rem' }}>
									<div className='d-flex flex-column flex-lg-row' style={{ padding: '0.5rem' }}>
										<h3 style={{ margin: '0px', padding: '0.5rem' }}>Amenities</h3>
										<div className='amenities-item-wrapper' style={{ margin: '0.5rem', fontSize: '14px', width: '90%', padding: '0.5rem' }}>
											<div className={`amenities-item-container ${showAmenitiesClass}`} style={{ width: '100%', height: '100%' }}>
												<div style={{ padding: '0.5rem' }}>
													<div className='amenities-item'>
														<TbToolsKitchen2 />
														<p>Kitchen</p>
													</div>
													<div className='amenities-item'>
														<TbWashMachine />
														<p>Washer</p>
													</div>
													<div className='amenities-item'>
														<TbWashDry1 />
														<p>Dryer</p>
													</div>
												</div>
												<div style={{ padding: '0.5rem' }}>
													<div className='amenities-item'>
														<TbWifi />
														<p>Free WiFi</p>
													</div>
													<div className='amenities-item'>
														<TbDeviceTv />
														<p>Cable TV</p>
													</div>
													<div className='amenities-item'>
														<BsSun />
														<p>Outdoor Space</p>
													</div>
												</div>
												<div style={{ padding: '0.5rem' }}>
													<div className='amenities-item'>
														<GiHeatHaze />
														<p>Heat</p>
													</div>
													<div className='amenities-item'>
														<GiThermometerCold />
														<p>Air Conditioning</p>
													</div>
													<div className='amenities-item'>
														<GiBeachBucket />
														<p>Beach Access</p>
													</div>
												</div>
												<div style={{ padding: '0.5rem' }}>
													<div className='amenities-item'>
														<GiBathtub />
														<p>Bath Tub</p>
													</div>
													<div className='amenities-item'>
														<TbKayak />
														<p>Kayaks</p>
													</div>
													<div className='amenities-item'>
														<PiCookingPot />
														<p>Dishes</p>
													</div>
												</div>
												<div style={{ padding: '0.5rem' }}>
													<div className='amenities-item'>
														<img alt='dishwasher icon' src={dishwasherIcon} height={'14px'} width={'14px'} />
														<p>Dishwasher</p>
													</div>
													<div className='amenities-item'>
														<MdOutlineOutdoorGrill />
														<p>Grill</p>
													</div>
													<div className='amenities-item'>
														<CiCoffeeBean />
														<p>Coffee Grinder</p>
													</div>
												</div>
											</div>
											<div>
												{hideawayAmenities ? (
													<div style={moreAmenitiesDisplay}>
														<div className='more-amenities-container'>
															{hideawayAmenities.map((group) => (
																<div className='amenities-section' key={group.type}>
																	<h4>{group.type}</h4>
																	<div className='amenities-items'>
																		{group.items.length > 8 ? (
																			<div className='amenities-item-columns'>
																				{_.chunk(group.items, 8).map((list) => (
																					<ul className='amenities-list' key={list}>
																						{list.map((item) => {
																							return (
																								<li className='amenities-list-item' key={item}>
																									{item}
																								</li>
																							);
																						})}
																					</ul>
																				))}
																			</div>
																		) : (
																			<ul className='amenities-list'>
																				{group.items.map((item) => {
																					return (
																						<li className='amenities-list-item' key={item}>
																							{item}
																						</li>
																					);
																				})}
																			</ul>
																		)}
																	</div>
																</div>
															))}
														</div>
													</div>
												) : (
													<></>
												)}

												<div className='d-flex justify-content-end'>
													{!showAmenities ? (
														<button className='open-modal-btn' onClick={() => revealAmenities()}>
															See more...
														</button>
													) : (
														<button className='open-modal-btn' onClick={() => revealAmenities()}>
															See less...
														</button>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='house-rules-card card col-sm-11 col-md-10 '>
								<div className='captains-hideaway-card-body card-body d-flex flex-column' style={{ padding: '0.5rem' }}>
									<div className='house-rules-container'>
										<h3 style={{ padding: '0.5rem' }}>House Rules</h3>
										<div className='house-rules-text-wrapper'>
											<div className='house-rules-text' style={{ padding: '0.5rem, 0rem', height: '100%' }}>
												<div className='d-flex' style={{ padding: '0.5rem', width: '50%' }}>
													<div style={{ padding: '0.5rem' }}>
														<p>Check in after 4:00 PM</p>
														<p>Minimum age to rent: 25</p>
													</div>
													<div style={{ padding: '0.5rem' }}>
														<p>Check out before 11:00 AM</p>
													</div>
												</div>
												<div className='d-flex'>
													<div style={{ padding: '0.5rem' }}>
														<h5>Children</h5>
														<p style={{ fontSize: '14px' }}>All ages</p>
														<h5>Pets</h5>
														<p style={{ fontSize: '14px' }}>No pets allowed</p>
													</div>
													<div style={{ padding: '0.5rem' }}>
														<h5>Events</h5>
														<p style={{ fontSize: '14px' }}>No events allowed</p>
														<h5>Smoking</h5>
														<p style={{ fontSize: '14px' }}>Smoking is not permitted</p>
													</div>
												</div>
												<div style={{ padding: '0', width: '75%' }}>
													<p style={{ margin: '0rem', padding: '0.5rem' }}>
														All dogs on property must be approved by owner. If dogs are left unattended in house for more than 2 hours, renter will forfeit security deposit.
													</p>
													<p style={{ padding: '0rem', margin: '0.5rem' }}>No Pit Bull Terrier breeds of any kind.</p>
													<p style={{ margin: '0rem', padding: '0.5rem' }}>If you are inquiring about an earlier check-in, call Elyse day before your date for info.</p>
												</div>
											</div>
										</div>
									</div>
									<div className='damage-incidentals-container'>
										<h3 style={{ padding: '0.5rem' }}>Damage and Incidentals</h3>
										<div className='damage-incidentals-text-container' style={{ height: '100%', padding: '0.5rem' }}>
											<p style={{ margin: '0px', padding: '0.5rem' }}>You will be responsible for any damage to the rental property caused by you or your party during your stay.</p>
										</div>
									</div>
								</div>
							</div>
							<div ref={trigger} className='important-information-card card col-sm-11 col-md-10 '>
								<div className='captains-hideaway-card-body card-body d-flex flex-column' style={{ padding: '0.5rem' }}>
									<div className='d-flex' style={{ padding: '0.5rem' }}>
										<h3 style={{ padding: '0.5rem' }}>Important Information</h3>
										<div className='important-information'>
											<h5>You Need To Know</h5>
											<p className='important-information-text'>Extra-person charges may apply and vary depending on property policy</p>
											<p className='important-information-text'>
												Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges
											</p>
											<p className='important-information-text'>Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed</p>
											<p className='important-information-text'> Onsite parties or group events are strictly prohibited</p>
											<p className='important-information-text'>Safety features at this property include a carbon monoxide detector, a fire extinguisher, and a smoke detector</p>
										</div>
									</div>
								</div>
							</div>
							<div className='image-gallery-wrapper'>
								<ImageGallery ref={imageGalleryRef} showPlayButton={false} items={hideawayGalObjs} />
							</div>
						</div>
						<Footer />
					</>
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
}

export default CaptainsHideaway;
