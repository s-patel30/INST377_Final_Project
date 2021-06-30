async function populateLocationTable(){
    const request = await fetch('/locations');
    const locations = await request.json;
    const locactionTable = document.querySelector('.location-table');
    locations.forEach((loc) => {
        const newrow = document.createElement('tr');
        newrow.innerHTML = `
            <td>${loc.id}</td>
            <td>${loc.location}</td>`;
        locationTable.append(newrow);
    });
}