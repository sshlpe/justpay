import React from 'react';
import {Link} from "react-router-dom";
import {FaHeart} from "react-icons/fa";

import '../../styles/hd-ft/footer.css';

export default function Footer() {
	return (
		<footer>
			<Link to="/credits" className="f-credits"> Creditos </Link>
			<p> by Munchkins - made with <FaHeart className="f-icon-1"/> </p>
	    </footer>
	)
}