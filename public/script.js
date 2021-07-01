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

async function addLocation() {
    ('form#loc-put').submit((e) => {
        e.preventDefault();
        const form = $(this);
        
    });
}

async function updateLocation() {

}

async function deleteLocation() {
    
}

window.onload = populateFoodTable;