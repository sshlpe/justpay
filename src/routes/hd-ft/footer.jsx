import React from 'react';
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {FaHeart} from "react-icons/fa";

import '../../styles/hd-ft/footer.css';

export default function Footer() {
	const navigate = useNavigate();
	return (
		<footer>
			<Link to="/credits" className="f-credits"> Creditos </Link>
			<p> JustPay by Munchkins - made with
				<Link to="/admin" className="h"> <FaHeart className="f-icon-1"/> </Link>
			</p>
	    </footer>
	)
}