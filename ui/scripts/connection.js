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

const createLineStringFeature = ({ id, label, coords, value, sourceUserId, targetUserId }) => ({
    id,
    'type': 'Feature',
    'properties': {
        label,
        coords,
        value,
        sourceUserId,
        targetUserId
    },
    'geometry': {
        'type': 'LineString',
        'coordinates': coords
    }
});

const loadConnections = () => {
    let dataCount = 0;
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

    connectionEdges.forEach(({ label, coords, value, sourceUserId, targetUserId }, i) => {
        data[label].features.push(createLineStringFeature({ id: i, label, coords, value, sourceUserId, targetUserId }));
    });

    Object.keys(data).forEach(label => {
        addConnectionLayer({ label, data: data[label], lineOffset: LAYER_OFFSETS[label] });
        dataCount += data[label].features.length;
    });

    return dataCount;
}

const loadUsers = (idFrom) => {
    const features = [];
    connectionUsers.forEach(({ coordinates, user_id, card_hash, email, phone, address }, i) => {
        console.log(idFrom, i)
        features.push({
            id: i,
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': coordinates
            },
            properties: {
                userId: user_id,
                coordinates,
                card_hash,
                email,
                phone,
                address
            }
        });
    });

    const dot = createDot({ size: 80, color: 'green' });
    mapConnections.addImage(`user`, dot, { pixelRatio: 2 });

    mapConnections.addSource(`user`, {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': features
        }
    });

    mapConnections.addLayer({
        'id': `user`,
        'type': 'symbol',
        'source': `user`,
        'layout': {
            'icon-image': `user`,
            'icon-allow-overlap': true
        }
    });

    return features.length;
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