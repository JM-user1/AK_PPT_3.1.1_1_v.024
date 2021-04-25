const allUsers = document.querySelector('.allUsers');
let modalForm = document.querySelector('.editModalForm form')
const btns = document.querySelector('.eBtn');
const modals = document.querySelector('#editModalForm');
const modalsBtn = document.querySelector('.modal-footer .btnModal');
const hiddenInput = document.querySelector('input[name="_method"]');
const url = 'http://localhost:8080/api/users';

let output = '';

//=========================== Таблица Юзеров =========================
const userList = (users) =>{
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
fetch(url)
    .then(response => response.json())
    .then(data => userList(data))


//=========================== Удаление Юзеров =========================
allUsers.addEventListener('click',(evt) => {
    evt.preventDefault();
    const parent = evt.target.parentElement.parentElement;
    let id = parent.querySelector('td').textContent;
    let firstName = parent.querySelector('#modalFirstname').textContent;
    let lastName = parent.querySelector('#modalLastname').textContent;
    let age = parent.querySelector('#modalAge').textContent;
    let email = parent.querySelector('#modalEmail').textContent;
    let password = parent.querySelector('#modalPassword').textContent;
    let rolesName = parent.querySelector('#modalRolesName').textContent;
    let rolesId = parent.querySelector('#modalRolesId').textContent;



    let deleteBtnIsPressed = evt.target.id === 'deleteUser';
    let editBtnIsPressed = evt.target.id === 'editUser';


    let modalOut = () =>{
        modals.querySelector('.modal-body #modalId').value = id;
        modals.querySelector('.modal-body #modalName').value = firstName;
        modals.querySelector('.modal-body #modalLastName').value = lastName;
        modals.querySelector('.modal-body #modalAge').value = age;
        modals.querySelector('.modal-body #modalEmail').value = email;
        modals.querySelector('.modal-body #modalRoles').value = rolesName;
    }

    if(deleteBtnIsPressed){

        modalsBtn.setAttribute('class','btn btnModal btn-danger')
        // modalsBtn.classList.add('btn-danger');
        modalsBtn.value = "Delete";
        modalOut();
    }
        //=========================== Нужно сделать удаление через модалку =========================
    if(editBtnIsPressed){

        modalForm.setAttribute('action','/api/users/');
        hiddenInput.setAttribute('value', 'patch')
        // modalForm.setAttribute('method','PUT');
        modalsBtn.setAttribute('class','btn btnModal btn-primary')
        modalsBtn.value = "Edit User";
        // modalsBtn.classList.add('btn-primary');
        //=============Разобраться с ID
        modalOut();
        // console.log()
        // myModal.show()
    }

    modalForm.addEventListener('click',(event)=> {
        event.preventDefault();


        // fetch(`${url}/${id}`).then(response =>{
        //     return response.json();
        // }).then(data => {
        //     user =  data;
        //     // console.log(data);
        // });

        let btnFrmEdit = event.target.value === 'Edit User';
        let btnFormDelete = event.target.value === 'Delete';

        let forBody ={
            user:{
                id: id,
                firstname: firstName,
                lastName: lastName,
                age: age,
                email: email,
                password: password,
                roles:[
                    {
                        name: rolesName,
                        id: rolesId,
                    }
                ]
            }
        }


        if(btnFormDelete){
            fetch(`${url}/${id}`,{
                method: 'DELETE',
            })
            .then(u => u.json())
            .then(() => $('.editModalForm').modal('hide'))
            //     .then(users =>userList(users))
            // console.log(event.target.closest('tr'))
        }



        if(btnFrmEdit){

            console.log(forBody)
            fetch(`${url}/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( forBody)
            })
            .then(resp=> resp.json())
            .then(() => $('.editModalForm').modal('hide'))

        }

        // modalForm.modal('hide');
    }, false)

})




//=========================== Модалка =========================

// btns.forEach((el) => {
//     el.addEventListener('click',(e)=>{
//         let path
//     })
// })

//========================================= jQuery ===================================
// $(document).ready(function() {
//
//     // let roles = $(user.roles);
//     // console.log(roles);
//     $('.table .eBtn').on('click', function(event) {
//         event.preventDefault();
//         const href = $(this).attr('href');
//         const text = $(this).text();
//         if (text === 'Edit') {
//             $.get(href, function (user, status) {
//                 console.log(user)
//
//                 $('.editModalForm #modalId').val(user.id);
//                 $('.editModalForm #modalName').val(user.firstname);
//                 $('.editModalForm #modalLastName').val(user.lastname);
//                 $('.editModalForm #modalAge').val(user.age);
//                 $('.editModalForm #modalEmail').val(user.email);
//                 $('.editModalForm #modalUsername').val(user.email);
//                 $('.editModalForm #modalPassword').val();
//                 $('.editModalForm #modalRoles').val(user.roles);
//             });
//
//             $('.editModalForm #editModal').modal('show');
//         }
//     });
// });