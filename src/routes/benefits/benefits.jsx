import React from 'react';
import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
// ----------- Elements ----------- //
import Cards from './cards';
import SearchBar from './searchbar';
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

	const [data, setData] = useState([]); // all data from selected companies
	const [fdata, setfData] = useState([]); // filtered data
	const [fword, setfWord] = useState(''); // filter word
  const [today, setToday] = useState(false); // today? filter
  const [loading, setLoading] = useState(false); // loading animation
  const [fixed, setFixed] = useState(""); // fixed search bar
 
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

	return (
		<div className="bf-container-1" >
			<h1 className="bf-main-title"> Tus Empresas ofrecen los siguientes beneficios </h1>
			<SearchBar selected={selected} setfWord={setfWord} today={today} 
								setToday={setToday} fixed={fixed} setFixed={setFixed} />
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


