import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";

// -------------- files -------------
import "../../styles/hd-ft/contact.css";
const display_image = 'images/image1.PNG';
const display_image_small = 'images/image1-small.png';

export default function Contact ({onClose, children}) {
	const [visible, setVisible] = useState(true);
	const [send, setSend] = useState(''); // sended message

	const handleClose = () => {
		setVisible(false);
		if (onClose) {
			onClose();
		}
	};

	if (!visible) {
		return null;
	}

	const sendSubmit = async () => { // send user submit
	    let text = document.getElementById('submit-input').value;
	    if (text) {
	      const data = {'submit': text};
	      const url = process.env.REACT_APP_API_URL + 'submits';
	      await fetch(url, {
	        method: 'PATCH',
	        headers: {
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(data)
	      });
	      setSend('Se envio tu solicitud');
	      document.getElementById('submit-input').value = '';
	    }
	};

	const sendComment = async () => { // send user comment
	    let text = document.getElementById('comment-input').value;
	    if (text) {
	      const data = {'comment': text};
	      const url = process.env.REACT_APP_API_URL + 'comments';
	      await fetch(url, {
	        method: 'PATCH',
	        headers: {
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(data)
	      });
	      setSend('Se envio tu comentario');
	      document.getElementById('comment-input').value = '';
	    }
	};

	return (
		<div className="ct-overlay">
	      <div className="ct-body">
	        <button className="ct-close" onClick={handleClose}> <IoClose/> </button>
	        <div className="ct-content">
	        	<p className=""> {send} </p>
	      		<div className="ct-container-1">
	      			<picture>
	        			<source media="(max-width: 700px)" srcset={display_image_small} />
	        			<img src={display_image} className="ct-image-1" />
					</picture>
	      			<div className="ct-container-2">
						<div className="ct-container-3">
							<div className="ct-container-4">
								<h4 className="ct-title-1"> Falta alguna empresa? </h4>
								<h4 className="ct-title-2"> Solicita algunas </h4>
							</div>
							<div className="ct-container-4">
								<input type="text" id="submit-input"  className="ct-input-1" />
								<button onClick={() => {sendSubmit()}} className="ct-button-input"> enviar </button>
							</div>
						</div>
						<div className="ct-container-3">
							<div className="ct-container-4">
								<h4 className="ct-title-1"> Danos tu opinion! </h4>
								<h4 className="ct-title-2"> Deja un comentario </h4>
							</div>
							<div className="ct-container-4">
								<input type="text" id="comment-input" className="ct-input-1" />
								<button onClick={() => {sendComment()}} className="ct-button-input"> enviar </button>
							</div>
						</div>
	      			</div>
				</div>
	        </div>
	      </div>
	    </div>
  );
}