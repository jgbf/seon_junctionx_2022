const mapConnections = new mapboxgl.Map({
    container: 'map-connections',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v10',
    center: [19.070007, 47.492481],
    zoom: 0.75,
    dragRotate: false,
    maxZoom: 20,
    minZoom: 10,
    doubleClickZoom: true
});

mapConnections.on('styledata', () => {
    mapConnections.setLayoutProperty('country-label', 'visibility', 'none');
    mapConnections.setLayoutProperty('settlement-label', 'visibility', 'none');
});

mapConnections.on('load', () => {
    //addConnectionLayer({label: 'phone_number'});
    loadConnections();
});

mapConnections.on('idle', () => {
    /* addFilterHandler({
        id: 'filter_phone_number',
        layerId: 'layer_phone_number'
    }) */
});