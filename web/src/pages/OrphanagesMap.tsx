import React from 'react';
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Map, TileLayer } from "react-leaflet";

import MapMarker from "../images/MapMarker.svg";

import '../styles/pages/orphanage-map.css';
import 'leaflet/dist/leaflet.css';

const OrphanagesMap = () => {
	return (
		<div id="page-map">
			<aside>
				<header>
					<img src={MapMarker} alt="Imagem de um rosto feliz"/>

					<h2>Escolha um orfanato do mapa</h2>
					<p>Muitas crianças estão esperando a sua visita :)</p>
				</header>

				<footer>
					<strong>Salto de Pirapora</strong>
					<span>São Paulo</span>
				</footer>
			</aside>

			<Map 
				center={[-23.652406, -47.580945]}
				zoom={15}
				style={{
					width: '100%', height: '100%'
				}}
			>
				{/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
				<TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
			</Map>

			<Link to="" className="create-orphanage">
				<FiPlus size={32} color="#fff" />
			</Link>
		</div>
	);
};

export default OrphanagesMap;