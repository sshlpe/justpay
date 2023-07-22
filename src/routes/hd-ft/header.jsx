import React from 'react';
import {Link} from "react-router-dom";
import {useState} from "react";
// ------------- components ------------
import Contact from "./contact"

import '../../styles/hd-ft/header.css';
const logo = 'jp_logo.webp';

export default function Admin() {
	const [showContact, setShowContact] = useState(false); // contact popup

	// ----------- contact pop up ------------
	const handleOpenContact = () => {
	    setShowContact(true);
	};

	const handleCloseContact = () => {
		setShowContact(false);
	};
	
	return (
		<div className="container-hd-1">
			<Link to="/" className="container-hd-2">
				<img src={logo} alt="logo" className="hd-logo-img" />
				<div className="hd-logo-text-container">
					<p className="hd-logo-text" translate="no"> Just </p> 
					<p className="hd-logo-text-purple" translate="no"> Pay </p>
				</div>
			</Link>
    		<button className="hd-contact-button" onClick={handleOpenContact}> 
    			Contáctanos!
    		</button>
    		{showContact && (
    			<Contact onClose={handleCloseContact} />
		    )}
		</div>
	)
}