import React from 'react';
import {Link} from "react-router-dom";

import '../../styles/hd-ft/header.css';
const logo = 'jp_logo.png';

export default function Admin() {
	
	return (
		<div className="container-hd-1">
			<Link to="/" className="container-hd-2">
				<img src={logo} alt="logo" className="hd-logo-img" />
				<p className="hd-logo-text" translate="no"> Just Pay </p>
			</Link>
    		<button className="hd-contact-button"> Dejanos un Comentario! </button>
		</div>
	)
}