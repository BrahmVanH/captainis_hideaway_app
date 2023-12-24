import gsap from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';

export const createScrollSmoother = (main, smoother) => {
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

	const ctx = gsap.context(() => {
		// create the smooth scroller FIRST!
		smoother.current = ScrollSmoother.create({
			smooth: 1, // seconds it takes to catch up to native scroll position
			effects: true, // look for data-speed and data-lag attrivutes on elements and animate accordingly
		});
	}, main);
	return () => ctx.revert();
};
