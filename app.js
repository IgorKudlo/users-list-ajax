const nameContainer = document.querySelector('.list-group');
let users;

xhrRequest(generateUserName);

function xhrRequest(cbResponse) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');

    xhr.addEventListener('load', (e) => {
        const response = JSON.parse(xhr.responseText);
        users = response;
        cbResponse(response);
    });

    xhr.send();
}

function generateUserName(arr) {
    arr.forEach((user) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerText = user.username;
        li.dataset.toggle = 'modal';
        li.dataset.target = '#modal-user-info';
        nameContainer.append(li);
    });
}