import React from 'react';
import {useState, useEffect} from 'react';

import '../../styles/extras/admin.css';

export default function Admin() {
	const [admin_info, setAdmin] = useState({});
	const alt = true;

	const fetchData = async () => {
		let url = process.env.REACT_APP_API_URL + 'admin';
		const response = await fetch(url);
		const jsonData = await response.json();
		setAdmin(jsonData);
	};

	useEffect(() => {
		fetchData();
	},[alt]);

	const update = async () => {
		let url = process.env.REACT_APP_API_URL + 'update';
		await fetch(url);
		fetchData();
	};

	const deleteComment = async (id) => {
		let url = process.env.REACT_APP_API_URL + `comments/${id}`;
		await fetch(url, {
			method: "DELETE"
		});
		fetchData();
	}

	const deleteSubmit = async (id) => {
		let url = process.env.REACT_APP_API_URL + `submits/${id}`;
		await fetch(url, {
			method: "DELETE"
		});
		fetchData();
	}

	return (
		<div className="Admin t-qsand">
			<div className='container'>
				<h1> Centro de Control </h1>
				<div className='mid-container'>
					<h3> Base de Datos </h3>
					<div className="small-container">
						<p> última vez actualizado: <b> {admin_info['last-update']} </b> </p>
						<button onClick={() => {update()}}> 
							actualizar 
						</button>
					</div>
				</div>
				<div className='mid-container'>
					<h3>
						Solicitudes
						<p> {admin_info.submits ? Object.keys(admin_info.submits).length : '0'} </p> 
					</h3>
					<button onClick={() => deleteSubmit('-1')} className="mid-button">
						borrar todos
					</button>
					<div>
						<ul className="list">
						{admin_info.submits ? Object.keys(admin_info.submits).map((id) => {
							return (
							<div className="small-container small-box" key={'sub'+id}>
		    					<li> {admin_info.submits[id]} </li>
		    					<button onClick={() => deleteSubmit(id)}> borrar </button>
		    				</div>
		    				)
		    			}): "cargando..."}
						</ul>
					</div>
				</div>
				<div className='mid-container'>
					<h3> 
						Comentarios 
						<p> {admin_info.comments ? Object.keys(admin_info.comments).length : '0'} </p> 
					</h3>
					<button onClick={() => deleteComment('-1')} className="mid-button">
						borrar todos
					</button>
					<div>
						<ul className="list">
						{admin_info.comments ? Object.keys(admin_info.comments).map((id) => {
							return (
							<div className="small-container small-box" key={'com'+id}>
		    					<li> {admin_info.comments[id]} </li>
		    					<button onClick={() => deleteComment(id)}> borrar </button>
		    				</div>
		    				)
		    			}): "cargando..."}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}