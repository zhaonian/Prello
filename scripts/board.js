// Classes
function Card(comment) {
        this.comment = comment;
}

function List() {
        this.cards = new Map();
        this.id = 0;

        this.createCard = function(card) {
                this.cards.set(this.id++, card);
                return this.id - 1;
        }
}

// Global variables
var list = new List();
var cardId = 0;

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
        $('#myModal').on('click', '.del-btn', function(e) {
                $('#' + e.target.id).remove();
                $('#myModal').hide();
        });
        // window.onclick = function(event) {
        //     if (event.target == $('#myModal')[0]) {
        //         $('#myModal')[0].style.display = "none";
        //     }
        // }
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
        // delete a list
        $('#lists-container').on('click', '.fa-times', function(e) {
                $('#' + e.target.parentNode.parentNode.parentNode.id).remove();
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
        $('#lists-container').on('click', '#new-list-input-btn-add', function(e) {
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

        // toggle a certain card
        $('#lists').on('click', '.toggle-card', function(e) {
                var clickedCardId = event.target.id;
                $('#modal-body').replaceWith(`<h3>` + clickedCardId + `</h3>
                        <button id=` + clickedCardId + `  class='del-btn'>Delete</button>` +
                        `
                        <span id="menu">
                                <a onclick="showLabelPickerMenu()"><i class="fa fa-ellipsis-h" aria-hidden="true"></i>Show menu</a>
                                <div id="label-drop-down" class="dropdown-content">
                                        <a id="menu-item"  onclick="closeLabelPickerMenu()"><i class="fa fa-times" aria-hidden="true"></i></a>
                                        <a id="menu-item" href="#">haha</a>
                                        <a id="menu-item" href="#">hehe</a>
                                        <a id="menu-item" href="#">xixi</a>
                                </div>
                        </span>`);
                        $('#myModal').css({"display": "block"});
        });
});
