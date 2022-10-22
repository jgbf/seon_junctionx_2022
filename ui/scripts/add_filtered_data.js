const addStatisticPoints = (witch) => {
    map.addSource('facebook', {
        type: 'geojson',
        data: firstJson,
        cluster: true,
        clusterRadius: 30 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'facebook',
        filter: ['has', witch],
        paint: {
            'circle-color': [
                'step',
                ['get', witch],
                '#51bbd6',
                5000,
                '#f1f075',
                20000,
                '#f28cb1'
            ],
            'circle-radius': [
                'step',
                ['get', witch],
                15,
                5000,
                20,
                20000,
                30
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'facebook',
        filter: ['has', witch],
        layout: {
            'text-field': `{${witch}}`,
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });
}
