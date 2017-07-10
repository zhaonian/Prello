// Global variables
var list = new List();
var cardId = 0;
var username = $('html').attr('id');

// Classes
function Card(id) {
        this.id = id;
}

function List() {
        this.cards = new Map();
        this.id = 0;

        this.createCard = function (card) {
                this.cards.set(this.id++, card);
                return this.id - 1;
        }

        this.addCard = function (card) {
                this.cards.set(card.id, card);
        }
}



// Menu
$(function () {
        $('#menu').on('click', '#show-menu-a', function (e) {
                $('#drop-down').addClass("show-menu");
        });

        $('#menu').on('click', '#close-menu-a', function (e) {
                $('#drop-down').removeClass("show-menu");
        });
});


// Modal
$(function () {
        // toggle a certain card in modal
        $('#lists').on('click', '.toggle-card', function (e) {
                var clickedCardId = e.target.id;
                $('#modal-body').html(`<h3 id='card-id-info' card-id=` + $('#' + clickedCardId)[0].id + ` list-id=` + $('#' + clickedCardId).parent().parent()[0].id + `> <i class="fa fa-trello gray-color" aria-hidden="true"></i> ` + $('#' + clickedCardId).text() + `</h3>
                        <div id='in-what-list'><p>in list <a href='#'>` + $('#' + clickedCardId).parent().parent().children().first().text() + `</a></div>
                        <h3><i class="fa fa-comment-o gray-color" aria-hidden="true"></i> Add Comment</h3>
                        <textarea type='text', id='comment-area'></textarea>
                        <button id='comment-add-btn'>Send</button>
                        <div id='modal-to-the-right'>
                                <div id='modal-btn-container'>
                                        <h3>Add</h3>
                                        <button class='modal-btn'><i class="fa fa-user-o" aria-hidden="true"></i> Members</button>
                                        <button class='modal-btn'><i class="fa fa-tag" aria-hidden="true"></i> Labels</button>
                                        <button class='modal-btn'><i class="fa fa-check-square-o" aria-hidden="true"></i> Checklist</button>
                                        <button class='modal-btn'><i class="fa fa-clock-o" aria-hidden="true"></i> Due Date</button>
                                        <button class='modal-btn'><i class="fa fa-paperclip" aria-hidden="true"></i> Attachment</button>
                                </div>
                                <div id='modal-btn-container'>
                                        <h3>Actions</h3>
                                        <button class='modal-btn'><i class="fa fa-long-arrow-right" aria-hidden="true"></i> Move</button>
                                        <button class='modal-btn'><i class="fa fa-clone" aria-hidden="true"></i> Copy</button>
                                        <button class='modal-btn'><i class="fa fa-eye" aria-hidden="true"></i> Subscribe</button>
                                        <button id=b` + clickedCardId + `  class='del-btn modal-btn'><i class="fa fa-archive" aria-hidden="true"></i> Archive</button>
                                </div>
                        </div>
                        <div id='activity-container'><h3 id='activity-title'><i class="fa fa-tasks gray-color" aria-hidden="true"></i> Activity</h3></div>`
                );
                // TODO: ajax GET all the comments from db
                // for (var i = 0; i < ) {
                //         $('#activity-title').after(`<div class='comment-entry'><span class='comment-owner'><i class="fa fa-user" aria-hidden="true"></i> ` + username + `</span><span class='comment-content'>` + $('#comment-area').val() + `</div><hr id='comment-separation-line'>`);

                // }
                $('#myModal').css({ "display": "block" });


                // Load all the comments to the modal
                var listId = $('#' + clickedCardId).parent().parent()[0].id;
                var cardId = clickedCardId;
                $.ajax({
                        type: "GET",
                        url: `http://localhost:3000/api/comment/list/${listId}/card/${cardId}`,
                        contentType: "application/x-www-form-urlencoded",
                        // data: {
                        //         username: username,
                        // },
                        success: function (data) {
                                for (var i = 0; i < data.length; i++) {
                                        $('#activity-title').after(`<div class='comment-entry'><span class='comment-owner'><i class="fa fa-user" aria-hidden="true"></i> ` + data[i].key + `</span><span class='comment-content'>` + data[i].comment + `</div><hr id='comment-separation-line'>`);
                                }
                        }
                });
        });

        // delete card in modal
        $('#myModal').on('click', '.del-btn', function (e) {
                var cardId = e.target.id.substring(1); // delete button id is corresponding card id with a b in the beginning
                var listId = $('#' + cardId).parent().parent()[0].id;
                $.ajax({
                        url: `http://localhost:3000/api/${username}/list/${listId}/card/${cardId}`,
                        type: 'DELETE'
                });
                $('#' + cardId).remove();
                $('#myModal').hide();
        });

        // click elsewhere to close the modal
        $('#myModal').on('click', function (e) {
                var node = e.target;
                while (node != null) {
                        if (node.className == 'modal-content')
                                return false;
                        node = node.parentNode;
                }
                $('#myModal').hide();
        });
});


// List
$(function () {
        // Load all the lists from the database
        $.get(`http://localhost:3000/api/${username}/list`, function (data) {
                for (var i = 0; i < data.length; i++) {
                        var listName = data[i].listName;

                        $('#add-list-btn').before(`
                        <li id=` + data[i]._id + `>
                                <h3>${listName}</h3><span><button><i class="fa fa-times"  aria-hidden="true"></i></button></span>
                                <ul class="cards-list">
                                        <button type="button" class='add-card-btn' id=c` + data[i]._id + `>Add a card...</a>
                                </ul>
                        </li>`);
                        for (var j = 0; j < data[i].cards.length; j++) {
                                var card = new Card(data[i].cards[j]._id);
                                list.addCard(card);
                                $('#c' + data[i]._id).before(`<li class='toggle-card' id=` + data[i].cards[j]._id + `>` + data[i].cards[j].cardName + ` -` + data[i].cards[j].key + `</li>`);

                        }
                }
        });
        // delete a list
        $('#lists-container').on('click', '.fa-times', function (e) {
                var listId = e.target.parentNode.parentNode.parentNode.id;
                $('#' + listId).remove();
                $.ajax({
                        url: `http://localhost:3000/api/${username}/list/${listId}`,
                        type: 'DELETE'
                });
        });

        // ask for new list name
        $('#lists-container').on('click', '#add-list-btn', function (e) {
                $('#' + e.target.id).before(`
                        <li id="input-box">
                                <ul class="cards-list">
                                        <textarea type='text' id='new-list-input'/></textarea>
                                        <button id='new-list-input-btn-add'>Add</button>
                                        <button id='new-list-input-btn-cancel'><i class="fa fa-times" aria-hidden="true"></i></button>
                                </ul>
                        </li>`);
        });

        // get new list name and add new list
        $('#lists-container').on('click', '#new-list-input-btn-add', function (e) {
                var listName = $('#new-list-input')[0].value;
                $.ajax({
                        type: "POST",
                        url: `http://localhost:3000/api/${username}/list`,
                        contentType: "application/x-www-form-urlencoded",
                        data: { listName: listName },
                        success: function (data) {
                                $('#add-list-btn').before(`
                                        <li id='` + data._id + `'>
                                                <h3>` + listName + `</h3><span><button><i class="fa fa-times"  aria-hidden="true"></i></button></span>
                                                <ul class="cards-list">
                                                        <button type="button" class='add-card-btn' id='` + data._id + `'>Add a card...</a>
                                                </ul>
                                        </li>`);
                                $('#input-box').remove();
                        }
                });
        });
        // cancel creating new list
        $('#lists-container').on('click', '#new-list-input-btn-cancel', function (e) {
                $('#new-list-input-btn-cancel').parent().parent().remove();
        });
});



// Card
$(function () {
        // ask for new card name
        $('#lists').on('click', '.add-card-btn', function (e) {
                $('#' + e.target.id).before(`
                <li id="card-input-box">
                        <ul class="cards-list">
                                <textarea type='text' id='new-card-input'/></textarea>
                                <button id='new-card-input-btn-add'>Add</button>
                                <button id='new-card-input-btn-cancel'><i class="fa fa-times" aria-hidden="true"></i></button>
                        </ul>
                </li>`);
        });

        // get new card name and add a new card
        $('#lists').on('click', '#new-card-input-btn-add', function (e) {
                var cardName = $('#new-card-input')[0].value;
                var listId = e.target.parentNode.parentNode.parentNode.parentNode.id;
                listId = listId.charAt(0) === 'l' ? listId.slice(1) : listId;
                $.ajax({
                        type: "POST",
                        url: `http://localhost:3000/api/${username}/list/${listId}/card`,
                        contentType: "application/x-www-form-urlencoded",
                        data: {
                                key: username,
                                cardName: cardName
                        },
                        success: function (data) {
                                $('#card-input-box').before(`<li class='toggle-card' id=` + data.cards[data.cards.length - 1]._id + `>` + cardName + `<span id='card-username'> -` + username + `</span></li>`);
                                $('#card-input-box').remove();
                        }
                });
        });

        // cancel creating new card
        $('#lists').on('click', '#new-card-input-btn-cancel', function (e) {
                $('#card-input-box').remove();
        });
});


// Comment
$(function () {
        var commentEmpty = true;
        $('#modal-body').on('click', '#comment-add-btn', function (e) {
                var cardId = $('#card-id-info').attr('card-id');
                var listId = $('#card-id-info').attr('list-id');
                if (!commentEmpty) {
                        $.ajax({
                                type: "POST",
                                url: `http://localhost:3000/api/comment/list/${listId}/card/${cardId}/add`,
                                contentType: "application/x-www-form-urlencoded",
                                data: {
                                        username: username,
                                        comment: $('#comment-area').val()
                                },
                                success: function (data) {
                                        $('#activity-title').after(`<div class='comment-entry'><span class='comment-owner'><i class="fa fa-user" aria-hidden="true"></i> ` + username + `</span><span class='comment-content'>` + $('#comment-area').val() + `</div><hr id='comment-separation-line'>`);
                                }
                        });
                }
        });

        $('#modal-body').on('keyup', '#comment-area', function (e) {
                if ($.trim($('#comment-area').val())) {
                        $('#comment-add-btn').css({
                                'background': 'rgb(92, 178, 72)',
                                'color': 'white'
                        });
                        commentEmpty = false;
                } else {
                        $('#comment-add-btn').css({
                                'background-color': 'rgb(226, 228, 230)',
                                'color': 'rgb(145, 145, 145)'
                        });
                        commentEmpty = true;
                }
        });
});