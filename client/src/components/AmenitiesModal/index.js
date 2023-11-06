import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import _ from 'lodash';

import './style.css';

function AmenitiesModal(props) {
	const amenities = props.amenities;
	const ref = props.btnRef;
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
			width: '50%',
			borderRadius: '6px',
			marginRight: '-50%',
			maxHeight: '50vh',
			overflowY: 'auto',
			WebkitOverflowScrolling: 'touch',
			transform: 'translate(-50%, -50%)',
			borderBottom: '3px solid transparent',
			borderImageSource: 'linear-gradient(to right, white, #abccd8, #5f8fa5, #abccd8, white)',
			borderImageSlice: '1',
			borderImageOutset: '0',
			borderImageRepeat: 'stretch',
		},
	};


	function openModal(event) {
		event.preventDefault();
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}
	return (
		<div>
			<Button className='open-modal-btn' ref={ref} onClick={(event) => openModal(event)}>
				See more...
			</Button>
			<Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Amenities Modal'>
				<div className='amenities-modal-inner-container d-flex flex-column align-items-center'>
					<h3>Amenities</h3>
					<div className='amenities-items-container d-flex flex-column align-items-center'>
						{amenities.map((group) => (
							<div className='amenities-section' key={group.type}>
								<h4>{group.type}</h4>
								<div className='amenities-items'>
									{group.items.length > 8 ? (
										<div className='amenities-item-columns'>
											{_.chunk(group.items, 8).map((list) => (
												<ul className='amenities-list' key={list}>
													{list.map((item) => {
														return (
															<li className='amenities-list-item' key={item}>
																{item}
															</li>
														);
													})}
												</ul>
											))}
										</div>
									) : (
										<ul className='amenities-list'>
											{group.items.map((item) => {
												return (
													<li className='amenities-list-item' key={item}>
														{item}
													</li>
												);
											})}
										</ul>
									)}
								</div>
							</div>
						))}
					</div>
					<div className='close-btn-container'>
						<Button onClick={closeModal}>Close</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default AmenitiesModal;
