// append the svg object to the body of the page

const dataa = {
    nodes: [
        {
            id: 1,
            name: 'user1',
            color: 'rgba(96, 189, 178)'
        },
        {
            id: 2,
            name: 'user2',
            color: 'rgba(96, 189, 178)'
        },
        {
            id: 3,
            name: 'user3',
            color: 'rgba(96, 189, 178)'
        },
        {
            id: 4,
            name: 'user4',
            color: 'rgba(96, 189, 178)'
        },
        {
            id: 5,
            name: 'card_hash',
            value: '9c7d04a0d58edce52488c7fd26547e841c7fd1fc6ad5e566ac16b7ed5d222a86',
            color: 'rgba(189, 92, 17)'
        },
        {
            id: 6,
            name: 'phone_number',
            value: '123456789',
            color: 'rgba(201, 198, 16)'
        },
        {
            id: 7,
            name: 'email_address',
            value: 'user2@example.com',
            color: 'rgba(16, 78, 201)'
        }
    ],
    links: [
        {
            source: 1,
            target: 5,
            distance: 100,
            label: 'HAS_EMAIL'
        }, {
            source: 2,
            target: 5,
            distance: 100,
            label: 'HAS_EMAIL'
        }, {
            source: 3,
            target: 5,
            distance: 100,
            label: 'HAS_EMAIL'
        }, {
            source: 4,
            target: 5,
            distance: 150,
            label: 'HAS_EMAIL'
        }, {
            source: 1,
            target: 6,
            distance: 100,
            label: 'HAS_EMAIL'
        }, {
            source: 2,
            target: 6,
            distance: 100,
            label: 'HAS_EMAIL'
        }, {
            source: 2,
            target: 7,
            distance: 100,
            label: 'HAS_EMAIL'
        }, {
            source: 3,
            target: 7,
            distance: 100,
            label: 'HAS_EMAIL'
        },
    ]
}

const createGraph = data => {
    var svg = d3.select("#graph"),
        width = 960,
        height = 400;

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) { return d.id; }).distance(100))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));


    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(data.links)
        .enter().append("line")
        .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(data.nodes)
        .enter().append("g")

    var circles = node.append("circle")
        .attr("r", 12)
        .attr("fill", (d) => d.color );

    // Create a drag handler and append it to the node object instead
    var drag_handler = d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    drag_handler(node);

    /* var lables = node.append("text")
        .text(function (d) {
            return d.id;
        })
        .attr('x', 6)
        .attr('y', 3); */


    node.append("title")
        .text(function (d) { return d.id; });

    simulation
        .nodes(data.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(data.links);

    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        node
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

const refreshGraph = data => {
    d3.selectAll('#graph > *').remove();
    createGraph(data);
}