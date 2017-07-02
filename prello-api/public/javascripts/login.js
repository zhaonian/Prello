var password = document.querySelector('#password');
var password_confirm = document.querySelector('#password-confirm');
var register_btn = document.querySelector('#register-btn');
var register_form = document.querySelector('#register-form')

// register_form.addEventListener('submit', function(e) {
// 	if(password.value !== password_confirm.value) {
//                 e.preventDefault();
// 		alert(`Passwords ain't da same`);
// 	}
// });

$(register_form).on('submit', function (e) {
        if (password.value !== password_confirm.value) {
                e.preventDefault();
                alert(`Passwords ain't da same`);
        }

        var formData = new FormData();
        formData.append(
                'username', $('#username'),
                'email', $('#email'),
                'password', $('#password'));

        $.ajax({
                type: "POST",
                url: `http://localhost:3000/user/register`,
                contentType: false,
                data: formData,
                processData: false,
                success: function (data) {
                        // TODO: save the user in session here
                        // location.href = "http://localhost:3000/board";
                }
        });
});
