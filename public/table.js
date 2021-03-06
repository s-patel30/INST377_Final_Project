function toggleBurger() {
    var burger = document.querySelector('.navbar-burger');
    var menu = document.querySelector('.navbar-menu');
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
}

async function populateFoodTable(){
    const request = await fetch('/food');
    const restaurants = await request.json();
    const foodTable = document.querySelector('.food-table');
    restaurants.forEach((res) => {
        const newrow = document.createElement('tr');
        newrow.innerHTML = `
            <td>${res.establishment_id}</td>
            <td>${res.name}</td>
            <td>${res.owner}</td>
            <td>${res.address_line_1}</td>`;
        foodTable.append(newrow);
    });
}

window.onload = populateFoodTable;