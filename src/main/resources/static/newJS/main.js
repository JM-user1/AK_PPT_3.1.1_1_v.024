const allUsers = document.querySelector('.allUsers');
const addUserForm = document.forms.addUserForm;
let modalForm = document.forms.modalFormName;
const {idModalForm} = document.forms;
const usersTab = document.querySelector('#users-tab');
const modals = document.querySelector('#editModalForm');
const modalsBtn = document.querySelector('.modal-footer .btnModal');
const hiddenInput = document.querySelector('input[name="_method"]');
const url = 'http://localhost:8080/api/users';



//=========================== Таблица Юзеров =========================
const userList = (users) =>{
    let output = '';
    users.forEach(user => {
        output += `
                <tr id="${user.id}">
                    <td>${user.id}</td>
                    <td id="modalFirstname">${user.firstname}</td>
                    <td id="modalLastname">${user.lastname}</td>
                    <td id="modalAge">${user.age}</td>
                    <td id="modalEmail">${user.email}</td>
                    <td hidden id="modalPassword">${user.password}</td>
                    <td id="modalRolesName">${user.roles.map(role=>role.name)}</td>
                    <td hidden id="modalRolesId">${user.roles.map(role=>role.id)}</td>
                    <td><a class="btn btn-primary eBtn" id="editUser" data-bs-toggle="modal" data-bs-target="#editModalForm">Edit</a></td>  
<!--                data-bs-toggle="modal" data-bs-target="#editModalForm"-->
                    <td><button type="button" class="btn btn-danger" userId="${user.id}" id="deleteUser" 
                    data-bs-toggle="modal" data-bs-target="#editModalForm">Delete</button></td>
                </tr> 
            `;
    });
    allUsers.innerHTML= output;
}


//=========================== Таблица Юзеров =========================
let userListUpdate = () =>{
    fetch(url)
        .then(response => response.json())
        .then(data => {
            userList(data)
        })
}

userListUpdate()

usersTab.addEventListener('click',(event) =>{
    event.preventDefault();

    userListUpdate();
})

addUserForm.addEventListener('click',(event) =>{
    event.preventDefault();

    let addNewUserBtn = event.target.id === 'addUser';

    let roleNewUser;
    if (addNewUserBtn) {

        let addNewUser = {
            "id": addUserForm.id.value,
            "firstname": addUserForm.firstname.value,
            "lastname": addUserForm.lastname.value,
            "age": addUserForm.age.value,
            "email": addUserForm.email.value,
            "username": addUserForm.email.value,
            "password": addUserForm.password.value,
            "roles": Array.from(addUserForm.roles.options).filter(op => op.selected)
                .map(op => roleNewUser = {
                    name: op.id,
                    id: op.value
                })
        }

        fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(addNewUser),
        })

    }

})

allUsers.addEventListener('click',(evt) => {
    evt.preventDefault();
    const parent = evt.target.parentElement.parentElement;

    let id = parent.querySelector('td').textContent;
    let firstName = parent.querySelector('#modalFirstname').textContent;
    let lastName = parent.querySelector('#modalLastname').textContent;
    let age = parent.querySelector('#modalAge').textContent;
    let email = parent.querySelector('#modalEmail').textContent;
    let password = parent.querySelector('#modalPassword').textContent;
    let rolesName = parent.querySelectorAll('#modalRolesName');
    let roles = ()=> {
        return Array.prototype.map.call(rolesName, (t) => {return t.textContent})
    }

    let deleteBtnIsPressed = evt.target.id === 'deleteUser';
    let editBtnIsPressed = evt.target.id === 'editUser';

    let modalOut = () =>{
        modalForm.id.value = id;
        modalForm.firstname.value = firstName;
        modalForm.lastname.value = lastName;
        modalForm.age.value = age;
        modalForm.email.value = email;
        modalForm.roles.options.value = roles() ;
    }

    if(deleteBtnIsPressed){

        modalsBtn.setAttribute('class','btn btnModal btn-danger')

        modalsBtn.value = "Delete";
        modalOut();
    }
    if(editBtnIsPressed){

        modalForm.setAttribute('action','/api/users/');
        console.log(modalForm)
        hiddenInput.setAttribute('value', 'patch')
        modalsBtn.setAttribute('class','btn btnModal btn-primary')
        modalsBtn.value = "Edit User";
        modalOut();
    }
    modalForm.addEventListener('click',(event)=> {
        event.preventDefault();


        let btnFrmEdit = event.target.value === 'Edit User';
        let btnFormDelete = event.target.value === 'Delete';


        if(btnFormDelete){
            fetch(`${url}/${id}`,{
                method: 'DELETE',
            })
        }

        let role;
        if (btnFrmEdit) {


            let userOut = {
                "id": modalForm.id.value,
                "firstname": modalForm.firstname.value,
                "lastname": modalForm.lastname.value,
                "age": modalForm.age.value,
                "email": modalForm.email.value,
                "username": modalForm.email.value,
                "password": modalForm.password.value,
                "roles": Array.from(modalForm.roles.options).filter(option => option.selected)
                    .map(option => role = {
                        name: option.value,
                        id: option.id
                    })
            }
            fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(userOut),
            })
            // .then(resp => resp.json())
        }


        userListUpdate()

    }, false)

})

function setNewEntry(entry) {
    $('#block').html(getNewEntry($('#block').html(), entry));
}

function getNewEntry(oldHTML, newHTML) {
    if(newHTML == '')
        return newHTML;
    else
        return oldHTML + newHTML;
}

