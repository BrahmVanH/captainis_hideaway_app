import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import SlDialog from '@shoelace-style/shoelace/dist/react/dialog';
import _ from 'lodash';

import './style.css';

function AmenitiesModal(props) {
	const amenities = props.amenities;
	// const setSetModalIsOpen = props.setSetModalIsOpen;
	const ref = props.btnRef;
	const modalRef = useRef();
	const [open, setOpen] = useState(false);

	const handleOpen = (event) => {
		event.preventDefault();

		setOpen(true);
		// setSetModalIsOpen(true);
	};

	const handleClose = (event) => {
		event.preventDefault();

		setOpen(false);
		// setSetModalIsOpen(false);
	};

	useEffect(() => {
		if (modalRef.current && open) {
			const baseElement = modalRef.current.shadowRoot.querySelector('[part="base"]');
			if (baseElement) {
				console.log("found baseElement")
				baseElement.style.zIndex = 10000;
				baseElement.style.transform = 'translateY(1ooopx)';
				baseElement.style.border = '2px solid #5f8fa5';
				baseElement.style.borderRadius = '6px';
			}
		}
	}, [open]);
	return (
		<div id='modal-wrapper'>
			<Button className='open-modal-btn' ref={ref} onClick={handleOpen}>
				See more...
			</Button>
			{open ? (
				<SlDialog ref={modalRef} className='amenities-modal' open={open} onSlAfterHide={handleClose} style={{ overflowY: 'hidden' }}>
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
							<Button className='btn-dark btn-sm' onClick={() => setOpen(false)}>
								Close
							</Button>
						</div>
					</div>
				</SlDialog>
			) : (
				<> </>
			)}
		</div>
	);
}

export default AmenitiesModal;
