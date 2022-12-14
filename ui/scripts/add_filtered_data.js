const addStatisticPoints = (witch, visibility) => {
    map.addLayer({
        id: witch,
        type: 'circle',
        source: 'facebook',
        filter: ['has', witch],
        visibility: visibility,
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
        id: `${witch}-text`,
        type: 'symbol',
        source: 'facebook',
        visibility: visibility,
        filter: ['has', witch],
        layout: {
            'text-field': `{${witch}}`,
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });
}
