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
			<h2 className="cd-title-1" > {section.title} </h2>
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