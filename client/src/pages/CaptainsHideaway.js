import React from 'react';

import ImageGallery from 'react-image-gallery';

import { CiCoffeeBean } from 'react-icons/ci';
import { GiBathtub, GiBunkBeds, GiBeachBucket, GiThermometerCold, GiHeatHaze } from 'react-icons/gi';
import { BsFillDoorOpenFill, BsSun } from 'react-icons/bs';
import { LuBedDouble, LuBedSingle } from 'react-icons/lu';
import { IoBedOutline } from 'react-icons/io5';
import { PiCookingPot, PiCouch, PiFlowerTulipDuotone } from 'react-icons/pi';
import { MdOutlineOutdoorGrill, MdOutlineBrunchDining, MdOutlineKitchen } from 'react-icons/md';
import { TbWifi, TbWashMachine, TbWashDry1, TbToolsKitchen2, TbDeviceTv, TbKayak } from 'react-icons/tb';

import AvailabilityCalendar from '../components/Calendar';

import dishwasherIcon from '../assets/icons/dishwasher_icon.svg';
import porchIcon from '../assets/icons/porch-icon-noun.svg';
import deckIcon from '../assets/icons/deck-icon-noun.svg';

import './CaptainsHideaway.css';
// import '~react-image-gallery/styles/css/image-gallery.css';

import { hideawayGalleryImages } from '../utils/gallery_image_helpers';

function CaptainsHideaway() {
	const propertyName = 'captainsHideaway';
	return (
		<div>
			{/* <header className='captains-hideaway-header text-center text-white masthead'></header> */}

			<ImageGallery use showThumbnails={true} thumbnailWidth={25} thumbnailHeight={25} items={hideawayGalleryImages} />
			<div className='d-flex align-items-center flex-column '>
				<div className='col-md-10 d-flex'>
					<div className='col-8'>
						<div className='overview-card card'>
							<div className='captains-hideaway-card-body card-body d-flex flex-column'>
								<h3 className='card-title'>Captain's Hideaway</h3>
								<div className='overview d-flex justify-content-around'>
									<div className='overview-item'>
										<BsFillDoorOpenFill size='24px' className='overview-item-icon' />
										<p>4 bedrooms</p>
									</div>
									<div className='overview-item'>
										<GiBathtub size='24px' className='overview-item-icon' />
										<p>3 bathrooms</p>
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
								<div className='rooms-and-beds-inner-container d-flex'>
									<h3 style={{ padding: '0.5rem 0.5rem 0.5rem 1rem', margin: '0px' }}>Rooms &amp; Beds</h3>
									<div className='d-flex flex-row justify-content-between' style={{ padding: '0.5rem', width: '100%', margin: '0.5rem' }}>
										<div className='bedroom-description-container'>
											<p>Bedroom 1</p>
											<IoBedOutline size='22px' />
											<p className='bedroom-description-text'>1 King Bed</p>
										</div>
										<div className='bedroom-description-container'>
											<p>Bedroom 2</p>
											<LuBedDouble style={{ marginTop: '0.25rem' }} size='18px' />

											<p className='bedroom-description-text'>1 Queen Bed</p>
										</div>
										<div className='bedroom-description-container'>
											<p>Bedroom 3</p>
											<LuBedSingle style={{ marginTop: '0.25rem' }} size='18px' />
											<p className='bedroom-description-text'>1 Double Bed</p>
										</div>
										<div className='bedroom-description-container'>
											<p>Bedroom 4</p>
											<GiBunkBeds style={{ marginTop: '0.25rem' }} size='18px' />
											<p className='bedroom-description-text'>1 Twin Bunk Bed</p>
										</div>
										<div className='bedroom-description-container'>
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
								<div className='d-flex' style={{ padding: '0.5rem' }}>
									<h3 className='spaces-header-text'>Spaces</h3>
									<div className='d-flex flex-row justify-content-around' style={{ width: '100%', padding: '0.5rem' }}>
										<div className='spaces-item-container'>
											<MdOutlineBrunchDining size='18px' />
											<p className='spaces-text'>Dining Area</p>
										</div>
										<div className='spaces-item-container'>
											<img src={deckIcon} height={'18px'} />
											<p className='spaces-text'>Deck/Patio</p>
										</div>
										<div className='spaces-item-container'>
											<img src={porchIcon} height={'18px'} width={'18px'} />
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
					<AvailabilityCalendar propertyName={propertyName} />
				</div>

				<div className='about-property-card card col-sm-11 col-md-10 ' style={{ padding: '0.5rem' }}>
					<div className='captains-hideaway-card-body card-body d-flex flex-column'>
						<div className='d-flex' style={{ padding: '0.5rem' }}>
							<h3 className='about-property-header' style={{ margin: '0px', padding: '0.5rem' }}>
								About the Property
							</h3>
							<div className='d-flex justify-content-center'>
								<div className='d-flex flex-column justify-content-between' style={{ width: '100%', padding: '0.5rem' }}>
									<p className='about-property-subheader'>Captains Hideaway on Lake Superior</p>
									<p className='about-property-text' style={{ padding: '0.5rem' }}>
										Captain's Hideaway in Deer Park, Newberry, The Official Moose Capital of Michigan, offers a spacious layout that will accommodate up to 10 guests in utmost comfort. This 4 bedroom,
										3 full bath home overlooking spectacular Lake Superior is every vacationer's dream. Spend your days hunting for agates on the beaches of Lake Superior, beach access is simply a few
										steps away from the back porch. If relaxing indoors is more your speed, spend the day lounging in the 4 season room that overlooks miles and miles of unobstructed views of Lake
										Superior. Lake Muskallonge is a short walk from the property and boasts terrific inland fishing, boating and much more! Grand Marais, MI is a short drive 18 miles west and is the
										eastern Gateway to Pictured Rocks National Lakeshore. The North Country Trail is accessible from the beach for endless miles of hiking or go fishing in the famous Two Hearted
										River. Trail maps are available in the house or download AllTrails app. Bring your clubs for golfing at beautiful Newberry Country Club. A stay at Captain's Hideaway will truly
										refuel your soul and provide unparalleled memories for years to come.facebook.com/captainshideaway1
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='amenities-card card col-sm-11 col-md-10 ' style={{ margin: '0.5rem' }}>
					<div className='captains-hideaway-card-body card-body d-flex flex-column' style={{ padding: '0.5rem' }}>
						<div className='d-flex' style={{ padding: '0.5rem' }}>
							<h3 style={{ margin: '0px', padding: '0.5rem' }}>Amenities</h3>
							<div className='amenities-item-wrapper' style={{ margin: '0.5rem', fontSize: '14px', width: '90%', padding: '0.5rem' }}>
								<div className='amenities-item-container' style={{ width: '100%', height: '100%' }}>
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
											<img src={dishwasherIcon} height={'14px'} width={'14px'} />
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
								{/* <div className='d-flex justify-content-end'>
								<button className='btn btn-sm' type='button' style='text-decoration: underline;margin: 0px 2rem;'>
									See more...
								</button>
							</div> */}
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
										<p sstyle={{ padding: '0rem', margin: '0.5rem' }}>No Pit Bull Terrier breeds of any kind.</p>
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
					<div className='captains-hideaway-card-body card-body d-flex flex-column' style={{ padding: '0.5rem' }}>
						<div className='d-flex' style={{ padding: '0.5rem' }}>
							<h3 style={{ padding: '0.5rem' }}>Important Information</h3>
							<div className='important-information'>
								<h5>You Need To Know</h5>
								<p className='important-information-text'>Extra-person charges may apply and vary depending on property policy</p>
								<p className='important-information-text'>Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges</p>
								<p className='important-information-text'>Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed</p>
								<p className='important-information-text'> Onsite parties or group events are strictly prohibited</p>
								<p className='important-information-text'>Safety features at this property include a carbon monoxide detector, a fire extinguisher, and a smoke detector</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CaptainsHideaway;
