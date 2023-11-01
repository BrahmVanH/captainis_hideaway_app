import React from 'react';

import { Button, Image } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import PropertyCard from '../components/PropertyCard';
// import test_image from '../assets/img/side_patio.avif';

function Home() {
	const captainsHideaway = {
		title: 'Captains Hideaway',
		description:
			"This 4 bedroom, 3 full bath home overlooking spectacular Lake Superior is every vacationer's dream. Spend your days hunting for agates on the beaches of Lake Superior, beach access is simply a few steps away from the back porch. If relaxing indoors is more your speed, spend the day lounging in the 4 season room that overlooks miles and miles of unobstructed views of Lake Superior.",
		urlEndpoint: '/captains_hideaway',
		imagePath: 'assets/img/stairs_from_beach_2.png',
	};

	const captainsCottage = {
		title: 'Captains Cottage',
		description: '3 acres of private Lake Superior beach front! Located on the North Country Trail. Muskallonge Lake located directly behind the property for great fishing, hiking or kayaking. ',
		urlEndpoint: '/captains_cottage',
		imagePath: 'assets/img/back_exterior_side_with_lake.png',
	};
	return (
		<div>
			<header className='home-header text-center text-white masthead'>
				<div className='overlay'>
					<div className='container welcome-message-container'>
						<div className='row'>
							<div className='col-xl-9 mx-auto position-relative'>
								<h1>Welcome To Michigan's Upper Peninsula</h1>
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
