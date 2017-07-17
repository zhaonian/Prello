$(function () {
        $('#whatever-container').on('click', '#link-id', function (e) {
                var email = $('html').attr('id');
                $.post(`/api/user/form/${email}`, function (data) {
                        if (data.redirect) {
                                window.location.replace(data.redirect); // this is how to do authcheck with ajax call
                        }
                });
        });
});