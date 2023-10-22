import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
	return (
		<div>
			<header class='text-center text-white masthead' style="background:url('assets/img/bg-masthead.jpg')no-repeat center center;background-size:cover;">
				<div class='overlay'></div>
				<div class='container'>
					<div class='row'>
						<div class='col-xl-9 mx-auto position-relative'>
							<h1 class='mb-5'>Welcome to Captains Rentals</h1>
						</div>
					</div>
				</div>
			</header>
			<section class='text-center bg-light d-flex flex-column justify-content-between align-items-center features-icons' style='padding: 1rem 0rem;'>
				<div class='card flex-row' style='width: 80%;margin: 1rem;'>
					<div class='card-body d-flex flex-column justify-content-center align-items-center align-content-center'>
						<h4 class='card-title'>Captains Hideaway</h4>
						<p class='card-text' style='width: 50%;'>
							Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.
						</p>
						<div style='background: var(--bs-emphasis-color);width: 35%;'>
							<a href='#' style='background: var(--bs-emphasis-color);color: var(--bs-body-bg);font-weight: bold;'>
								Info and Booking
							</a>
						</div>
					</div>
					<img class='card-img-bottom w-100 d-block' height='100%' />
				</div>
				<div class='card flex-row' style='width: 80%;margin: 1rem;'>
					<div class='card-body d-flex flex-column justify-content-center align-items-center align-content-center'>
						<h4 class='card-title'>Captains Hideaway</h4>
						<p class='card-text' style='width: 50%;'>
							Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.
						</p>
						<div style='background: var(--bs-emphasis-color);width: 35%;'>
							<a href='#' style='background: var(--bs-emphasis-color);color: var(--bs-body-bg);font-weight: bold;'>
								Info and Booking
							</a>
						</div>
					</div>
					<img class='card-img-bottom w-100 d-block' height='100%' />
				</div>
			</section>
			<section class='showcase'>
				<div class='container-fluid p-0'>
					<div class='row g-0'>
						<div class='col-lg-6 text-white showcase-img' style='background-image:url("assets/img/bg-showcase-2.jpg");'>
							<span></span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Home;