import React from 'react';

import { Button, Image } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import PropertyCard from '../components/PropertyCard';

function Home() {
	const captainsHideaway = {
		title: 'Captains Hideaway',
		description: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.',
		urlEndpoint: '/captains_hideaway',
		imagePath: 'assets/img/stairs_from_beach_2.png',
	};

	const captainsCottage = {
		title: 'Captains Cottage',
		description: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.',
		utlEndpoint: '/captains_cottage',
		imagePath: 'assets/img/back_exterior_side_with_lake.png',
	};
	const captainsCottageCardImgPath = 'assets/img/back_exterior_side_with_lake.png';
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
				<PropertyCard property={captainsHideaway} />
				<PropertyCard property={captainsCottage} />
			</section>
		</div>
	);
}

export default Home;
