import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import SlDialog from '@shoelace-style/shoelace/dist/react/dialog';
import _ from 'lodash';

import './style.css';

function AmenitiesModal(props) {
	const amenities = props.amenities;
	const ref = props.btnRef;
	const [open, setOpen] = useState(false);


	return (
		<div>
			<Button className='open-modal-btn' ref={ref} onClick={() => setOpen(true)}>
				See more...
			</Button>
			<SlDialog className='amenities-modal' open={open} onSlAfterHide={() => setOpen(false)} style={{overflowY: 'hidden'}}>
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
						<Button className='btn-dark btn-sm' onClick={() => setOpen(false)}>Close</Button>
					</div>
				</div>
			</SlDialog>
		</div>
	);
}

export default AmenitiesModal;
