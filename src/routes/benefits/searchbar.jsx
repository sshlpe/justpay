import React from 'react';
import {useState, useEffect} from "react";
// ----------- Iconcs ----------- //
import {FaToggleOff, FaToggleOn} from "react-icons/fa";
import { BsPlusSquareFill } from "react-icons/bs";
import { BiSearchAlt, BiFilterAlt } from "react-icons/bi";

// ----------- Styles ----------- //
import '../../styles/benefits/searchbar.css';

export default function SearchBar ({selected, setfWord, today, setToday, fixed, setFixed, children}) {
	const [icons, setIcons] = useState([]);
	const [entities, setEntities] = useState([]);

	useEffect(() => {
    const fetchIcons = async () => {
    	let url = process.env.REACT_APP_API_URL + 'entities';
      const response = await fetch(url);
      const jsonData = await response.json();
      setEntities(Object.entries(jsonData));
      let elms = [];
      selected.split(',').map(key => {
	      elms.push(jsonData[key]);
	    });
      setIcons(elms);
    };
    fetchIcons();
  }, [selected]);

  useEffect(() => {
  	window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 100 ? setFixed('fixed') : setFixed('');
    }
  };

	const setCategoryButton = () => {
		if (window.innerWidth > 500 ) {
			return (
				<button className="sb-button-container">
					<p> Categorías </p>
					< BiFilterAlt />
				</button>
			);
		}
		return (
			<button className="sb-button-container">
					< BiFilterAlt />
			</button>
		);
	}

	return (
		<div className={`sb-container-1x2 sb-${fixed}`}>
			<div className="sb-container-icons" >
				< BsPlusSquareFill className="sb-plus-icon" onClick={() => {alert("cliked");}}/>
				<div className="sb-container-icons2" >
					{icons.map((url, index) => (
		          <img src={url} alt="Icono" key={index} className="sb-company-icon" />
		        ))}
				</div>
			</div>
			<div className="sb-container-2">
				<div className="sb-container-3" >
					<input type="text" placeholder="¿Qué buscas?" onChange={e => setfWord(e.target.value)} 
						className="sb-input-txt"/> 
					< BiSearchAlt />
				</div>
				<button onClick={()=> {setToday(!today)}} className="sb-button-container"> 
					hoy  {today ? ( <FaToggleOn className="sb-purpleicon" /> ) : (<FaToggleOff /> )}
					</button>
					{setCategoryButton()}
			</div>
		</div>
	)
}


