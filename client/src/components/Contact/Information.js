import React from 'react';
import { Link } from 'react-router-dom';

import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { MdEmail, MdOutlinePhoneEnabled } from 'react-icons/md';

function ContactCard() {

	const linkIconColor = 'black';

	const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

	const onClickUrl = (url) => {
  return () => openInNewTab(url)
}

	return (
		<div className='d-flex'>
			<div>
				<ul
					style={{
						listStyleType: 'none',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
					}}>
					<li>
						<Link className='contact-information-link' onClick={onClickUrl('https://www.facebook.com/captainshideaway1')}>
							<FaFacebookF color={linkIconColor} size='14px' />
							<p>facebook/captainshideaway</p>
						</Link>
					</li>
					<li>
						<Link
							className='contact-information-link'
							onClick={(event) => {
								event.preventDefault();
								window.location.href = 'mailto:elysevanh@gmail.com';
							}}>
							<MdEmail color={linkIconColor} size='14px' />
							<p>ElyseVanH@gmail.com</p>
						</Link>
					</li>
					<li>
						<div className='contact-information-link'>
							<MdOutlinePhoneEnabled color={linkIconColor} size='14px' />
							<p>(248) 361- 5821</p>
						</div>
					</li>
					<li>
						<Link className='contact-information-link' onClick={onClickUrl('https://www.instagram.com/captainshideaway1/')}>
							<FaInstagram color={linkIconColor} size='14px' />
							<p>instagram/captainshideaway</p>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default ContactCard;
