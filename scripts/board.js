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

// var modal = document.getElementById('myModal');
var modal = $('#myModal')[0];
var list = new List();
var cardId = 0;

function showMenu() {
    // document.getElementById("drop-down").classList.add("show-menu");
    $('#drop-down').addClass("show-menu");
}

function closeMenu() {
        // document.getElementById("drop-down").classList.remove("show-menu");
        $('#drop-down').removeClass("show-menu");
}
//
// function showLabelPickerMenu() {
//         document.getElementById("label-drop-down").classList.add("show-menu");
// }
//
// function closeLabelPickerMenu() {
//         document.getElementById("label-drop-down").classList.remove("show-menu");
// }
$(function() {
        $('#myModal').on('click', '.del-btn', function(e) {
                $('#' + e.target.id).remove();
                $('#myModal').css("display", "none");
        });
});

// function deleteCardInModal(event) {
//         var toggledCardId = event.target.id;
//         var toggledCard = document.getElementById(toggledCardId);
//         toggledCard.parentNode.removeChild(toggledCard);
//         modal.style.display = "none";
// }


function toggleCard(event) {
        var clickedCardId = event.target.id;
        document.getElementById("modal-body").innerHTML = `<h3>` + clickedCardId + `</h3>
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
                </span>

                `
        modal.style.display = "block";
}

// List
$(function() {
        // delete a list
        $('#lists-container').on('click', '.fa-times', function(e) {
                $('#' + e.target.parentNode.parentNode.parentNode.id).remove();
        });

        // ask for new list name
        $('#lists-container').on('click', '#add-list-btn', function(e) {
                $('#' + e.target.id).prepend(`
                        <li id="input-box">
                                <ul class="cards-list">
                                        <textarea type='text' id='new-list-input'/></textarea>
                                        <button id='new-list-input-btn-add'>Add</button>
                                        <button id='new-list-input-btn-cancel'><i class="fa fa-times" aria-hidden="true"></i></button>
                                </ul>
                        </li>`);
        });


        // get new list name
        $('#lists-container').on('click', '#new-list-input-btn-add', function(e) {
                var listName = $('#new-list-input')[0].value;
                var currentId = list.createCard(new Card(""));
                $('#add-list-btn').parent().prepend(`
                <li id=l` + currentId + `>
                        <h3>` + listName + `</h3><span><button><i class="fa fa-times"  aria-hidden="true"></i></button></span>
                        <ul class="cards-list">
                                <button onclick="askForNewCardName(event)" type="button" id=c` + currentId + `>Add a card...</a>
                        </ul>
                </li>`);
                $('#input-box').remove();
        });

        // cancel creating new list
        $('#lists-container').on('click', '#new-list-input-btn-cancel', function(e) {
                $('#new-list-input-btn-cancel').parent().parent().remove();
        });

});

// function deleteList(event) {
//         var listToDelete = event.target.parentNode.parentNode.parentNode;
//         listToDelete.parentNode.removeChild(listToDelete);
// }

// function getNewListName() {
//         var listName =  document.getElementById('new-list-input').value;
//         var currentId = list.createCard(new Card(""));
//         document.getElementById("add-list-btn").insertAdjacentHTML("beforeBegin", `
//         <li id=l` + currentId + `>
//                 <h3>` + listName + `</h3><span><button><i class="fa fa-times"  aria-hidden="true"></i></button></span>
//                 <ul class="cards-list">
//                         <button onclick="askForNewCardName(event)" type="button" id=c` + currentId + `>Add a card...</a>
//                 </ul>
//         </li>`);
//         var inputBox = document.getElementById("input-box");
//         inputBox.parentNode.removeChild(inputBox);
// }


// function cancelNewList() {
//         var inputBox = document.getElementById("input-box");
//         inputBox.parentNode.removeChild(inputBox);
// }
//
// function askForNewListName(event) {
//         document.getElementById(event.target.id).insertAdjacentHTML("beforeBegin",  `
//         <li id="input-box">
//                 <ul class="cards-list">
//                         <textarea type='text' id='new-list-input'/></textarea>
//                         <button id='new-list-input-btn-add'>Add</button>
//                         <button id='new-list-input-btn-cancel'><i class="fa fa-times" aria-hidden="true"></i></button>
//                 </ul>
//         </li>
//         `);
//         // document.getElementById("new-list-input-btn-add").addEventListener("click", getNewListName);
//         // document.getElementById("new-list-input-btn-cancel").addEventListener("click", cancelNewList);
// }

// Card
function getNewCardName() {
        var cardName =  document.getElementById('new-card-input').value;
        cardId = parseInt(cardId, 10) + 1;

        document.getElementById("card-input-box").insertAdjacentHTML("beforeBegin", `<li onclick='toggleCard(event)' id=`+ cardId +`>` + cardName + `</li>`);

        var inputBox = document.getElementById("card-input-box");
        inputBox.parentNode.removeChild(inputBox);
}

function cancelNewCard() {
        var inputBox = document.getElementById("card-input-box");
        inputBox.parentNode.removeChild(inputBox);
}

function askForNewCardName(event) {
        document.getElementById(event.target.id).insertAdjacentHTML("beforeBegin",  `
        <li id="card-input-box">
                <ul class="cards-list">
                        <textarea type='text' id='new-card-input'/></textarea>
                        <button id='new-card-input-btn-add'>Add</button>
                        <button id='new-card-input-btn-cancel' onclick='cancelNewList'><i class="fa fa-times" aria-hidden="true"></i></button>
                </ul>
        </li>
        `);
        document.getElementById("new-card-input-btn-add").addEventListener("click", getNewCardName);
        document.getElementById("new-card-input-btn-cancel").addEventListener("click", cancelNewCard);
}


// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

// document.getElementById("add-list-btn").addEventListener("click", askForNewListName);
