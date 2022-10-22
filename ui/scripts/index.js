mapboxgl.accessToken = 'pk.eyJ1IjoianVuY3Rpb254c2VvbiIsImEiOiJjbDlqNjJvejgyeHBxM3dxdG8wZWZ5azJ6In0.rNOeK33WbpvJ1rrWhVVXcw';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-103.5917, 40.6699],
    zoom: 3
});