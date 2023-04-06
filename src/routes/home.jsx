import React from 'react';
import { useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";

import '../styles/home.css';

export default function Home() {
  const navigate = useNavigate();
  const [entities, setEntities] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let url = process.env.REACT_APP_API_URL + 'entities';
      const response = await fetch(url);
      const jsonData = await response.json();
      setEntities(Object.entries(jsonData));
    };

    fetchData();
  }, []);

  const clicked = (id) => {
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

  return (
    <div className="Home">
      <div className="container">
        <h1> Elige tus Empresas: </h1>

        <div className="button-container">
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
            navigate(`/dis/${checked.join()}`);
          }
        }}> 
          Buscar descuentos
        </button>
      </div>
    </div>
  );
}
