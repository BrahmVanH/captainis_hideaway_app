import React, { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';

import Contact from '../components/Contact';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './Contact.css';

function ContactPage() {
	const main = useRef();
	const smoother = useRef();

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

	return (
		<div ref={main} id='smooth-wrapper'>
			<div id='smooth-content'>
				<Navbar />
				<div className='contact-container'>
					<Contact />
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default ContactPage;
