const LAYER_COLORS = {
    card_hash: 'rgba(189, 92, 17, 0.6)',
    phone_number: 'rgba(201, 198, 16, 0.6)',
    email_address: 'rgba(16, 78, 201, 0.6)',
    user_address: 'rgba(201, 16, 164, 0.6)'
}

const LAYER_OFFSETS = {
    card_hash: 0,
    phone_number: 1,
    email_address: 3,
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
        'layout': {
            'line-cap': 'round',
            visibility: 'none'
        },
        'paint': {
            'line-color': LAYER_COLORS[label],
            'line-width': 3,
            'line-offset': lineOffset,
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

const loadUsers = () => {
    connectionUsers.forEach(({coordinates, user_id}) => {
        const dot = createDot({ size: 80, color: 'green' });
        mapConnections.addImage(`user_${user_id}`, dot, { pixelRatio: 2 });

        mapConnections.addSource(`user_${user_id}`, {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': coordinates
                        }
                    }
                ]
            }
        });
    
        mapConnections.addLayer({
            'id': `user_${user_id}`,
            'type': 'symbol',
            'source': `user_${user_id}`,
            'layout': {
                'icon-image': `user_${user_id}`,
                'icon-allow-overlap': true
            }
        });
    });
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