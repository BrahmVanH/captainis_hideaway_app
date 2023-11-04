import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';

import './style.css';

function AmenitiesModal(props) {
	
	const amenities = props.amenities;
	const ref= props.btnRef;
	const [isOpen, setIsOpen] = useState(false);

	const customStyles = {
		overlay: {
			position: 'sticky',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 1000,
		},
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			maxHeight: '50vh',
			overflowY: 'auto',
			WebkitOverflowScrolling: 'touch',
			transform: 'translate(-50%, -50%)',
		},
	};

	console.log(amenities);

	function openModal(event) {
		event.preventDefault()
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}
	return (
		<div>
			<Button className='open-modal-btn' ref={ref} onClick={((event) => openModal(event))}>See more...</Button>
			<Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Amenities Modal'>
				<h3>Amenities</h3>
				<div className='amenities-items-container'>
					{amenities.map((group) => (
						<div key={group.type}>
							<h4>{group.type}</h4>
							<div className='amenities-items'>
								{group.items.map((item) => (
									<p key={item}>{item}</p>
								))}
							</div>
						</div>
					))}
				</div>
				<div className='close-btn-container'>
					<Button onClick={closeModal}>Close</Button>
				</div>
			</Modal>
		</div>
	);
}

export default AmenitiesModal;
