const LAYER_COLORS = {
    card_hash: '#bd5c11',
    phone_number: '#c9c610',
    email_address: '#104ec9',
    user_address: '#c910a4'
}

const LAYER_OFFSETS = {
    card_hash: 0,
    phone_number: 1,
    email_address: 2,
    user_address: -1
}

const addConnectionLayer = ({ label, data, lineOffset }) => {
    mapConnections.addLayer({
        'id': `layer_${label}`,
        'type': 'line',
        'source': {
            'type': 'geojson',
            data
        },
        'layout': { 'line-cap': 'round' },
        'paint': {
            'line-color': LAYER_COLORS[label],
            'line-width': 2,
            'line-offset': lineOffset
        }
    });
}

const createLineStringFeature = ({coords}) => ({
    'type': 'Feature',
    'properties': {
    },
    'geometry': {
        'type': 'LineString',
        'coordinates': coords
    }
});

const loadConnections = () => {
    const data = {
        card_hash: {
            'type': 'FeatureCollection',
            'properties': {},
            'features': []

        },
        'phone_number': {
            'type': 'FeatureCollection',
            'properties': {},
            'features': []

        },
        'email_address': {
            'type': 'FeatureCollection',
            'properties': {},
            'features': []

        },
        'user_address': {
            'type': 'FeatureCollection',
            'properties': {},
            'features': []

        }
    }

    connectionEdges.forEach(({ label, coords }) => {
        /* if (!document.getElementById(`layer_${label}`)) {
            addConnectionLayer({ label, data: data[label] });
        } else {
            features[label].features.geometry.coordinates.push(createLineStringFeature(coords));
            mapConnections.getSource(`layer_${label}`).setData(data[label]);
        } */
        data[label].features.push(createLineStringFeature({coords }));
    });

    Object.keys(data).forEach(label => addConnectionLayer({label, data: data[label], lineOffset: LAYER_OFFSETS[label]}));
}

const switchLayer = (layerId) => {
    if (!mapConnections.getLayer(layerId)) {
        return;
    }

    const visibility = mapConnections.getLayoutProperty(
        layerId,
        'visibility'
    );

    if (visibility === 'visible') {
        mapConnections.setLayoutProperty(layerId, 'visibility', 'none');
    } else {
        mapConnections.setLayoutProperty(
            layerId,
            'visibility',
            'visible'
        );
    }
}