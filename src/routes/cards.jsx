import React from 'react';
import '../styles/cards.css';

export default function Cards(section) {

	const slides = []

	if (section.list.length > 2) {
		const rows = 2;
		const sides = Math.ceil(section.list.length / rows);
		for (let i = 0; i < rows; i++) {
		  const start = i * sides;
		  const end = start + sides;
		  slides.push(section.list.slice(start, end));
		}
	} else {
		slides[0] = section.list;
	}

	return (
		<div>
			<p className="sup-title"> {section.title} </p>
			<div className="big-container">
			{slides.map((row) => {
				return(
					<div className="card-container">
						{row.map((elm) => {
			              return (
			                <div className="card-item">
								<p className="title"> {elm.title} </p>
								<p className="text"> {elm.text} </p>
								<a href={elm.url} target="_blank" className="link button-13 c-item" role="button" rel="noopener noreferrer">
									Ir a la pagina
								</a>
			                </div>
			              )
			            })}
			            <div>
			            	<p className="space"></p>
			            </div>
		            </div>
				)
			})}
			</div>
		</div>
	)
}