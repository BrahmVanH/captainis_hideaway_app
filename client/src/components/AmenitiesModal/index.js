import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';

import "./style.css";

function AmenitiesModal(amenitiesArray) {
	const [isOpen, setIsOpen] = useState(false);

	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}
	return (
		<div>
			<Button onClick={openModal}>See more...</Button>
			<Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Amenities Modal'>
				<h3>Amenities</h3>
				<div className='amenities-items-container'>
					{amenitiesArray.map((amenityType) => {
            
          })}
				</div>
        <div className='close-btn-container'>
          <Button onClick={closeModal}>Close</Button>
        </div>
			</Modal>
		</div>
	);
}

export default AmenitiesModal;
