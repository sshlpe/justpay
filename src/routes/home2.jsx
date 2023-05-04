import React from 'react';
import { useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
// ----- components ------
import Footer from './footer';
// ----- files -------
import '../styles/home2.css';
const logo = 'jp_logo.png';
const box = 'box.png';
const small_box = 'small-box.png'

export default function Home() {
	const navigate = useNavigate();
	const [entities, setEntities] = useState([]);
	const [checked, setChecked] = useState([]); // clicked buttonss
	const [send, setSend] = useState(''); // sended message

	useEffect(() => { //get the current entities and thier logos
	    const fetchData = async () => {
	      let url = process.env.REACT_APP_API_URL + 'entities';
	      const response = await fetch(url);
	      const jsonData = await response.json();
	      setEntities(Object.entries(jsonData));
	    };
	    fetchData();
	  }, []);

	const clicked = (id) => { // check or uncheck buttons
	    let button = document.getElementById(id);
	    if (button.clicked) {
	      button.clicked = false;
	      button.className = button.className.replace("selected", "");
	      let updatedList = checked.filter((i) => i !== id);
	      setChecked(updatedList);

	    } else {
	      button.clicked = true;
	      button.className += "selected";
	      let updatedList = [...checked, id]
	      setChecked(updatedList);
	    }
	  };

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
	  }

	return (
		<div className="container-h-0" >
			<div className="Home container-h-1">
				<div className="container-h-2">
					<img src={logo} alt="logo" className="h-logo-img" />
	        		<p className="h-logo-text"> Just Pay </p>
				</div>
				<p className="space"> </p>
				<div className="container-h-3">
					<div className="container-h-4">
						<h1 className="h-main-title-1"> Todos tus beneficios </h1>
	           			<h1 className="h-main-title-2"> en un solo lugar </h1>
	           			<p className="h-sub-title">
	          				Descubre los descuentos exclusivos que tus empresas tienen para ofrecerte
	          			</p>
	          			<div className="container-h-b-1">
				            {entities.map(([name, url]) => {
				              return (
				                <div>
				                  <button key={name} id={name} onClick={() => {clicked(name)}} className="">
				                    <img src={url} alt={name} />
				                  </button>
				                </div>
				                )
				            })}
				         </div>
				         <button onClick={() => {
				            if (checked.length !== 0){
				            	navigate(`/benefits/${checked.join()}`);
				            }
				          }} className="h-button-1"> 
				            Encuéntralos aquí
				        </button>
					</div>
					<div className="container-h-5">
						<picture>
						  <source media="(max-width: 768px)" srcset={small_box} />
						  <img src={box} alt="box" className="h-main-image" />
						</picture>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}










