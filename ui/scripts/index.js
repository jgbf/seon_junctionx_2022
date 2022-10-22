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

    const pulsingDot = createPulsingDot({ size: 200, duration: 1000 });
    map.addImage(`pulsing-dot`, pulsingDot, { pixelRatio: 2 });

    const MainCtrl($scope) {
        $scope.longitude = (Math.random()*360-180).toFixed(8);
        $scope.latitude = (Math.random()*180-90).toFixed(8);
    }    
});

randomCoordinates = []

addPoint = (id, coords) => {
    map.addSource(`dot-point_${id}`, {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': coords // icon position [lng, lat]
                    }
                }
            ]
        }
    });

    map.addLayer({
        'id': `layer-pulsing-dot_${id}`,
        'type': 'symbol',
        'source': `dot-point_${id}`,
        'layout': {
            'icon-image': `pulsing-dot`,
            'icon-allow-overlap': true
        }
    });
}