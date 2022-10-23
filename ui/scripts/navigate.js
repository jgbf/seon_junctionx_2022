const navigate = to => {
    console.log(to)
    if (to === 'customer') {
        window.location.href = '/graph'
        const navFrom = document.getElementById('nav-transaction');
        navFrom.classList.remove('active');
        const navTo = document.getElementById('nav-customer');
        navTo.classList.add('active');
    } else {
        window.location.href = '/'
        const navFrom = document.getElementById('nav-customer');
        navFrom.classList.remove('active');
        const navTo = document.getElementById('nav-transaction');
        navTo.classList.add('active');
    }
}
