const navigate = to => {
    console.log(to)
    if (to === 'customer') {
        const pageFrom = document.getElementById('main-transaction');
        pageFrom.style.display = 'none';
        const pageTo = document.getElementById('main-customer');
        pageTo.style.display = 'grid';
        const navFrom = document.getElementById('nav-transaction');
        navFrom.classList.remove('active');
        const navTo = document.getElementById('nav-customer');
        navTo.classList.add('active');
    } else {
        const pageFrom = document.getElementById('main-customer');
        pageFrom.style.display = 'none';
        const pageTo = document.getElementById('main-transaction');
        pageTo.style.display = 'grid';
        const navFrom = document.getElementById('nav-customer');
        navFrom.classList.remove('active');
        const navTo = document.getElementById('nav-transaction');
        navTo.classList.add('active');
    }
}