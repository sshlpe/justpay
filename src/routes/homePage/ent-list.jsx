import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { BsCircle, BsCheckCircle } from "react-icons/bs";
import { useNavigate, Link} from "react-router-dom";

// -------------- files -------------
import "../../styles/homepage/ent-list.css";
const display_image = 'images/image2.PNG';

export default function EntList ({entities, onClose, children}) { // pop list of entities
	const [visible, setVisible] = useState(true);
	const [checked, setChecked] = useState([]); // clicked buttons
	const [checkedImages, setcheckedImages] = useState([]); 
	const [icons, setIcons] = useState({}); // icons fot check and uncheck
	const navigate = useNavigate();

	const handleClose = () => {
		setVisible(false);
		if (onClose) {
			onClose();
		}
	};

	if (!visible) {
		return null;
	}
	const clicked = (id, url) => { // check or uncheck buttons
	    let button = document.getElementById(id);
	    if (button.clicked) {
	    	button.clicked = false;
	    	let updatedList = checked.filter((i) => i !== id);
	    	let updatedImagesList = checkedImages.filter((i) => i !== url);
	    	setChecked(updatedList);
	    	setcheckedImages(updatedImagesList);

	    } else {
	    	button.clicked = true;
	    	let updatedList = [...checked, id];
	    	let updatedImagesList = [...checkedImages, url];
	    	setChecked(updatedList);
	    	setcheckedImages(updatedImagesList);
	    }

	    setIcons((prevIcons) => ({
	        ...prevIcons,
	        [id]: prevIcons[id] === 'checkCircle' ? 'circle' : 'checkCircle',
	    }));
	};

	return (
		<div className="ent-overlay">
	      <div className="ent-body">
	        <button className="ent-close" onClick={handleClose}> <IoClose/> </button>
	        <div className="ent-content">
	        	<div className="ent-container-1">
	        		<div className="ent-container-2">
	        			{checkedImages.map((url) => {
	        				return(
	        					<img src={url} className="ent-img-2" />
	        				);
	        			})}
	        		</div>
	        		<div className="ent-container-5">
	        			<img src={display_image} className="ent-img-3" />
	        			<h3> Elige tus empresas </h3>
	        		</div>
	        		<div className="ent-container-3">
	        			{entities.map(([name, url]) => {
							return (
								<div>
									<button key={name} id={name} onClick={() => {clicked(name, url)}} className="ent-container-4">
										<div className="ent-container-5">
											<img src={url} alt={name} className="ent-img-1" />
											<p className="test"> {name} </p>
										</div>
										{icons[name] === 'checkCircle' ? (
						                    <BsCheckCircle className="ent-check-icon" />
						                ) : (
						                    <BsCircle className="" />
						                )}
									</button>
								</div>
							);
						})}
	        		</div>
	        		<button onClick={() => {
			            if (checked.length !== 0){
							navigate(`/benefits/${checked.join()}`);
			            }
			          }} className=""> 
			            Encuéntralos aquí
			        </button>
	        	</div>
	        </div>
	      </div>
	    </div>
	);
}


