/*

import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const MySlider = ({name, value}) => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      rows: 2,
      slidesPerRow: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="slide">
        <h2> {name} </h2>
        <Slider {...settings}>
          {value.map((elm) => (
            <div className=""> 
              <div className="container">
                <div className="card card_content c-item">
                    <p className="card_title">{elm.title} </p>
                    <p className="card_text">{elm.text}</p>
                </div>
                <a href={elm.url} target="_blank" className="link button-13 c-item" role="button" rel="noopener noreferrer">
                    Ir a la pagina
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
};

export default MySlider;

*/