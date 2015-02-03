$(document).ready(function(){
    $('.form-signin').validate({
        rule: {
            username: {
                required: true
            },
            userEmail: {
                required: true,
                email: true
            },
            userPassword: {
                minlength: 6,
                required: true
            }
        },
        success: function(element){
        element
        .text('Ok!'.addClass('valid')
        }
    });
});
