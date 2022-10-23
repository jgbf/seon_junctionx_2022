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

mapConnections.boxZoom.disable();

mapConnections.on('styledata', () => {
    mapConnections.setLayoutProperty('country-label', 'visibility', 'none');
    mapConnections.setLayoutProperty('settlement-label', 'visibility', 'none');
});

mapConnections.on('load', () => {
    //addConnectionLayer({label: 'phone_number'});
    const idFrom = loadConnections();
    loadUsers(idFrom);

    const canvas = mapConnections.getCanvasContainer();

    // Variable to hold the starting xy coordinates
    // when `mousedown` occured.
    let start;

    // Variable to hold the current xy coordinates
    // when `mousemove` or `mouseup` occurs.
    let current;

    // Variable for the draw box element.
    let box;

    // Set `true` to dispatch the event before other functions
    // call it. This is necessary for disabling the default map
    // dragging behaviour.
    canvas.addEventListener('mousedown', mouseDown, true);

    // Return the xy coordinates of the mouse position
    function mousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return new mapboxgl.Point(
            e.clientX - rect.left - canvas.clientLeft,
            e.clientY - rect.top - canvas.clientTop
        );
    }

    function mouseDown(e) {
        // Continue the rest of the function if the shiftkey is pressed.
        if (!(e.shiftKey && e.button === 0)) return;

        // Disable default drag zooming when the shift key is held down.
        mapConnections.dragPan.disable();

        // Call functions for the following events
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('keydown', onKeyDown);

        // Capture the first xy coordinates
        start = mousePos(e);
    }

    function onMouseMove(e) {
        // Capture the ongoing xy coordinates
        current = mousePos(e);

        // Append the box element if it doesnt exist
        if (!box) {
            box = document.createElement('div');
            box.classList.add('boxdraw');
            canvas.appendChild(box);
        }

        const minX = Math.min(start.x, current.x),
            maxX = Math.max(start.x, current.x),
            minY = Math.min(start.y, current.y),
            maxY = Math.max(start.y, current.y);

        // Adjust width and xy position of the box element ongoing
        const pos = `translate(${minX}px, ${minY}px)`;
        box.style.transform = pos;
        box.style.width = maxX - minX + 'px';
        box.style.height = maxY - minY + 'px';
    }

    function onMouseUp(e) {
        // Capture xy coordinates
        finish([start, mousePos(e)]);
    }

    function onKeyDown(e) {
        // If the ESC key is pressed
        if (e.keyCode === 27) finish();
    }

    const finish = (bbox) => {
        const LAYER_COLORS = {
            card_hash: 'rgba(189, 92, 17)',
            phone_number: 'rgba(201, 198, 16)',
            email_address: 'rgba(16, 78, 201)',
            user_address: 'rgba(201, 16, 164)'
        }

        // Remove these events now that finish has been called.
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('mouseup', onMouseUp);

        if (box) {
            box.parentNode.removeChild(box);
            box = null;
        }

        // If bbox exists. use this value as the argument for `queryRenderedFeatures`
        if (bbox) {
            const features = mapConnections.queryRenderedFeatures(bbox, {
                layers: [
                    'layer_card_hash',
                    'layer_phone_number',
                    'layer_email_address',
                    'layer_user_address',
                    'user'
                ]
            });

            if (features.length >= 1000) {
                return window.alert('Select a smaller number of features');
            }

            // Run through the selected features and set a filter
            // to match features with unique FIPS codes to activate
            // the `counties-highlighted` layer.
            let data = {
                nodes: [],
                links: []
            }
            console.log({features})

            features.filter(f => f.layer.id === 'user').forEach((feature, i) => {
                data.nodes.push({
                    id: feature.id,
                    color: 'rgba(96, 189, 178)',
                    originalId: feature.properties.userId,
                });
            });

            const userNodeCount = data.nodes.length;
            features.filter(f => f.layer.id !== 'user').forEach((feature, i) => {
                let nodeAsd = data.nodes.find(n => n.label === feature.properties.label && n.value === feature.properties.value);
                if (!nodeAsd) {
                    nodeAsd = {
                        id: feature.id + userNodeCount + 1,
                        color: LAYER_COLORS[feature.properties.label],
                        label: feature.properties.label,
                        value: feature.properties.value
                    }
                    data.nodes.push(nodeAsd);
                }

                data.links.push({
                    source: nodeAsd.id,
                    target: data.nodes.find(n => n.originalId && n.originalId === feature.properties.sourceUserId).id,
                    distance: 100
                });

                data.links.push({
                    source: nodeAsd.id,
                    target: data.nodes.find(n => n.originalId && n.originalId === feature.properties.targetUserId).id,
                    distance: 100
                });
            });
            console.log({data})

            refreshGraph(JSON.parse(JSON.stringify(data)));
        }

        //refreshGraph(dataa)

        mapConnections.dragPan.enable();
    }
});

mapConnections.on('idle', () => {
    /* addFilterHandler({
        id: 'filter_phone_number',
        layerId: 'layer_phone_number'
    }) */
});
