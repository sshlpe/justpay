import React from 'react';
import { useState, useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";
import Cards from './cards';

import '../styles/bef.css';

export default function DscPage() {

  const {selected} = useParams();
  const [data, setData] = useState([]);
  const [cdata, setcData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let url = process.env.REACT_APP_API_URL + `discounts/${selected}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
      setcData(jsonData);
    };
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    filtrar(event.target.value);
  };

  const filtrar = (word) => {
    const wordLower = word.toLowerCase();
    let new_dict = Object.keys(data).reduce((acc, key) => {
      const filtered = data[key].filter(({title, text }) => {
          if (title) {
            title = title.toLowerCase();
          }
          if (text) {
            text = text.toLowerCase();
          }
          
          return title.includes(wordLower) || text.includes(wordLower);
        });
      
      if (filtered.length > 0) {
        acc[key] = filtered;
      }
    
      return acc;
    }, {});
    setcData(new_dict);

  };

  return (
    <div className="DscPage">
      <div className="container">
        <h1> Tienes los Siguentes Descuentos </h1>
        <input type="text" placeholder="Filtrar descuentos" onChange={handleInputChange} className="input-txt"/>
      </div>
      <div>
      {Object.entries(cdata).map(([key, list]) => {
        return(
          <div>
            <Cards title={key} list={list} />
          </div>
        )
      })}
      </div>
      <div className="container">
        <button onClick={() => {navigate('/')}}> 
          Volver
        </button>
      </div>
    </div>
  );
}