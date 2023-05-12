import React from 'react';
import { useState, useEffect} from "react";
// ----- components ------
import EntList from './ent-list';
// ----- files -------
import '../../styles/homepage/home.css';
const box = 'box.webp';
const small_box = 'small-box.webp'

export default function Home() {
	const [entities, setEntities] = useState([]);
	const [showEnts, setShowEnts] = useState(false); // entities popup

	useEffect(() => { //get the current entities and thier logos
	    const fetchData = async () => {
	    	let url = process.env.REACT_APP_API_URL + 'entities';
	    	const response = await fetch(url);
	    	const jsonData = await response.json();
	    	setEntities(Object.entries(jsonData));
	    };
	    fetchData();
	  }, []);

	// ----------- entities list pop up ------------
	const handleOpenContact = () => {
		setShowEnts(true);
	};

	const handleCloseContact = () => {
		setShowEnts(false);
	};

	return (
		<div className="Home container-h-1">
			<p className="space"> </p>
			<div className="container-h-3">
				<div className="container-h-4">
					<h1 className="h-main-title-1"> Todos tus beneficios </h1>
					<h1 className="h-main-title-2"> en un solo lugar </h1>
           			<p className="h-sub-title">
          				Descubre los descuentos exclusivos que tus empresas tienen para ofrecerte
          			</p>
			         <button onClick={() => {
			            handleOpenContact();
			          }} className="h-button-1"> 
			            Busca tus empresas
			        </button>
			        {showEnts && (
		    			<EntList entities={entities} onClose={handleCloseContact} />
				    )}
				</div>
				<div className="container-h-5">
					<picture>
					  <source media="(max-width: 700px)" srcSet={small_box} />
					  <img src={box} alt="box" className="h-main-image" />
					</picture>
				</div>
			</div>
		</div>
	);
}
