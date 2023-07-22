import React from 'react';
import {useRef} from 'react';
// ------- Elements ----------
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// ------- Styles ----------
import '../../styles/benefits/cards.css';

function sleep(s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}

export default function Cards(section) {

	console.log(section.icon);

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

		if (scroller.scrollLeft <= 0) {
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

	const scrollLeft = async () => {
		if (scrollerRef.current) {
			for (let i of Array(10).keys()) {
				if (window.innerWidth > 500) {
					scrollerRef.current.scrollLeft -= 50;
				} else {
					scrollerRef.current.scrollLeft -= 25;
				}
				await sleep(0.01);
			}
		}
	}

	const scrollRight = async () => {
		if (scrollerRef.current) {
			for (let i of Array(10).keys()) {
				if (window.innerWidth > 500) {
					scrollerRef.current.scrollLeft += 50;
				} else {
					scrollerRef.current.scrollLeft += 25;
				}
				await sleep(0.01);
			}
		}
	}

	return (
		<div className="cd-container-1">
			<div className="cd-container-1x2" >
				<img src={section.icon} alt="Icono" key={'a'} className="sb-company-icon" />
				<h2 className="cd-title-1" > {section.title} : {section.list.length} </h2>
			</div>
			<div className="cd-container-2">
				<div id={section.title+"-arrowleft"} hidden={true} className="cd-arrow" onClick={scrollLeft} >
					<FaAngleLeft className="arrow left"/>
				</div>
				<div className="cd-container-3" ref={scrollerRef} onScroll={scrollHandler}>
					{slides.map((row, rowIndex) => {
						return (
							<div className="cd-container-4">
								{row.map((elm, elmIndex) => {
									return (
										<div className="cd-item-container-1">
											<div className="cd-item-container-2">
												{(elm.image) ? ( 
														<div className="cd-item-img">
														  <img src={elm.image} alt="benefit image" />
														  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
														    <path fill="#f7f7f7" fillOpacity="1" 
															  	d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,176C672,160,768,128,864,128C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
															  </path>
														  </svg>
														</div>
													):(
														<div className="cd-item-img">
														  <p className="cd-item-noimg"> </p>
														  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
														    <path fill="#f7f7f7" fillOpacity="1" 
															  	d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,176C672,160,768,128,864,128C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
															  </path>
														  </svg>
														</div>
													)
												}
												<h3 className="cd-item-title"> {elm.title} </h3>
												<p className="cd-item-info"> {elm.text} </p>
												<a href={elm.url} target="_blank" className="cd-item-link" 
													role="button" rel="noopener noreferrer">
													más información
												</a>
											</div>
											<div className="cd-item-container-days">
												{elm.days.map((elm, elmIndex) => {
													return(
														<div className="cd-item-days" key={`c-d-${elmIndex}`}>
															{(elm == 'no info' ? elm : elm.slice(0,2))}
														</div>
													)
												})}
										</div>
									</div>
									)
								})}
							</div>
						)
					})}
				</div>
				<div id={section.title+"-arrowright"} className="cd-arrow" onClick={scrollRight} >
					<FaAngleRight className="arrow right" />
				</div>
			</div>
		</div>
	);
}