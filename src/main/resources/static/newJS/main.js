const allUsers = document.querySelector('.allUsers');
let modalForm = document.querySelector('.editModalForm form')
const btns = document.querySelector('.eBtn');
const modals = document.querySelector('#editModalForm');
const modalsBtn = document.querySelector('.modal-footer .btnModal')
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
                    <td id="modalRoles">${user.roles.map(role=>role.name)}</td>
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
    let deleteBtnIsPressed = evt.target.id === 'deleteUser';
    let editBtnIsPressed = evt.target.id === 'editUser';


    let modalOut = () =>{
        const parent = evt.target.parentElement.parentElement;
        modals.querySelector('.modal-body #modalId').value =
            parent.querySelector('td').textContent;
        modals.querySelector('.modal-body #modalName').value =
            parent.querySelector('#modalFirstname').textContent;
        modals.querySelector('.modal-body #modalLastName').value =
            parent.querySelector('#modalLastname').textContent;
        modals.querySelector('.modal-body #modalAge').value =
            parent.querySelector('#modalAge').textContent;
        modals.querySelector('.modal-body #modalEmail').value =
            parent.querySelector('#modalEmail').textContent;
        modals.querySelector('.modal-body #modalRoles').value =
            parent.querySelector('#modalRoles').textContent;
    }

    if(deleteBtnIsPressed){
        modalsBtn.setAttribute('class','btn btnModal btn-danger')
        // modalsBtn.classList.add('btn-danger');
        modalsBtn.value = "Delete";
        modalOut();
    }
        //=========================== Нужно сделать удаление через модалку =========================
    if(editBtnIsPressed){

        // modalForm.setAttribute('action','/api/users');
        // modalForm.setAttribute('method','PUT');
        modalsBtn.setAttribute('class','btn btnModal btn-primary')
        // modalsBtn.classList.add('btn-primary');
        //=============Разобраться с ID
        modalOut();
        // console.log()
        // console.log()


        // console.log(allUsers);

        // myModal.show()
    }
})

modalForm.addEventListener('click',(event)=> {
    event.preventDefault();
    let id = event.target.parentElement.parentElement.querySelector('#modalId').value;
    let btnFrmEdit = event.target.value === 'Edit User';
    let btnFormDelete = event.target.value === 'Delete';


    if(btnFormDelete){
        fetch(`${url}/${id}`,{
            method: 'DELETE',
        })
        .then(u => u.json())
        //     .then(users =>userList(users))
        // console.log(event.target.closest('tr'))

    }

    modalForm.modal('hide');
}, false)


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