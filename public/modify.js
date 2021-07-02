async function addLocation() {
    // var data = new FormData();
    // data.set('location_name', document.querySelector('#loc-put-text').value);
    const data = JSON.stringify({
        location_name: document.querySelector('#loc-put-text').value
    });
    const put_options = {
        method: 'PUT',
        mode: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'manual',
        body: data
    };
    const response = await fetch('/locations', put_options);
    const response_json = await response.json();
    alert(1);
    alert(response_json.message);
}

async function updateLocation() {

}

async function deleteLocation() {
    
}
