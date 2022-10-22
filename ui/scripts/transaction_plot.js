const plotTransactions = async () => {
    const getRandom = (min, max) => Math.random() * (max - min) + min;

    const minTime = 100;
    const maxTime = 350;

    let index = 0;
    while (true) {
        const c = coordinates.coordinates[index++];

        addPoint({
            id: index,
            coords: c,
            color: Math.random() < 0.2 ? 'red' : 'green'
        });

        await new Promise((res, rej) => {
            setTimeout(() => {
                res();
            }, getRandom(minTime, maxTime));
        });

        if (index === coordinates.length - 1) {
            index = 0;
        }
    }
};
