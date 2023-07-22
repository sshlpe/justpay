import React, {useState, useEffect} from 'react';
import {IoClose} from "react-icons/io5";
import {BsCircle, BsCheckCircle} from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";
import {useNavigate} from "react-router-dom";

// -------------- files -------------------
import "../../styles/homepage/ent-list.css";
const display_image = 'images/image2.webp';
const display_image_small = 'images/image2-small.webp';

export default function EntList ({entities, onClose, children}) { // pop list of entities
	const [visible, setVisible] = useState(true);
	const [checked, setChecked] = useState([]); // clicked buttons
	const [checkedIcons, setcheckedIcons] = useState([]); 
	const [icons, setIcons] = useState({}); // icons check and uncheck
	const navigate = useNavigate();
	const [filter, setFilter] = useState("");
	const [fentities, setFentities] = useState(entities);

	useEffect(() => {
		let fdata = entities.filter(elm => {
			return elm[0].toLowerCase().includes(filter.toLowerCase());
		})
		setFentities(fdata);
	}, [filter, entities]);

	const handleClose = () => {
		setVisible(false);
		if (onClose) {
			onClose();
		}
	};

	if (!visible) {
		return null;
	}
	const clickedButton = (id, url) => { // check or uncheck buttons
		let button = document.getElementById(id);
		if (button.clicked) {
			button.clicked = false;
			let updatedList = checked.filter((i) => i !== id);
			let updatedIconList = checkedIcons.filter((i) => i !== url);
			setChecked(updatedList);
			setcheckedIcons(updatedIconList);

		} else {
			button.clicked = true;
			let updatedList = [...checked, id];
			let updatedIconList = [...checkedIcons, url];
			setChecked(updatedList);
			setcheckedIcons(updatedIconList);
		}

		setIcons((prevIcons) => ({
			...prevIcons,
			[id]: prevIcons[id] === 'checkCircle' ? 'circle' : 'checkCircle',
		}));
	};

	const clickedIcon = async (id) => {
		let updatedList = [...checked]; // get lists
		let updatedIconList = [...checkedIcons];

		updatedIconList.splice(id, 1); // remove elements
		let button_id = updatedList.splice(id, 1)[0];

		let button = document.getElementById(button_id);// update button state
		button.clicked = false;

		setIcons((prevIcons) => ({ // update icons
			...prevIcons,
			[button_id]: prevIcons[button_id] === 'checkCircle' ? 'circle' : 'checkCircle',
		}));

		setChecked(updatedList);
		setcheckedIcons(updatedIconList);
	};

	const handlerRedirect = () => {
		navigate(`/benefits/${checked.join()}`);
	}

	return (
		<div className="ent-overlay">
	      <div className="ent-body">
	        <button className="ent-close" onClick={handleClose}> <IoClose/> </button>
	        <div className="ent-content">
	        	<div className="ent-container-1">
	        		<div className="ent-container-2">
	        			{checkedIcons.map((url, iconIndex) => {
	        				return (
	        					<div className="ent-container-2x1" key={`s-${url}`} 
	        						onClick={() => {clickedIcon(iconIndex)}} >
	        						<img src={url} className="ent-img-2" alt='selected'/>
	        						<IoMdCloseCircle className="ent-img2-icon" />
	        					</div>
	        				);
	        			})}
	        		</div>
	        		<div className="ent-container-2x2">
	        			<div className="ent-container-2x3">
		        			<picture>
		        				<source media="(max-width: 700px)" srcSet={display_image_small} />
		        				<img src={display_image} className="ent-img-3" alt=''/>
							</picture>
		        			<h3 className="ent-title"> Elige tus empresas </h3>
		        		</div>
		        		<div className="ent-filter">
	        				<input className="ent-filter-input" placeholder="Buscar" onChange={e => setFilter(e.target.value)}/>
	        				< BiSearchAlt className="ent-filter-icon" />
	        			</div>
	        		</div>
	        		<div className="ent-container-3">
	        			{fentities.map(([name, url]) => {
							return (
								<button key={`l-${name}`} id={name} onClick={() => {clickedButton(name, url)}} 
									className="ent-container-4">
									<div className="ent-container-5">
										<img src={url} alt={name} className="ent-img-1"/>
										<p className="test"> {name} </p>
									</div>
									{icons[name] === 'checkCircle' ? ( <BsCheckCircle className="ent-check-icon" /> ) 
									: (<BsCircle className="" /> )}
								</button>
							);
						})}
	        		</div>
	        		<button onClick={handlerRedirect} 

	        		className="ent-button-1" id="ent-b-1" disabled={checked.length === 0} > 
			            Ver promociones
			        </button>
	        	</div>
	        </div>
	      </div>
	    </div>
	);
}


