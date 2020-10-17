import Leaflet from 'leaflet';
import mapMarkerImg from '../images/MapMarker.svg';

const mapIcon = Leaflet.icon({
	iconUrl: mapMarkerImg,
  
	iconSize: [58, 68],
	iconAnchor: [29, 68],
	// popupAnchor: [0, -60]
	popupAnchor: [180, 0],
});

export default mapIcon;