import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Form, Button, Alert } from 'react-bootstrap';

function ContactForm() {
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);
	const [showErrorAlert, setShowErrorAlert] = useState(false);

	const serviceId = 'service_lnxjo09';
	const templateId = 'template_enw06at';
	const publicKey = 'bh-E7v3RsFhe1yJ5-';

	const handleFormSubmit = (event) => {
		event.preventDefault();

		emailjs.sendForm(serviceId, templateId, event.target, publicKey).then(
			(result) => {
				if (result) {
					setShowSuccessAlert();
				}
			},
			(error) => {
				if (error) {
					setShowErrorAlert(true);
				}
			}
		);

		event.target.reset();
	};

	return (
		<div className='contact-form-container'>
			<Form onSubmit={handleFormSubmit} className='contact-form d-flex'>
				<Alert
					dismissible
					onClose={() => setShowSuccessAlert(false)}
					show={showSuccessAlert}
					variant='success'
					className='m-auto'
					style={{ width: '100%', fontSize: '.75rem', padding: '0.5rem', margin: '0.5rem' }}>
					Sent!
				</Alert>
				<Alert
					dismissible
					onClose={() => setShowErrorAlert(false)}
					show={showErrorAlert}
					variant='danger'
					className='m-auto'
					style={{ width: '100%', fontSize: '.75rem', padding: '0.5rem', margin: '0.5rem' }}>
					There was an issue sending your message. Please refresh and try again.
				</Alert>
				<div className='mb-3'>
					<Form.Group controlId='formBasicName' required>
						<Form.Control type='name' name='from_name' placeholder='Name' />
					</Form.Group>
				</div>
				<div className='mb-3'>
					<Form.Group controlId='formBasicEmail' required>
						<Form.Control type='email' name='from_email' placeholder='Email Address' />
					</Form.Group>
				</div>
				<div className='mb-3'>
					<Form.Group controlId='basicTextArea' required>
						<Form.Control as='textarea' rows={4} placeholder='Your message here' name='message' />
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

export default ContactForm;
