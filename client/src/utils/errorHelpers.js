export const parseApolloError = (apolloError) => {
	if (!apolloError) {
		console.log('Error in parsing error object. Please refresh');
	}
	

	const { name, message: errorMessage, networkError, stack } = apolloError;
	const networkResponseUrl = networkError?.response?.url;
	const { name: networkErrorName, statusCode: networkErrorStatus } = networkError;
	const graphQLErrors = networkError?.result?.errors;
	console.log({ name, networkResponseUrl, errorMessage, networkErrorName, graphQLErrors, networkErrorStatus, stack });
	return { name, networkResponseUrl, errorMessage, networkErrorName, graphQLErrors, networkErrorStatus, stack };
};
