import React, { Component } from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
		};
	}

	componentDidCatch(error, errorInfo) {
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			const notFoundImage = '../../assets/img/NotFoundImage.png';
			return (
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100vw', height: '100vh' }}>
					<img alt='australian shepherd dog in brush with lake in background' style={{ maxWidth: '25%', transform: 'translateX("-200px")' }} src={notFoundImage} />
					<h1>Error</h1>
					<h3>Our Bad</h3>
					<h5>Try refreshing the page or coming back later...</h5>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
