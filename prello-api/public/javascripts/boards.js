// Boards
$(function () {

        // Load all the boards from the database
        $.get(`http://localhost:3000/api/${username}/board`, function (data) {
                for (var i = 0; i < data.length; i++) {
                        var boardName = data[i].boardName;
                        var boardId = data[i]._id;
                        $('#add-board-btn').before(`<button id=${boardId} class="board-option">${boardName}</button>`);
                }
        });

        // ask for new boad name
        $('#boards-container').on('click', '#add-board-btn', function (e) {
                $.ajax({
                        type: "POST",
                        url: `http://localhost:3000/api/${username}/board`,
                        contentType: "application/x-www-form-urlencoded",
                        data: {
                                boardName: req.body.boardName,
                        },
                        success: function (data) {
                                $('#' + e.target.id).before(`
                                        <li id="input-box">
                                                <ul class="cards-list">
                                                        <textarea type='text' id='new-list-input'/></textarea>
                                                        <button id='new-list-input-btn-add'>Add</button>
                                                        <button id='new-list-input-btn-cancel'><i class="fa fa-times" aria-hidden="true"></i></button>
                                                </ul>
                                        </li>`);
                                        // TODO: working on this
                        }
                });
        });
});