// This maps through an array of unavailableDate objects from the db and returns an array
// containing only the dateValue
export const getDateValues = (unavailableDates) => {
	let unavailableDateValues = [];
	unavailableDates.map((dateObject) => {
		unavailableDateValues.push(new Date(dateObject.dateValue));
	});

	return unavailableDateValues;
};
