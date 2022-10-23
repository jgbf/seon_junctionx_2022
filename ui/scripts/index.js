mapboxgl.accessToken = mapboxAccessToken;
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v10',
    center: [19.040236, 47.497913],
    zoom: 0.75,
    dragRotate: false,
    maxZoom: 4,
    minZoom: 0,
    doubleClickZoom: true
});

map.on('styledata', () => {
    map.setLayoutProperty('country-label', 'visibility', 'none');
    map.setLayoutProperty('settlement-label', 'visibility', 'none');
}); 

map.on('load', () => {
    const repaintIntervalId = setInterval(() => {
        map.triggerRepaint();
    });

    const pulsingDotGreen = createPulsingDot({ size: 70, duration: 1000, color: 'green' });
    const pulsingDotRed = createPulsingDot({ size: 70, duration: 1000, color: 'red' });
    map.addImage(`pulsing-dot-green`, pulsingDotGreen, { pixelRatio: 2 });
    map.addImage(`pulsing-dot-red`, pulsingDotRed, { pixelRatio: 2 });

    // addStatisticPoints('facebook')

    plotTransactions();
    map.addSource('facebook', {
        type: 'geojson',
        data: firstJson,
        cluster: true,
        clusterRadius: 30 // Radius of each cluster when clustering points (defaults to 50)
    });
    addStatisticPoints('facebook', 'none')
    addStatisticPoints('instagram', 'none')
    addStatisticPoints('linkedin', 'none')
    addStatisticPoints('netflix', 'none')
    addStatisticPoints('github', 'none')
    hide_all_stat()
});

map.on('click', (e) => {
    change()
    map.flyTo({center: [e.lngLat.lng, e.lngLat.lat], zoom:10})

})
