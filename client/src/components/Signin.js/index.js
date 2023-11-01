import React, {useState, useEffect} from 'react';
import {useMutation } from '@apollo/client';
import emailjs from '@emailjs/browser';
import { Form, Button } from 'react-bootstrap';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import './style.css';


function SigninForm() {
	const [loginFormData, setLoginFormData] = useState({
		username: '',
		userPassword: '',
	});

	const [validated] = useState(false);

	const [showAlert, setShowAlert] = useState(false);

	const [loginUser] = useMutation(LOGIN_USER);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setLoginFormData({ ...loginFormData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		if (!loginFormData) {
			throw new Error('You must fill out all fields!');
		}

		try {
			const { data } = await loginUser({
				variables: {
					...loginFormData,
				},
			});
			// Logs user in and stores token
			Auth.login(data.loginUser.token);

			window.location.assign('/admin');
		} catch (err) {
			console.error(err);
			setShowAlert(true);
		}
	};

	return (
		<div className='card col-lg-4 col-md-6 col-sm-11 signin-card' style={{height: 'minContent'}}>
			<h3 className='signin-header-text text-center mb-4'>Sign In</h3>
			<Form className='signin-form d-flex'>
				<div className='mb-3'>
					<Form.Group controlId='formBasicUsername' required>
						<Form.Control onChange={handleInputChange} value={loginFormData.username} type='username' name='username' placeholder='Username' />
					</Form.Group>
				</div>
				<div className='mb-3'>
					<Form.Group controlId='formBasicPassword' required>
						<Form.Control onChange={handleInputChange} value={loginFormData.userPassword} type='password' name='userPassword' placeholder='Password' />
					</Form.Group>
				</div>
				<div>
					<Button onClick={handleFormSubmit} className='btn btn-dark d-block w-100' type='submit'>
						Sign In
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default SigninForm;
