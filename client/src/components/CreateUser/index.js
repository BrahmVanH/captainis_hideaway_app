import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';
import { CREATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import './style.css';

function CreateUser() {
	const [createUserFormData, setCreateUserFormData] = useState({
		firstName: '',
		lastName: '',
		username: '',
		userPassword: '',
		adminCode: '',
	});

	const [showAlert, setShowAlert] = useState(false);

	const [createUser] = useMutation(CREATE_USER);

	const resetLoginForm = () => {
		setCreateUserFormData({ firstName: '', lastName: '', username: '', userPassword: '', adminCode: '' });
	};
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCreateUserFormData({ ...createUserFormData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		if (!createUserFormData) {
			throw new Error('You must fill out all fields!');
		}

		try {
			const { data, loading, error } = await createUser({
				variables: {
					...createUserFormData,
				},
			});

			if (!loading && error) {
				resetLoginForm();
			} else if (!loading && data) {
				// Logs user in and stores token
				Auth.login(data.createUser.token);

				window.location.assign('/#/admin');
			}
		} catch (err) {
			setShowAlert(true);
		}
	};

	return (
		<div className='card col-lg-4 col-md-6 col-sm-11 signin-card' style={{ height: 'minContent' }}>
			<div className='signin-header-container'>
				<h3 className='text-center'>Create User</h3>
			</div>
			<Form className='signin-form d-flex'>
				<Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger' className='m-auto' style={{ width: '100%', fontSize: '.75rem', padding: '0.5rem', margin: '0.5rem' }}>
					There was an error
				</Alert>
				<div className='mb-3'>
					<Form.Group  required>
						<Form.Control autoComplete='first-name' onChange={handleInputChange} value={createUserFormData.firstName} type='name' name='firstName' placeholder='First Name' />
					</Form.Group>
				</div>
				<div className='mb-3'>
					<Form.Group required>
						<Form.Control autoComplete='last-name' onChange={handleInputChange} value={createUserFormData.lastName} type='name' name='lastName' placeholder='Last Name' />
					</Form.Group>
				</div>
				<div className='mb-3'>
					<Form.Group required>
						<Form.Control autoComplete='new-username' onChange={handleInputChange} value={createUserFormData.username} type='username' name='username' placeholder='Username' />
					</Form.Group>
				</div>

				<div className='mb-3'>
					<Form.Group required>
						<Form.Control autoComplete='new-password' onChange={handleInputChange} value={createUserFormData.userPassword} type='password' name='userPassword' placeholder='Password' />
					</Form.Group>
				</div>
				<div className='mb-3'>
					<Form.Group required>
						<Form.Control autoComplete='admin-code' onChange={handleInputChange} value={createUserFormData.adminCode} type='password' name='adminCode' placeholder='Admin Code' />
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

export default CreateUser;
