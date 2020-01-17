const nameContainer = document.querySelector('.list-group');
const modalBody = document.querySelector('#modal-user-info .modal-body');
const formNewUser = document.querySelector('.form-new-user');
const newUserFields = document.querySelectorAll('.form-new-user .form-control');
const btnCreateUser = document.querySelector('.btn-create-user');
let users;

xhrRequest(generateUserName);
nameContainer.addEventListener('click', listGroupHandler);

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

function xhrRequestPost(body, cbResponse) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/users');

    xhr.addEventListener('load', (e) => {
        const response = JSON.parse(xhr.responseText);
        cbResponse(response);
    });

    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.send(JSON.stringify(body));
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

function viewNewUser(...objNewUser) {
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector('#modal-create-user').classList.remove('show');
    document.querySelector('.modal-backdrop').remove();
    newUserFields.forEach((item) => {
        item.value = '';
    });
    generateUserName(objNewUser);
}

function listGroupHandler(e) {
    const userName = e.target.innerText;
    const user = users.find((item) => {
        return userName === item.username;
    });
    const userInfo = document.createElement('ul');
    userInfo.classList.add('list-group', 'list-group-flush');
    generateAllInfo(user, userInfo);
    modalBody.innerHTML = '';
    modalBody.append(userInfo);
}

function generateAllInfo(obj, parent) {
    Object.entries(obj).forEach(([key, value]) => {
        const userInfoElement = document.createElement('li');
        userInfoElement.classList.add('list-group-item');
        if(typeof value !== 'object') {
            userInfoElement.innerHTML = `<strong>${key}</strong> - ${value}`;
        } else {
            userInfoElement.innerHTML = `<strong>${key}</strong>`;
        }
        parent.append(userInfoElement);
        if(typeof value === 'object') {
            generateAllInfo(value, userInfoElement);
        }
    });
}

formNewUser.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUser = {};
    newUserFields.forEach((item) => {
        newUser[item.name] = item.value;
    });
    xhrRequestPost(newUser, viewNewUser);
});