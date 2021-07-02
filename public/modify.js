async function addLocation() {
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
    alert(response_json.message);
}

async function updateLocation() {
    const data = JSON.stringify({
        location_id: document.querySelector('#loc-post-id').value,
        location_name: document.querySelector('#loc-post-text').value
    });
    const post_options = {
        method: 'POST',
        mode: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'manual',
        body: data
    };
    const response = await fetch('/locations', post_options);
    const response_json = await response.json();
    alert(response_json.message);
}

async function deleteLocation() {
    const data = JSON.stringify({
        location_id: document.querySelector('#loc-delete-id').value
    });
    const delete_options = {
        method: 'DELETE',
        mode: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'manual',
        body: data
    };
    const response = await fetch('/locations', delete_options);
    const response_json = await response.json();
    alert(response_json.message);
}
