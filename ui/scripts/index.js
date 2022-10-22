mapboxgl.accessToken = 'pk.eyJ1IjoianVuY3Rpb254c2VvbiIsImEiOiJjbDlqNHMzNGwwcjdiM3ZyN2R3eml3aTU5In0.lU_mbPHZcjRYVa7e5Pm7CQ';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-103.5917, 40.6699],
    zoom: 3
});