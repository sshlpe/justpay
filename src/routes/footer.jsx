import React from 'react';
import { useNavigate} from "react-router-dom";

import '../styles/footer.css';

export default function Footer() {
	const navigate = useNavigate();
	return (
		<footer className="f-container">
			<p> JustPay &copy; 2023 - Todos los derechos reservados
			  <a className="h" href=''  onClick={() => {
			  navigate('/admin')}}>. </a>
			</p>
	    </footer>
	)
}