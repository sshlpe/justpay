import React from 'react';
import {Link} from "react-router-dom";

import Footer from '../hd-ft/footer';
import Header from '../hd-ft/header';

import '../../styles/extras/credits.css';
const box = 'box.png';

export default function Admin() {
	
	return (
		<div className="Credits">
			<h2 className="c-title-1"> Pagina Dedicada a dar cretidos a las imagenes utilizadas </h2>
			<div className="c-container-1">
				 <a href="https://www.freepik.es/foto-gratis/mano-que-sostiene-cupon-descuento-porcentaje-compras-linea-simbolo-icono-dibujos-animados-representacion-3d_25013101.htm#query=icono%203d%20de%20descuento%20de%20caja%20de%20regalo&position=5&from_view=search&track=ais">
				 	<img src={box} alt="box" />
				 	Imagen de mamewmy en Freepik 
				 </a>
				 <a href="https://www.freepik.es/psd-gratis/icono-tienda-linea-ilustracion-procesamiento-3d-aislado_32463137.htm#query=icono%203d%20de%20descuento%20de%20caja%20de%20regalo&position=2&from_view=search&track=ais#position=2&query=icono%203d%20de%20descuento%20de%20caja%20de%20regalo">
				 	<img src={box} alt="box" />
				 	Imagen de xvector en Freepik 
				 </a>
				 <a href="https://www.freepik.es/psd-gratis/venta-descuento-cupon-etiqueta-icono-aislado-3d-render-ilustracion_32464022.htm#query=icono%203d%20de%20descuento%20de%20caja&position=25&from_view=search&track=ais">
				 	<img src={box} alt="box" />
				 	Imagen de xvector en Freepik 
				 </a> 
			</div>
			<a href="javascript:history.back()"> Volver Atrás </a>
		</div>
	)
}