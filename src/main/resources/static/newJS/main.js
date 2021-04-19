const allUsers = document.querySelector('.allUsers');
const url = 'http://localhost:8080/api/users';

let output = '';

const userList = (users) =>{
    users.forEach(user => {
        output += `
                <tr id="${user.id}">
                    <td>${user.id}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${user.roles.map(role=>role.name)}</td>
                    <td><a class="btn btn-primary eBtn" id="editUser" data-bs-toggle="modal" data-bs-target="#editModalForm">Edit</a></td>
                    <td><button type="button" class="btn btn-danger" userId="${user.id}" id="deleteUser">Delete</button></td>
                </tr> 
            `;
    });
    allUsers.innerHTML= output;
}

fetch(url)
    .then(response => response.json())
    .then(data => userList(data))

allUsers.addEventListener('click',(evt) => {
    evt.preventDefault();
    let deleteBtnIsPressed = evt.target.id === 'deleteUser';
    let editBtnIsPressed = evt.target.id === 'editUser';

    let id = evt.target.parentElement.parentElement.id;

    if(deleteBtnIsPressed){
         fetch(`${url}/${id}`,{
             method: 'DELETE',
         })
             .then(u => u.json())
             // .then(users =>userList(users))
        evt.target.closest('tr').remove()
    }

    if(editBtnIsPressed){
        myModal.open();
        // myModal.show()
    }
})

var myModal = new bootstrap.Modal(document.getElementById('editModalForm'), {
    keyboard: true
});
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