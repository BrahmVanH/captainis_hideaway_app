import _ from 'lodash';

// This maps through an array of unavailableDate objects from the db and returns an array
// containing only the dateValue
export const getDateValues = (unavailableDates) => {
	let unavailableDateValues = [];
	unavailableDates.map((dateObject) => {
		unavailableDateValues.push(new Date(dateObject.dateValue));
	});

	return unavailableDateValues;
};

// Helper function to check if two dates are the same day
export const isSameDay = (date1, date2) => {
	return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
};

export const getItemsElement = (itemsArray) => {
	let itemsElement;
	if (itemsArray.length > 8) {
		const chunkedArray = _.isArray(itemsArray, 4);

		itemsElement = (
			<div className='list-items-columns'>
				{chunkedArray.map((list) => {
					return (
						<ul className='amenities-list' key={list}>
							{list.map((item) => {
								return (
									<li className='amenities-item' key={item}>
										{item}
									</li>
								);
							})}
						</ul>
					);
				})}
			</div>
		);
	} else {
		itemsElement = (
			<ul className='amenities-list'>
				{itemsArray.map((item) => {
					return (
						<li className='amenities-item' key={item}>
							{item}
						</li>
					);
				})}
			</ul>
		);
	}

	return itemsElement;
};

export const isLocalEnvironment = () => {
	if (window.location.hostname === 'localhost') {
		return true;
	} else if (process.env.NODE_ENV === 'production') {
		return true;
	}
};

export const isElementInViewport = (el) => {
	console.log('checking if element is in viewport');
	const rect = el.getBoundingClientRect();
	return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};
