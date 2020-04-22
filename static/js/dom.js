// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
        init: function () {
            addNewBoardEventHandler();
            // This function should run once, when the page is loaded.
        },
        loadBoards: function () {
            // retrieves boards and makes showBoards called
            dataHandler.getBoards(function (boards) {
                dataHandler.getStatuses(function (statuses) {
                    for (let board of boards) {
                        dataHandler.getCards(function (cards) {
                            dom.showBoard(board, statuses, cards);
                        }, board.id)
                    }

                });
            });
        },
        showBoard: function (board, statuses, cards) {
            // shows boards appending them to #boards div
            // it adds necessary event listeners also
            let boardDivId = `board${board.id}`;
            let boardList = '';
            boardList += this.generateBoardHtml(board.id, board.title);
            let statusList = '';

            for (let status of statuses) {
                statusList += this.generateStatusHtml(status.id, status.title);
                let cardList = '';

                for (let card of cards) {
                    if (card.status_id === status.id) {
                        cardList += this.generateCardHtml(card.id, card.title);
                    }
                }
                const innerHTML = `
                <div class="board-column-content">
                    ${cardList}
                </div>
                `;
                statusList += innerHTML;
                statusList += `
                </div>
                `;
            }
            const outerHtml = `
            <div class="board-columns" id="${boardDivId}">
                ${statusList}
            </div>
        `;
            boardList += outerHtml;
            boardList += `
            </section>`;

            let boardsContainer = document.querySelector('.board-container');
            boardsContainer.insertAdjacentHTML('beforeend', boardList);

            let boardToggleList = document.querySelectorAll('.board-toggle');
            for (let toggle of boardToggleList) {
                toggle.addEventListener('click', this.toggleBoard);
            }

            initAddButton(boardDivId);

        },
        generateCardHtml: function (cardId, cardTitle) {
            return `
        <div class="card" data-card-id="${cardId}">
            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
            <div class="card-title">${cardTitle}</div>
        </div>
        `;
        },
        generateStatusHtml: function (statusId, statusTitle) {
            return `
        <div class="board-column" data-board-column-id="${statusId}">
            <div class="board-column-title">${statusTitle}</div>
        `;
        },
        generateBoardHtml: function (boardId, boardTitle) {
            return `
        <section class="board" data-board-id="${boardId}">
            <div class="board-header"><span class="board-title">${boardTitle}</span>
                <input  type="text" class="input-new-card-title" required placeholder="Enter New Card content" hidden>
                <input  type="text" class="input-new-card-status" required placeholder="Enter New Card's status" hidden>
                <button class="add-new-card" type="submit">Add Card</button>
                <button class="board-toggle" id="toggle${boardId}">Toggle Board<i class="fas fa-chevron-down"></i></button>
            </div>
        `
        },
        toggleBoard: function (e) {
            let domId = e.target.getAttribute('id');
            let id = 'board' + domId.slice(6);
            let x = document.getElementById(id);
            let style = getComputedStyle(x);
            if (style.display === "none") {
                x.style.display = "flex";
            } else {
                x.style.display = "none";
            }
        },

    }
;

//new things

function addNewBoardEventHandler() {
    const addButton = document.querySelector('#board-add');
    const inputTitle = document.querySelector("#input-new-board-title");
    const addBoardButton = document.querySelector('.add-board-button');
    addBoardButton.addEventListener('click', function () {
        inputTitle.hidden = false;
    });
    addButton.addEventListener('click', function () {
        let newBoardTitle = inputTitle.value;
        if (newBoardTitle !== "") {
            dataHandler.addBoard(newBoardTitle, function (data) {
                let newBoardString = `        
            <section class="board" data-board-id="${data[0]['id']}" >
            <div class="board-header"><span class="board-title">${data[0]['title']}</span>
                <input  type="text" class="input-new-card-title" required placeholder="Enter New Card content">
                <input  type="text" class="input-new-card-status" required placeholder="Enter New Card's status">
                <button class="card-add">Add Card</button>
                <button class="board-toggle" id="toggle${data[0]['id']}">Toggle Board<i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="board-columns" id="board${data[0]['id']}">
                <div class="board-column">
                    <div class="board-column-title">New</div>
                        <div class="board-column-content"></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">In Progress</div>
                        <div class="board-column-content"></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Testing</div>
                        <div class="board-column-content"></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Done</div>
                        <div class="board-column-content"></div>
                </div>
             </div>
            </section>`
                let boardsContainer = document.querySelector('.board-container');
                boardsContainer.insertAdjacentHTML('beforeend', newBoardString);
                inputTitle.hidden = true;
            })
        }
    })
}

function initAddButton(boardDivId) {
    const boardDiv = document.querySelector(`#${boardDivId}`);
    let addCardButton = boardDiv.parentElement.querySelector('.add-new-card');
    addCardButton.addEventListener('click', addNewCardEventHandler);
}

function addNewCardEventHandler(e) {
    let board = e.target.closest('.board');
    let inputCardTitle = board.querySelector('.input-new-card-title');
    let newCardContent = inputCardTitle.value;
    let inputCardStatus = board.querySelector('.input-new-card-status');
    let newCardStatus = inputCardStatus.value;
    let newCardBoardId = board.dataset.boardId;
    inputCardTitle.hidden = false;
    inputCardStatus.hidden = false;
    dataHandler.addCard(newCardContent, newCardStatus, newCardBoardId, function (data) {
        let newCardString = `
            <div class="card" data-card-id="${data[0]['board_id']}">
            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
            <div class="card-title">${newCardContent}</div>
            </div>`
        let cardsContainer = board.querySelector(`[data-board-column-id="${newCardStatus}"] .board-column-content`);
        cardsContainer.insertAdjacentHTML('beforeend', newCardString);
        inputCardTitle.value = "";
        inputCardStatus.value = "";
        inputCardTitle.hidden = true;
        inputCardStatus.hidden = true;
    })
}





