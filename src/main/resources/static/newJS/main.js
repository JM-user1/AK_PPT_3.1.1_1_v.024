// const usersList = document.querySelector('.usersList');
//
// console.log(usersList)



//========================================= jQuery ===================================
$(document).ready(function() {

    // let roles = $(user.roles);
    // console.log(roles);
    $('.table .eBtn').on('click', function(event) {
        event.preventDefault();
        var href = $(this).attr('href');


        $.get(href,function (user,status){
            console.log(user)
            $('.editModalForm #modalId').val(user.id);
            $('.editModalForm #modalName').val(user.firstname);
            $('.editModalForm #modalLastName').val(user.lastname);
            $('.editModalForm #modalAge').val(user.age);
            $('.editModalForm #modalEmail').val(user.email);
            $('.editModalForm #modalUsername').val(user.email);
            $().val(user.password);
            $('.editModalForm #modalRoles').val(user.roles);
        });

        $('.editModalForm #editModal').modal('show');
    });
});