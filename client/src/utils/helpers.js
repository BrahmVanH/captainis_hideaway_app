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
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };
