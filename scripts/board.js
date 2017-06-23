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

var modal = document.getElementById('myModal');
var list = new List();
var cardId = 0;

function showMenu() {
    document.getElementById("drop-down").classList.add("show-menu");
}

function closeMenu() {
        document.getElementById("drop-down").classList.remove("show-menu");
}

function deleteCardInModal(event) {
        var toggledCardId = event.target.id;
        var toggledCard = document.getElementById(toggledCardId);
        toggledCard.parentNode.removeChild(toggledCard);
        modal.style.display = "none";
}


function toggleCard(event) {
        var clickedCardId = event.target.id;
        document.getElementById("modal-body").innerHTML = `
                <h3>` + clickedCardId + `</h3>
                <button id=` + clickedCardId + ` onclick=deleteCardInModal(event)>Delete</button>
        `
        modal.style.display = "block";
}


// List
function getNewListName() {
        var listName =  document.getElementById('new-list-input').value;
        var currentId = list.createCard(new Card(""));
        document.getElementById("add-list-btn").insertAdjacentHTML("beforeBegin", `
        <li id=l` + currentId + `>
                <h3>` + listName + `</h3><span><button><i class="fa fa-ellipsis-h" aria-hidden="true"></i></button></span>
                <ul class="cards-list">
                        <button onclick="askForNewCardName(event)" type="button" id=c` + currentId + `>Add a card...</a>
                </ul>
        </li>`);
        var inputBox = document.getElementById("input-box");
        inputBox.parentNode.removeChild(inputBox);
}


function cancelNewList() {
        var inputBox = document.getElementById("input-box");
        inputBox.parentNode.removeChild(inputBox);
}

function askForNewListName(event) {
        document.getElementById(event.target.id).insertAdjacentHTML("beforeBegin",  `
        <li id="input-box">
                <ul class="cards-list">
                        <textarea type='text' id='new-list-input'/></textarea>
                        <button id='new-list-input-btn-add'>Add</button>
                        <button id='new-list-input-btn-cancel' onclick='cancelNewList'><i class="fa fa-times" aria-hidden="true"></i></button>
                </ul>
        </li>
        `);
        document.getElementById("new-list-input-btn-add").addEventListener("click", getNewListName);
        document.getElementById("new-list-input-btn-cancel").addEventListener("click", cancelNewList);
}

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


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("add-list-btn").addEventListener("click", askForNewListName);
