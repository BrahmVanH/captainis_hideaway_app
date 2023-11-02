import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

export const createScrollSmoother = (main, smoother) => {
	const ctx = gsap.context(() => {
		// create the smooth scroller FIRST!
		smoother.current = ScrollSmoother.create({
			smooth: 1, // seconds it takes to catch up to native scroll position
			effects: true, // look for data-speed and data-lag attrivutes on elements and animate accordingly
		});
	}, main);
	return () => ctx.revert();
};
