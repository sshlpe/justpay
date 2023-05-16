import React from 'react';
import {useState, useEffect} from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import Cards from './cards';
import {FaToggleOff, FaToggleOn} from "react-icons/fa";
import { BsPlusSquareFill } from "react-icons/bs";

import '../../styles/benefits/bef.css';

const getDate = () => {
  const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  const fecha = new Date();
  return dias[fecha.getDay()];
};

export default function DscPage() {

  const {selected} = useParams();

  const location = useLocation();
  const icons = location.state.icons;

  const [data, setData] = useState([]);
  const [fdata, setfData] = useState([]);
  const [fword, setfWord] = useState('');
  const [today, setToday] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let url = process.env.REACT_APP_API_URL + `discounts/${selected}`;
      setLoading(true);
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
      setfData(jsonData);
      setLoading(false);
    };
    fetchData();
  }, [selected]);

  useEffect(() => {
    const wordLower = fword.toLowerCase();
    const filter_data = {};
    for (let ent in data) {
      let pre_filt_data = data[ent].filter(elm => {
        let lower_title = elm.title.toLowerCase();
        let lower_text = elm.text.toLowerCase();
        if (!today){
          return lower_title.includes(wordLower) || lower_text.includes(wordLower);
        }
          let day = getDate();
          return (
            (lower_title.includes(wordLower) || lower_text.includes(wordLower)) &&
            (elm.days.includes('no info') || elm.days.includes(day))
          );
      });
      if (pre_filt_data.length > 0) {
        filter_data[ent] = pre_filt_data;
      }
    }
    setfData(filter_data);
  }, [fword, today]);

  return (
    <div className="DscPage">
        <div className="container">
          <h1 className="b-title1"> Tienes los Siguentes Descuentos </h1>
          <div className="b-container-icons-1" >
              < BsPlusSquareFill className="b-plus-icon" />
              <div className="b-container-icons-2" >
                {icons.map((url, iconIndex) => {
                  return (
                      <img src={url} className="b-company-icon" alt='selected'/>
                  );
                })}
              </div>
          </div>
          <div className="b-container-x">
            <input type="text" placeholder="Filtrar descuentos" onChange={e => setfWord(e.target.value)} className="input-txt"/>
            <button onClick={()=> {setToday(!today)}} className="b-button-container-x1"> 
              hoy 
              {today ? ( <FaToggleOn className="ent-check-icon" /> ) : (<FaToggleOff className="" /> )}
            </button>
          </div>
        </div>
      {loading ? (
          <div className="b-container-x2">
            <svg viewBox="0 0 50 50" class="b-loarder">
              <circle className="ring" cx="25" cy="25" r="20"></circle>
              <circle className="ball" cx="25" cy="5" r="3.5"></circle>
            </svg>
          </div> 
          ) : (
          <div className="b-container-x3">
            {Object.entries(fdata).map(([key, list]) => {
              return(
                <Cards title={key} list={list} key={`c-${key}`}/>
              )
            })}
          </div>
          ) }
      <div className="container">
        <button onClick={() => {navigate('/')}}> 
          Volver
        </button>
      </div>
    </div>
  );
}