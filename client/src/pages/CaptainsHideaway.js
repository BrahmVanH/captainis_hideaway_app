import React from 'react';
import { GiBathtub, GiBunkBeds, GiBeachBucket, GiThermometerCold, GiHeatHaze } from 'react-icons/gi';
import { BsFillDoorOpenFill } from 'react-icons/bs';
import { LuBedDouble, LuBedSingle } from 'react-icons/lu';
import { IoBedOutline } from 'react-icons/io5';
import { PiCouch, PiCookingPot } from 'react-icons/pi';
import { MdOutdoorGrill } from 'react-icons/md';
import { TbWifi, TbWashMachine, TbWashDry1, TbToolsKitchen2, TbDeviceTv, TbKayak } from 'react-icons/tb';

import './CaptainsHideaway.css';

function CaptainsHideaway() {
	return (
		<div>
			<header className='captains-hideaway-header text-center text-white masthead'></header>
			<div className='overview-card card'>
				<div className='card-body d-flex flex-column'>
					<h4 className='card-title'>Captain's Hideaway Lake Superior</h4>
					<div className='overview d-flex justify-content-around' style={{ padding: '0.5rem', margin: '0.5rem' }}>
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
				<div className='card-body d-flex flex-column'>
					<div className='rooms-and-beds-inner-container d-flex' style={{ padding: '0.5rem' }}>
						<h2 style={{ padding: '0.5rem', margin: '0px' }}>Rooms &amp; Beds</h2>
						<div className='d-flex flex-row justify-content-between' style={{ padding: '0.5rem', width: '100%', margin: '0.5rem' }}>
							<div className='d-flex align-items-center flex-column'>
								<p>Bedroom 1</p>
								<IoBedOutline size='22px' />
								<p style={{ fontSize: '14px' }}>1 King Bed</p>
							</div>
							<div className='d-flex align-items-center flex-column'>
								<p>Bedroom 2</p>
								<LuBedDouble size='18px' />

								<p style={{ fontSize: '14px' }}>1 Queen Bed</p>
							</div>
							<div className='d-flex align-items-center flex-column'>
								<p>Bedroom 3</p>
								<LuBedSingle size='18px' />
								<p style={{ fontSize: '14px' }}>1 Double Bed</p>
							</div>
							<div className='d-flex align-items-center flex-column'>
								<p>Bedroom 4</p>
								<GiBunkBeds size='18px' />
								<p style={{ fontSize: '14px' }}>1 Twin Bunk Bed</p>
							</div>
							<div className='d-flex align-items-center flex-column'>
								<p>Common Area</p>
								<div style={{ display: 'inline-block' }}>
									<LuBedDouble size='16px' />
									<LuBedDouble size='16px' />
								</div>
								<p style={{ fontSize: '14px' }}>2 Double Beds</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='card' style={{ margin: '1rem', padding: '0.5rem' }}>
				<div className='card-body d-flex flex-column'>
					<div className='d-flex' style={{ padding: '0.5rem' }}>
						<h2 style={{ padding: '0.5rem' }}>Spaces</h2>
						<div className='d-flex flex-row justify-content-around' style={{ width: '100%', padding: '0.5rem' }}>
							<p style={{ fontSize: '14px' }}>Dining Area</p>
							<p style={{ fontSize: '14px' }}>Deck/Patio</p>
							<p style={{ fontSize: '14px' }}>Porch/Veranda</p>
							<p style={{ fontSize: '14px' }}>Kitchen</p>
							<p style={{ fontSize: '14px' }}>Lawn &amp; Garden</p>
						</div>
					</div>
				</div>
			</div>
			<div className='card' style={{ padding: '0.5rem' }}>
				<div className='card-body d-flex flex-column'>
					<div className='d-flex' style={{ padding: '0.5rem' }}>
						<h2 style={{ margin: '0px', padding: '0.5rem' }}>About the Property</h2>
						<div className='d-flex justify-content-center'>
							<div className='d-flex flex-column justify-content-between' style={{ width: '100%', padding: '0.5rem' }}>
								<p style={{ fontSize: '14px' }}>Captains Hideaway on Lake Superior</p>
								<p style={{ padding: '0.5rem' }}>
									Captain's Hideaway in Deer Park, Newberry, The Official Moose Capital of Michigan, offers a spacious layout that will accommodate up to 10 guests in utmost comfort. This 4 bedroom, 3
									full bath home overlooking spectacular Lake Superior is every vacationer's dream. Spend your days hunting for agates on the beaches of Lake Superior, beach access is simply a few
									steps away from the back porch. If relaxing indoors is more your speed, spend the day lounging in the 4 season room that overlooks miles and miles of unobstructed views of Lake
									Superior. Lake Muskallonge is a short walk from the property and boasts terrific inland fishing, boating and much more! Grand Marais, MI is a short drive 18 miles west and is the
									eastern Gateway to Pictured Rocks National Lakeshore. The North Country Trail is accessible from the beach for endless miles of hiking or go fishing in the famous Two Hearted River.
									Trail maps are available in the house or download AllTrails app. Bring your clubs for golfing at beautiful Newberry Country Club. A stay at Captain's Hideaway will truly refuel your
									soul and provide unparalleled memories for years to come.*Due to recent problems, we will no longer accept dogs. If your dog is noted on the property without being registered with
									us, or unattended in the house for more than 2 hrs, you security deposit will be forfeited.facebook.com/captainshideaway1
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='card' style={{ margin: '0.5rem' }}>
				<div className='card-body d-flex flex-column' style={{ padding: '0.5rem' }}>
					<div className='d-flex' style={{ padding: '0.5rem' }}>
						<h2 style={{ margin: '0px', padding: '0.5rem' }}>Amenities</h2>
						<div className='d-flex flex-column justify-content-center' style={{ margin: '0.5rem', fontSize: '14px', width: '90%', padding: '0.5rem' }}>
							<div className='d-flex flex-row justify-content-between' style={{ width: '100%', height: '100%' }}>
								<div style={{ padding: '0.5rem' }}>
									<div>
										<TbToolsKitchen2 />
										<p>Kitchen</p>
									</div>
									<div>
										<TbWashMachine />
										<p>Washer</p>
									</div>
									<div>
										<TbWashDry1 />
										<p>Dryer</p>
									</div>
								</div>
								<div style={{ padding: '0.5rem' }}>
									<div>
										<TbWifi />
										<p>Free WiFi</p>
									</div>
									<div>
										<TbDeviceTv />
										<p>Cable TV</p>
									</div>
									<div>
										<MdOutdoorGrill />
									</div>
									<p>Outdoor Space</p>
								</div>
								<div style={{ padding: '0.5rem' }}>
									<div>
										<GiHeatHaze />
										<p>Heat</p>
									</div>
									<div>
										<GiThermometerCold />
										<p>Air Conditioning</p>
									</div>
									<div>
										<GiBeachBucket />
										<p>Beach Access</p>
									</div>
								</div>
								<div style={{ padding: '0.5rem' }}>
									<div>
										<GiBathtub />
										<p>Bath Tub</p>
									</div>
									<div>
										<TbKayak />
										<p>Kayaks</p>
									</div>
									<div>
										<PiCookingPot />
										<p>Dishes</p>
									</div>
								</div>
								<div style={{ padding: '0.5rem' }}>
									<p>Dishwasher</p>
									<p>Grill</p>
									<p>Coffee Grinder</p>
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
			<div className='card' style={{ margin: '1rem' }}>
				<div className='card-body d-flex flex-column' style={{ padding: '0.5rem' }}>
					<div className='d-flex' style={{ padding: '0.5rem' }}>
						<h2 style={{ padding: '0.5rem' }}>House Rules</h2>
						<div className='d-flex flex-column justify-content-center align-items-center' style={{ padding: '0.5rem, 0rem', height: '100%' }}>
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
									<h2>Children</h2>
									<p style={{ fontSize: '14px' }}>All ages</p>
									<h2>Pets</h2>
									<p style={{ fontSize: '14px' }}>No pets allowed</p>
								</div>
								<div style={{ padding: '0.5rem' }}>
									<h3>Events</h3>
									<p style={{ fontSize: '14px' }}>No events allowed</p>
									<h3>Smoking</h3>
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
					<div className='d-flex' style={{ padding: '0.5rem' }}>
						<h2 style={{ padding: '0.5rem' }}>Damage and Incidentals</h2>
						<div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '100%', padding: '0.5rem' }}>
							<p style={{ margin: '0px', padding: '0.5rem' }}>You will be responsible for any damage to the rental property caused by you or your party during your stay.</p>
						</div>
					</div>
				</div>
			</div>
			<div className='important-information-card card'>
				<div className='card-body d-flex flex-column' style={{ padding: '0.5rem' }}>
					<div className='d-flex' style={{ padding: '0.5rem' }}>
						<h2 style={{ padding: '0.5rem' }}>Important Information</h2>
						<div className='important-information d-flex flex-column justify-content-center align-items-center'>
							<h3 className='important-information-text'>You Need To Know</h3>
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
	);
}

export default CaptainsHideaway;
