var username = $('html').attr('id');

// Boards
$(function () {

        // Load all the boards from the database
        $.get(`http://localhost:3000/api/${username}/board`, function (data) {
                for (var i = 0; i < data.length; i++) {
                        var boardName = data[i].boardName;
                        var boardId = data[i]._id;
                        $('#add-board-btn').before(`<button id=${boardId} class="board-option">${boardName}<span class='delete-board-btn'><i class="fa fa-times" aria-hidden="true"></i></span></button>`);
                }
        });

        // ask for new boad name
        $('#boards-container').on('click', '.board-option #add-board-btn', function (e) {
                $('#' + e.target.id).before(`
                        <li id="input-box">
                                <textarea type='text' id='new-board-input'/></textarea>
                                <button id='new-board-input-btn-add'>Add</button>
                                <button id='new-board-input-btn-cancel'><i class="fa fa-times" aria-hidden="true"></i></button>
                        </li>`);
                $('#' + e.target.id).remove();
        });

        // get new board name and add the board
        $('#boards-container').on('click', '#new-board-input-btn-add', function (e) {
                var boardName = $('#new-board-input')[0].value;
                $.ajax({
                        type: "POST",
                        url: `http://localhost:3000/api/${username}/board`,
                        contentType: "application/x-www-form-urlencoded",
                        data: {
                                boardName: boardName,
                        },
                        success: function (data) {
                                $('#' + e.target.id).parent().parent().append(`
                                        <li><button id=${data._id} class="board-option">${boardName}<span class='delete-board-btn'><i class="fa fa-times" aria-hidden="true"></i></span></button></li>
                                        <button id='add-board-btn' class="board-option">Create new Board...</button>`);
                                $('#' + e.target.id).parent().remove();
                        }
                });
        });

        // cancel adding new board
        $('#boards-container').on('click', '#new-board-input-btn-cancel', function (e) {
                $(e.target).parent().parent().html(`<button id='add-board-btn' class="board-option">Create new Board...</button>`);
        });

        // delete a board
        $('#boards-container').on('click', '.delete-board-btn', function (e) {
                var boardId = $(e.target).parent().parent()[0].id;
                $.ajax({
                        type: "DELETE",
                        url: `http://localhost:3000/api/${username}/board/${boardId}`,
                        contentType: "application/x-www-form-urlencoded",
                        success: function (data) {
                                $(e.target).parent().parent().remove();
                        }
                });
        });

        // click on a board -> redirects to corresponding board page
        $('#boards-container').on('click', '.board-option', function (e) {
                var boardId = $(e.target).id;
                window.location.replace('http://localhost:3000/board');
        });

});