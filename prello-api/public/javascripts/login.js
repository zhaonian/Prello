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

        // var formData = new FormData($(register_form)[0]);
});