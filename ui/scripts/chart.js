const labels = [
    //'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September'
];

const getRandomStart = () => {
    const min = 100000
    const max = 2000000
    return Math.random() * (max - min) + min
}

const makeRandomChanges = (prew) => {
    const min = -10000
    const max = 20000
    return prew + (Math.random() * (max - min) + min)
}

const getRandomTimeline = () => {
    const start = getRandomStart();
    let values = [];
    values.push(start)

    for(let i = 0; i < 10; i++) {
        values.push(makeRandomChanges(values[i]))
    }
    return values

}

const start = getRandomStart()

const data = {
    labels: labels,
    datasets: [{
        label: 'Local revenue trendline',
        backgroundColor: 'rgb(96, 189, 178)',
        borderColor: 'rgb(96, 189, 178)',
        data: getRandomTimeline(),
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);
