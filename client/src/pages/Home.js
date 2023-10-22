import React from 'react';

import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {

  const captainsHideawayCardImgPath = 'assets/img/stairs_from_beach_2.png'
  const captainsCottageCardImgPath = 'assets/img/back_exterior_side_with_lake.png'
	return (
		<div>
			<header className='home-header text-center text-white masthead'>
				<div className='overlay'>
					<div className='container welcome-message-container'>
						<div className='row'>
							<div className='col-xl-9 mx-auto position-relative'>
								<h1 className='mb-5'>Welcome to Captains Rentals</h1>
							</div>
						</div>
					</div>
				</div>
			</header>
			<section className='text-center bg-light rental-cards features-icons'>
				<div className='rental-card card'>
					<div className='card-body d-flex flex-column justify-content-center align-items-center align-content-center'>
						<h4 className='card-title'>Captains Hideaway</h4>
						<p className='card-text rental-description'>
							Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.
						</p>
						<div style={{ width: '35%' }}>
							<Link to='/captains_hideaway' className='info-booking-btn'>Info and Booking</Link>
						</div>
					</div>
					<Image rounded src={captainsHideawayCardImgPath} className='card-img-bottom w-100 d-block' height='100%' />
				</div>
				<div className='rental-card card'>
					<div className='card-body d-flex flex-column justify-content-center align-items-center align-content-center'>
						<h4 className='card-title'>Captains Hideaway</h4>
						<p className='card-text rental-description'>
							Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.
						</p>
						<div style={{ width: '35%' }}>
							<Link className='info-booking-btn'>Info and Booking</Link>
						</div>
					</div>
					<Image rounded src={captainsCottageCardImgPath} className='card-img-bottom w-100 d-block' height='100%' />
				</div>
			</section>
		</div>
	);
}

export default Home;
