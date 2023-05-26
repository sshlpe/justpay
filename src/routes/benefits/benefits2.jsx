import React from 'react';
import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
// ----------- Iconcs ----------- //
import {FaToggleOff, FaToggleOn} from "react-icons/fa";
import { BsPlusSquareFill } from "react-icons/bs";
import { BiSearchAlt, BiFilterAlt } from "react-icons/bi";
// ----------- Elements ----------- //
import Cards from './cards';
// ----------- Styles ----------- //
import '../../styles/benefits/benefits.css';

const getDate = () => {
  const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  const fecha = new Date();
  return dias[fecha.getDay()];
};

export default function DiscountPage () {
	const navigate = useNavigate();
	const {selected} = useParams(); // companies selected
	const [icons, setIcons] = useState([]) ; // icons of selected companies

	const [data, setData] = useState([]);
	const [fdata, setfData] = useState([]);
	const [fword, setfWord] = useState('');
  const [today, setToday] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fixed, setFixed] = useState("");

  useEffect(() => {
		const fetchData = async () => {
			let url = process.env.REACT_APP_API_URL + `discounts/${selected}`;
			setLoading(true);
			const response = await fetch(url);
			const jsonData = await response.json();
			setData(jsonData);
			setfData(jsonData);
			setLoading(false);
		};
		fetchData();
	}, [selected]);

	useEffect(() => {
		const wordLower = fword.toLowerCase();
		const filter_data = {};
		for (let ent in data) {
			let pre_filt_data = data[ent].filter(elm => {
		    	let lower_title = elm.title.toLowerCase();
		    	let lower_text = elm.text.toLowerCase();
		    	if (!today) {
					return lower_title.includes(wordLower) || lower_text.includes(wordLower);
		    	}
				let day = getDate();
				return (
					(lower_title.includes(wordLower) || lower_text.includes(wordLower)) &&
					(elm.days.includes('no info') || elm.days.includes(day))
				);
			});
			if (pre_filt_data.length > 0) {
				filter_data[ent] = pre_filt_data;
			}
		}
		setfData(filter_data);
	}, [fword, today]);

	useEffect(() => {
    const fetchIcons = async () => {
    	let url = process.env.REACT_APP_API_URL + 'entities';
      const response = await fetch(url);
      const jsonData = await response.json();
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
				<button className="bf-button-container">
					<p> Categorías </p>
					< BiFilterAlt />
				</button>
			);
		}
		return (
			<button className="bf-button-container">
					< BiFilterAlt />
			</button>
		);
	}

	return (
		<div className="bf-container-1" >
			<h1 className="bf-main-title"> Tus Empresas ofrecen los siguientes beneficios </h1>
			<div className={`bf-container-1x2 ${fixed}`}>
			<div className="bf-container-icons" >
				< BsPlusSquareFill className="bf-plus-icon" />
				<div className="bf-container-icons2" >
					{icons.map((url, index) => (
		          <img src={url} alt="Icono" key={index} className="bf-company-icon" />
		        ))}
				</div>
			</div>
				<div className="bf-container-2">
					<div className="bf-container-3" >
						<input type="text" placeholder="¿Qué buscas?" onChange={e => setfWord(e.target.value)} 
							className="bf-input-txt"/> 
						< BiSearchAlt />
					</div>
					<button onClick={()=> {setToday(!today)}} className="bf-button-container"> 
						hoy  {today ? ( <FaToggleOn className="bf-purpleicon" /> ) : (<FaToggleOff /> )}
						</button>
						{setCategoryButton()}
				</div>
			</div>
			{(fixed == "fixed") ? (
				<div className="bf-space-fix"> </div>
				) : (
				<div> </div>
				)}
			{loading ? (
				<div className="bf-container-4">
					<svg viewBox="0 0 50 50" className="bf-loarder">
						<circle className="bf-loader-ring" cx="25" cy="25" r="20"></circle>
						<circle className="bf-loader-ball" cx="25" cy="5" r="3.5"></circle>
					</svg>
				</div> 
				) : (
				<div className="bf-container-5">
					{Object.entries(fdata).map(([key, list]) => {
						return(
							<Cards title={key} list={list} key={`c-${key}`}/>
						)
					})}
				</div>
			)}
			<button onClick={() => {navigate('/')}}> 
				Volver
			</button>
		</div>
	)
}


