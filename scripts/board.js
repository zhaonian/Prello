// Global variables
var list = new List();
var cardId = 0;

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
                $('#modal-body').replaceWith(`<h3> <i class="fa fa-trello gray-color" aria-hidden="true"></i> ` + $('#' + clickedCardId).text() + `</h3>
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
                                        <button id=` + clickedCardId + `  class='del-btn modal-btn'><i class="fa fa-archive" aria-hidden="true"></i> Archive</button>
                                </div>
                        </div>`
                        );
                        $('#myModal').css({"display": "block"});
        });



        // delete card in modal
        $('#myModal').on('click', '.del-btn', function(e) {
                $('#' + e.target.id).remove();
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
        // Load all the data from the database
        $.get("http://thiman.me:1337/" + "${username}" + "/list", function(data) {
                // var listName = $('#new-list-input')[0].value;
                for (var i = 0; i < data.length; i++) {
                        var card = new Card(data[i]._id);
                        list.addCard(card);
                        $('#add-list-btn').before(`
                        <li id=` + data[i]._id + `>
                                <h3>aa</h3><span><button><i class="fa fa-times"  aria-hidden="true"></i></button></span>
                                <ul class="cards-list">
                                        <button type="button" class='add-card-btn' id=c` + data[i]._id + `>Add a card...</a>
                                </ul>
                        </li>`);
                }
        });
        // delete a list
        $('#lists-container').on('click', '.fa-times', function(e) {
                $('#' + e.target.parentNode.parentNode.parentNode.id).remove();
                var listId = e.target.parentNode.id;
                $.post(`http://thiman.me:1337/${username}/list/${listId}`, {
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
        var username = "luan";
        $('#lists-container').on('click', '#new-list-input-btn-add', function(e) {
                $.post(`http://thiman.me:1337/${username}/list`, {
                });
                var listName = $('#new-list-input')[0].value;
                var currentId = list.createCard(new Card(""));
                $('#add-list-btn').before(`
                <li id=l` + currentId + `>
                        <h3>` + listName + `</h3><span><button><i class="fa fa-times"  aria-hidden="true"></i></button></span>
                        <ul class="cards-list">
                                <button type="button" class='add-card-btn' id=c` + currentId + `>Add a card...</a>
                        </ul>
                </li>`);
                $('#input-box').remove();
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
                cardId = parseInt(cardId, 10) + 1;
                $('#card-input-box').before(`<li class='toggle-card' id=`+ cardId +`>` + cardName + `</li>`);
                $('#card-input-box').remove();
        });

        // cancel creating new card
        $('#lists').on('click', '#new-card-input-btn-cancel', function(e) {
                $('#card-input-box').remove();
        });
});


// $(document).ready(function(){
//         $.get("http://thiman.me:1337/" + "${username}" + "/list", function(data) {
//                 for (var i = 0; i < data.length; i++) {
//                         var card = new Card(data[i]._id);
//                         list.addCard(card);
//                 }
//         });
// });
