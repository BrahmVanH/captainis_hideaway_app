import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import gsap from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import {} from 'gsap/ScrollSmoother';

import { GET_COTTAGE_IMAGES } from '../utils/queries';
import { useErrorContext } from '../utils/ErrorContext';
import { SET_THROW_ERROR } from '../utils/actions';

import Loading from '../components/Loading';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import ImageGallery from 'react-image-gallery';
import AmenitiesModal from '../components/AmenitiesModal';
import AvailabilityCalendar from '../components/Calendar';

import { CiCoffeeBean } from 'react-icons/ci';
import { GiBathtub, GiBunkBeds, GiBeachBucket, GiHeatHaze } from 'react-icons/gi';
import { BsFillDoorOpenFill, BsSun } from 'react-icons/bs';
import { LuBedDouble, LuBedSingle } from 'react-icons/lu';
import { PiCookingPot, PiCouch, PiFlowerTulipDuotone } from 'react-icons/pi';
import { MdOutlineOutdoorGrill, MdOutlineBrunchDining, MdOutlineKitchen } from 'react-icons/md';
import { TbWifi, TbWashMachine, TbToolsKitchen2, TbDeviceTv, TbKayak } from 'react-icons/tb';

import dishwasherIcon from '../assets/icons/dishwasher_icon.svg';
import deckIcon from '../assets/icons/deck-icon-noun.svg';

import { cottageAmenities } from '../utils/cottageAmenities';

import './CaptainsCottage.css';
import 'react-image-gallery/styles/css/image-gallery.css';

function CaptainsCottage() {
	// Global error state context - () => displays error message over app view
	const [state, dispatch] = useErrorContext();

	const cottageAmenitiesComponent = useRef(null);
	const imageGalleryRef = useRef(null);
	const main = useRef();
	const smoother = useRef();

	const [headerUrl, setHeaderUrl] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [cottageGalObjs, setCottageGalObjs] = useState(null);

	const [mainContentStyle, setMainContentStyle] = useState({
		transform: 'translateY(0px)',
	});

	const [imageStyle, setImageStyle] = useState({
		width: '1100px',
	});

	useEffect(() => {
		window.innerWidth < 500 ? setImageStyle({ width: '600px', height: '350px' }) : setImageStyle({ width: '1100px' });
		window.innerWidth < 500 ? setMainContentStyle({ transform: 'translateY(-250.5px)' }) : setMainContentStyle({ transform: 'translateY(0px)' });
	}, []);

	// Allows view to be painted when masthead image and gallery image objects are loaded
	useEffect(() => {
		if (cottageGalObjs) {
			setIsLoading(false);
		}
	}, [cottageGalObjs]);

	const { loading, error, data } = useQuery(GET_COTTAGE_IMAGES);

	// Set img state variables when data present without error or loading
	useEffect(() => {
		if (!error && !loading && data) {
			setHeaderUrl(data.getCottageImgs.headerUrl);
			setCottageGalObjs(data.getCottageImgs.galleryArray);
		} else if (error) {
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
	const toggleGalleryFullScreen = () => {
		imageGalleryRef.current.fullScreen();
	};

	const propertyName = 'captainsCottage';
	return (
		<div ref={main} id='smooth-wrapper'>
			<div id='smooth-content'>
				{!isLoading ? (
					<>
						<Navbar />
						<div onClick={toggleGalleryFullScreen} className='mt-2 col-lg-10 d-flex justify-content-center' style={{ overflow: 'hidden', height: '600px', margin: 'auto' }}>
							<img style={imageStyle} src={headerUrl} />
						</div>

						<div style={mainContentStyle} className='d-flex align-items-center flex-column '>
							<div className='col-lg-10 col-11 d-flex flex-lg-row flex-column justify-content-center'>
								<div className='col-lg-8 col-12'>
									<div className='overview-card card'>
										<div className='captains-cottage-card-body card-body d-flex flex-column'>
											<h3 className='card-title'>Captain's Cottage</h3>
											<div className='overview d-flex justify-content-lg-around justify-content-center'>
												<div className='overview-item'>
													<BsFillDoorOpenFill size='24px' className='overview-item-icon' />
													<p>2 bedrooms</p>
												</div>
												<div className='overview-item'>
													<GiBathtub size='24px' className='overview-item-icon' />
													<p>1 bathrooms</p>
												</div>
												<div className='overview-item'>
													<LuBedDouble size='24px' className='overview-item-icon' />
													<p>Sleeps 7</p>
												</div>
											</div>
										</div>
									</div>
									<div className='rooms-and-beds-card card'>
										<div className='captains-cottage-card-body card-body d-flex flex-column'>
											<div className='rooms-and-beds-inner-container d-flex flex-lg-row flex-column'>
												<h3 style={{ padding: '0.5rem 0.5rem 0.5rem 1rem', margin: '0px' }}>Rooms &amp; Beds</h3>
												<div className='d-flex flex-row justify-content-between flex-lg-nowrap flex-wrap' style={{ padding: '0.5rem', width: '100%', margin: '0.5rem' }}>
													<div className='cottage-bedroom-description-container'>
														<p>Bedroom 1</p>
														<LuBedDouble style={{ marginTop: '0.25rem' }} size='18px' />
														<p className='bedroom-description-text'>1 Queen Bed</p>
													</div>
													<div className='cottage-bedroom-description-container'>
														<p>Common Area</p>
														<div style={{ lineHeight: '20px', display: 'inline-block' }}>
															<PiCouch style={{ marginTop: '0.25rem' }} size='16px' />
														</div>
														<p style={{ padding: '0px' }} className='bedroom-description-text'>
															1 Double Futon
														</p>
													</div>
													<div className='cottage-bedroom-description-container'>
														<p>Loft</p>
														<div className='bedroom-description-loft-icons'>
															<LuBedDouble style={{ marginTop: '0.25rem' }} size='18px' />
															<LuBedSingle style={{ marginTop: '0.25rem' }} size='18px' />
															<GiBunkBeds style={{ marginTop: '0.25rem' }} size='18px' />
														</div>
														<p className='bedroom-description-text'>1 Queen, 1 Double, Twin Bunkbeds</p>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className='spaces-card card'>
										<div className='captains-cottage-card-body card-body d-flex flex-column'>
											<div className='d-flex' style={{ padding: '0.5rem' }}>
												<h3 className='spaces-header-text'>Spaces</h3>
												<div className='d-flex flex-lg-row flex-column align-items-center justify-content-around' style={{ width: '100%', padding: '0.5rem' }}>
													<div className='spaces-item-container'>
														<img alt='deck icon' src={deckIcon} height={'18px'} />
														<p className='spaces-text'>Deck/Patio</p>
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
								<AvailabilityCalendar propertyName={propertyName} />
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
													3 acres of private Lake Superior beach front! Located on the North Country Trail. Muskallonge Lake located directly behind the property for great fishing. Hike or kayak on
													the famous Two-Hearted river. Parking for RV and 2 out buildings for snowmobile, ORV and boat parking. 9 miles from Pine Stump Junction. Captain's Guest House coming this
													spring!
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='amenities-card card col-sm-11 col-md-10 ' style={{ margin: '0.5rem' }}>
								<div className='captains-cottage-card-body card-body d-flex flex-column' style={{ padding: '0.5rem' }}>
									<div className='d-flex flex-column flex-lg-row' style={{ padding: '0.5rem' }}>
										<h3 style={{ margin: '0px', padding: '0.5rem' }}>Amenities</h3>
										<div className='amenities-item-wrapper' style={{ margin: '0.5rem', fontSize: '14px', width: '90%', padding: '0.5rem' }}>
											<div className='amenities-item-container' style={{ width: '100%', height: '100%' }}>
												<div style={{ padding: '0.5rem' }}>
													<div className='amenities-item'>
														<TbToolsKitchen2 />
														<p>Kitchen</p>
													</div>
													<div className='amenities-item'>
														<GiHeatHaze />
														<p>Heat</p>
													</div>
													<div className='amenities-item'>
														<GiBeachBucket />
														<p>Beach Access</p>
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
														<p>Coffee Maker</p>
													</div>
												</div>
											</div>
											<div className='d-flex justify-content-end'>
												<AmenitiesModal btnRef={cottageAmenitiesComponent} htmlOpenClassName={'ReactModal__Html--open'} amenities={cottageAmenities} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='house-rules-card card col-sm-11 col-md-10 '>
								<div className='captains-cottage-card-body card-body d-flex flex-column' style={{ padding: '0.5rem' }}>
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
							<div className='important-information-card card col-sm-11 col-md-10 '>
								<div className='captains-cottage-card-body card-body d-flex flex-column' style={{ padding: '0.5rem' }}>
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
											<p className='important-information-text'>Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed</p>
											<p className='important-information-text'>Safety features at this property include a carbon monoxide detector, a fire extinguisher, and a smoke detector</p>
										</div>
									</div>
								</div>
							</div>
							<div className='image-gallery-wrapper'>
								<ImageGallery ref={imageGalleryRef} showPlayButton={false} isFullScreen={true} items={cottageGalObjs} />
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

export default CaptainsCottage;
