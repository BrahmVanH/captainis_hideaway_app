import React from 'react';
import emailjs from '@emailjs/browser';
import { Form, Button } from 'react-bootstrap';


function SigninForm() {
	

	return (
		<div className='contact-form-container'>
			<h3 className='contact-header-text text-center mb-4'>Sign In</h3>
			<Form className='contact-form d-flex'>
				<div className='mb-3'>
					<Form.Group controlId='formBasicUsername' required>
						<Form.Control type='username' name='username' placeholder='Username' />
					</Form.Group>
				</div>
				<div className='mb-3'>
					<Form.Group controlId='formBasicPassword' required>
						<Form.Control type='password' name='password' placeholder='Password' />
					</Form.Group>
				</div>
				<div>
					<Button className='btn btn-dark d-block w-100' type='submit'>
						Send
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default SigninForm;
