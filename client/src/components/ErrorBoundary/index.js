import React, { Component } from 'react';
import LogRocket from 'logrocket';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
		};
	}

	componentDidCatch(error, errorInfo) {
		LogRocket.captureException(error);
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return <p>...Oops.</p>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;