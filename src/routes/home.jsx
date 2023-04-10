import React from 'react';
import { useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import Footer from './footer';

import '../styles/home.css';

export default function Home() {
  const navigate = useNavigate();
  const [entities, setEntities] = useState([]);
  const [checked, setChecked] = useState([]);
  const [send, setSend] = useState('');

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

  const sendSubmit = async () => {
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

  const sendComment = async () => {
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
    <div className="Home page-container">
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
      <p className="space"> {send} </p>
      <div className="h-container">
        <div className="form-container">
          <h4> Falta alguna empresa? Solicita algunas </h4>
          <textarea placeholder="Write something.." id="submit-input"></textarea>
          <button onClick={() => {sendSubmit()}}> enviar </button>
        </div>
         <div className="form-container">
          <h4> Deja un Comentario </h4>
          <textarea placeholder="Write something.." id="comment-input" ></textarea>
          <button onClick={() => {sendComment()}}> enviar </button>
        </div>
      </div>
      <p className="space"> </p>
      <Footer />
    </div>
  );
}
