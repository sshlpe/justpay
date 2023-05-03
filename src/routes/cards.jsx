import React from 'react';
import {useRef} from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import '../styles/cards.css';

export default function Cards(section) {

	const scrollerRef = useRef(null);

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

	const scrollHandler = () => {
		const scroller = scrollerRef.current;
		const id_left = section.title+"-arrowleft";
		const id_right = section.title+"-arrowright";

		if (scroller.scrollLeft === 0) {
			const arrow_left = document.getElementById(id_left);
			arrow_left.hidden = true;
			return
		}

	    if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth-1) {
		    const arrow_right = document.getElementById(id_right);
			arrow_right.hidden = true;
			return
		 }

		const arrow_left = document.getElementById(id_left);
		const arrow_right = document.getElementById(id_right);
		arrow_right.hidden = false;
		arrow_left.hidden = false;
	};

	return (
		<div>
			<p className="sup-title t-qsand"> {section.title} </p>
			<div className="large-container"> 
				<div id={section.title+"-arrowleft"} hidden={true} className="arr-block-left">
					<FaAngleLeft className="arrow left"/>
				</div>
				<div className="big-container" ref={scrollerRef} onScroll={scrollHandler}>
					{slides.map((row) => {
						return(
							<div className="card-container">
								{row.map((elm) => {
					              return (
					                <div className="card-item t-qsand">
										<p className="title"> {elm.title} </p>
										<p className="text"> {elm.text} </p>
										<a href={elm.url} target="_blank" className="link button-13 c-item" 
											role="button" rel="noopener noreferrer">
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
				<div id={section.title+"-arrowright"} className="arr-block-right">
					<FaAngleRight className="arrow right" />
				</div>
			</div>
		</div>
	)
}