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
                        dom.showBoards(board, statuses, cards);
                    }, board.id)
                }

            });
        });
    },
    showBoards: function (board, statuses, cards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
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
            <div class="board-columns" id="board${board.id}">
                ${statusList}
            </div>
        `;
        boardList += outerHtml;
        boardList += `
            </section>`;


        let boardsContainer = document.querySelector('.board-container');
        boardsContainer.insertAdjacentHTML('beforeend', boardList);
        addNewCardEventHandler();

        let boardToggleList = document.querySelectorAll('.board-toggle');
        for (let toggle of boardToggleList) {
            toggle.addEventListener('click', this.toggleBoard);
        }
        // addNewBoard();
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
                <input  type="text" class="input-new-card-title" required placeholder="Enter New Card content">
                <input  type="text" class="input-new-card-status" required placeholder="Enter New Card's status">
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


};

//new things

function addNewBoardEventHandler() {
    let addButton = document.querySelector('#board-add');
    addButton.addEventListener('click', function () {
        let inputTitle = document.querySelector("#input-new-board-title");
        let newBoardTitle = inputTitle.value;
        console.log(inputTitle);
        console.log(newBoardTitle);
        dataHandler.addBoard(newBoardTitle, function (data) {
            console.log(data);
            let newBoardString = `        
            <section class="board" data-board-id="${data[0]['id']}">
            <div class="board-header"><span class="board-title">${data[0]['title']}</span>
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

        })
    })
};

function addNewCardEventHandler() {
    let addCardButton = document.querySelector('.add-new-card');
    console.log(addCardButton);
    if (addCardButton) {
        addCardButton.addEventListener('click', function () {
            let inputCardTitle = document.querySelector('.input-new-card-title');
            let newCardContent = inputCardTitle.value;
            let inputCardStatus = document.querySelector('.input-new-card-status');
            let newCardStatus = inputCardStatus.value;

            dataHandler.addCard(newCardContent, newCardStatus, 3,function (data) {
                let newCardString = `
            <div class="card" data-card-id="${data[0]['id']}">
            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
            <div class="card-title">${newCardContent}</div>
            </div>`
                let cardsContainer = document.querySelector('.board-column-content');
                cardsContainer.insertAdjacentHTML('afterend', newCardString);
            })
        })
    }
};
// function addNewCardEventHandler() {
//     let getCardsBoardId = document.querySelector('.board');
//     let cardsBoardId = getCardsBoardId.dataset.boardId;
//     let newCard = document.querySelector('.add-new-card');
//     if (newCard) {
//         newCard.addEventListener('click', function () {
//             let addCardSelector = document.querySelector('#input-new-card-title');
//             let addCardValue = addCardSelector.value;
//             console.log(addCardSelector);
//             console.log(addCardValue);
//             dataHandler.addCard(addCardValue, function (data) {
//                 console.log(data);
//                 let newCardString = `
//                 <div class="card" data-card-id="${data[0]['id']}">
//                     <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
//                     <div class="card-title">${addCardValue}</div>
//                 </div>`;
//                 let getBoardColumnsId = document.querySelector('.board-columns');
//                 for (let i = 0; i<getBoardColumnsId.length; i++) {
//                     if (cardsBoardId === getBoardColumnsId[i].id) {
//                         let boardColumndId = document.querySelector('.board-column');
//                         for (let i = 0; i<boardColumndId.length; i++) {
//                             if (boardColumndId.dataset.boardColumnId === 2) {
//                                 boardColumndId.insertAdjacentHTML('beforeend', newCardString);
//                             }
//                         }
//                     }
//                 }
//             })
//         })
//     }




