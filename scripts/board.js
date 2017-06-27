// Global variables
var list = new List();
var cardId = 0;
var username = "luan";

// Classes
function Card(id) {
        this.id = id;
}

function List() {
        this.cards = new Map();
        this.id = 0;

        this.createCard = function(card) {
                this.cards.set(this.id++, card);
                return this.id - 1;
        }

        this.addCard = function(card) {
                this.cards.set(card.id, card);
        }
}



// Menu
$(function() {
        $('#menu').on('click', '#show-menu-a', function(e) {
                $('#drop-down').addClass("show-menu");
        });

        $('#menu').on('click', '#close-menu-a', function(e) {
                $('#drop-down').removeClass("show-menu");
        });
});


// Modal
$(function() {
        // toggle a certain card in modal
        $('#lists').on('click', '.toggle-card', function(e) {
                var clickedCardId = e.target.id;
                $('#modal-body').html(`<h3> <i class="fa fa-trello gray-color" aria-hidden="true"></i> ` + $('#' + clickedCardId).text() + `</h3>
                        <div id='in-what-list'><p>in list <a href='#'>` + $('#' + clickedCardId).parent().parent().children().first().text() + `</a></div>
                        <h3><i class="fa fa-comment-o gray-color" aria-hidden="true"></i> Add Comment</h3>
                        <textarea type='text', id='comment-area'></textarea>
                        <h3><i class="fa fa-tasks gray-color" aria-hidden="true"></i> Activity</h3>
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
                        </div>`
                        );
                        $('#myModal').css({"display": "block"});
        });

        // delete card in modal
        $('#myModal').on('click', '.del-btn', function(e) {
                var cardId = e.target.id.substring(1); // delete button id is corresponding card id with a b in the beginning
                var listId = $('#' + cardId).parent().parent()[0].id;
                $.ajax({
                        url: `http://thiman.me:1337/${username}/list/${listId}/card/${cardId}`,
                        type: 'DELETE'
                });
                $('#' + cardId).remove();
                $('#myModal').hide();
        });

        // click elsewhere to close the modal
        $('#myModal').on('click', function(e) {
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
$(function() {
        // Load all the lists from the database
        $.get(`http://thiman.me:1337/${username}/list`, function(data) {
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
                                $('#c' + data[i]._id).before(`<li class='toggle-card' id=`+ data[i].cards[j]._id +`>` + data[i].cards[j].cardName + `</li>`);

                        }
                }
        });
        // delete a list
        $('#lists-container').on('click', '.fa-times', function(e) {
                var listId = e.target.parentNode.parentNode.parentNode.id;
                $('#' + listId).remove();
                $.ajax({
                        url: `http://thiman.me:1337/${username}/list/${listId}`,
                        type: 'DELETE'
                });
        });

        // ask for new list name
        $('#lists-container').on('click', '#add-list-btn', function(e) {
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
        // TODO: board.js:186 POST http://thiman.me:1337/luan/list/l5951dbbd2f51de67c344e3c8/card 500 (Internal Server Error)
        $('#lists-container').on('click', '#new-list-input-btn-add', function(e) {
                var listName = $('#new-list-input')[0].value;
                $.ajax({
                        type: "POST",
                        url: `http://thiman.me:1337/${username}/list`,
                        contentType:"application/x-www-form-urlencoded",
                        data : {listName: listName},
                        success: function(data){
                                $('#add-list-btn').before(`
                                        <li id=l` + data._id + `>
                                                <h3>` + listName + `</h3><span><button><i class="fa fa-times"  aria-hidden="true"></i></button></span>
                                                <ul class="cards-list">
                                                        <button type="button" class='add-card-btn' id=c` + data._id + `>Add a card...</a>
                                                </ul>
                                        </li>`);
                                $('#input-box').remove();
                        }
                });
        });

        // cancel creating new list
        $('#lists-container').on('click', '#new-list-input-btn-cancel', function(e) {
                $('#new-list-input-btn-cancel').parent().parent().remove();
        });
});



// Card
$(function() {
        // ask for new card name
        $('#lists').on('click', '.add-card-btn', function(e) {
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
        $('#lists').on('click', '#new-card-input-btn-add', function(e) {
                var cardName =  $('#new-card-input')[0].value;
                var listId = e.target.parentNode.parentNode.parentNode.parentNode.id;
                $.ajax({
                        type: "POST",
                        url: `http://thiman.me:1337/${username}/list/${listId}/card`,
                        contentType:"application/x-www-form-urlencoded",
                        data : {cardName: cardName},
                        success: function(data){
                                $('#card-input-box').before(`<li class='toggle-card' id=`+ data.cards[data.cards.length - 1]._id +`>` + cardName + `</li>`);
                                $('#card-input-box').remove();
                        }
                });
        });

        // cancel creating new card
        $('#lists').on('click', '#new-card-input-btn-cancel', function(e) {
                $('#card-input-box').remove();
        });
});