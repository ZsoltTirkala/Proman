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
            console.log(boardDivId);
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
                toggle.addEventListener('click', this.hideBoard);
            }
            const deleteIcons = document.querySelectorAll('.del-icon');
            changeIconHover(deleteIcons);
            const renameIcons = document.querySelectorAll('.rename-icon');
            changeIconHover(renameIcons);
            initAddCard(boardDivId);
            initStatusButton(boardDivId);
            initDeleteBoardButton(boardDivId);
            initRenameBoardButton(boardDivId);
            initDeleteCardIcon();
            initRenameCardButton()
        },
        generateCardHtml: function (cardId, cardTitle) {
            return `
        <div class="card" data-card-id="${cardId}">
            <div class="card-remove"><img class="del-icon" src="static/img/delete.png"></div>
            <div class="card-rename"><img class="rename-icon" src="static/img/rename.png"></div>
            <div class="card-title">${cardTitle}</div>
        </div>
        `;
        },
        generateStatusHtml: function (statusId, statusTitle) {
            return `
        <div class="board-column" data-board-column-id="${statusId}">
            <div class="board-column-title">${statusTitle}(${statusId})</div>
        `;
        },
        generateBoardHtml: function (boardId, boardTitle) {
            return `
        <section class="board" data-board-id="${boardId}">
            <div class="board-header"><span class="board-title">${boardTitle}</span>
                <input  type="text" class="input-new-card-title" required placeholder="Enter New Card content" hidden>
                <input  type="text" class="input-new-card-status" required placeholder="Enter New Card's status" hidden>
                <button class="add-new-card" type="submit">Add Card</button>
                <input  type="text" class="input-new-status-title" required placeholder="Enter New Status Name" hidden>
                <button class="add-new-status" type="submit">Add Status</button>
                <button class="rename-board">Rename Board</button>
                <button class="delete-board-button" ><img class="del-icon" src="static/img/delete.png"></button>
                <button class="board-toggle" id="toggle${boardId}">Hide<i class="fas fa-chevron-down"></i></button>
            </div>
        `
        },
        hideBoard: function (e) {
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
                <input  type="text" class="input-new-card-title" required placeholder="Enter New Card content" hidden>
                <input  type="text" class="input-new-card-status" required placeholder="Enter New Card's status" hidden>
                <button class="add-new-card" type="submit">Add Card</button>
                <input  type="text" class="input-new-status-title" required placeholder="Enter New Status Name" hidden>
                <button class="add-new-status" type="submit">Add Status</button>
                <button class="rename-board">Rename Board</button>
                <button class="delete-board-button" ><img class="del-icon" src="static/img/delete.png"></button>
                <button class="board-toggle" id="toggle${data[0]['id']}">Hide<i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="board-columns" id="board${data[0]['id']}">
                <div class="board-column" data-board-column-id="1">
                    <div class="board-column-title">New(1)</div>
                        <div class="board-column-content"></div>
                </div>
                <div class="board-column" data-board-column-id="2">
                    <div class="board-column-title">In Progress(2)</div>
                        <div class="board-column-content"></div>
                </div>
                <div class="board-column"  data-board-column-id="3">
                    <div class="board-column-title">Testing(3)</div>
                        <div class="board-column-content"></div>
                </div>
                <div class="board-column" data-board-column-id="4">
                    <div class="board-column-title">Done(4)</div>
                        <div class="board-column-content"></div>
                </div>
             </div>
            </section>`
                let boardsContainer = document.querySelector('.board-container');
                boardsContainer.insertAdjacentHTML('beforeend', newBoardString);

                let boardHideList = document.querySelectorAll('.board-toggle');
                for (let toggle of boardHideList) {
                    toggle.addEventListener('click', dom.hideBoard);
                }
                inputTitle.hidden = true;
                const deleteIcons = document.querySelectorAll('.del-icon');
                changeIconHover(deleteIcons);
                initAddCard(`board${data[0]['id']}`);
                initStatusButton(`board${data[0]['id']}`);
                initDeleteBoardButton(`board${data[0]['id']}`);
                initRenameBoardButton(`board${data[0]['id']}`);
            })
        }
    })
}

function initAddCard(boardDivId) {
    const boardDiv = document.querySelector(`#${boardDivId}`);
    let addCardButton = boardDiv.parentElement.querySelector('.add-new-card');
    addCardButton.addEventListener('click', addNewCardEventHandler);
}

function initStatusButton(boardDivId) {
    const boardDiv = document.querySelector(`#${boardDivId}`);
    let addCardButton = boardDiv.parentElement.querySelector('.add-new-status');
    addCardButton.addEventListener('click', addNewStatusEventHandler);
}

function initDeleteBoardButton(boardDivId) {
    const boardDiv = document.querySelector(`#${boardDivId}`);
    let deleteBoardButton = boardDiv.parentElement.querySelector('.delete-board-button');
    deleteBoardButton.addEventListener('click', deleteBoardEventHandler);
}

function initRenameBoardButton(boardDivId) {
    const boardDiv = document.querySelector(`#${boardDivId}`);
    let renameBoardButton = boardDiv.parentElement.querySelector(`.rename-board`);
    renameBoardButton.addEventListener('click', renameBoardEventHandler);

}

function initDeleteCardIcon() {
    const boards = document.querySelectorAll(`.board`);
    for (let board of boards) {
        let cardIcon = board.querySelectorAll('.del-icon');
        for (let icon of cardIcon) {
            if (icon !== null) {
                icon.addEventListener('click', deleteCardEventHandler);
            }
        }
    }
}

function initRenameCardButton() {
    const boards = document.querySelectorAll(`.board`);
    for (let board of boards) {
        let renameIcon = board.querySelectorAll(`.rename-icon`);
        for (let icon of renameIcon) {
            if (icon !== null) {
                icon.addEventListener('click', renameCardEventHandler);
            }
        }
    }

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
    if (newCardContent !== "" && newCardStatus !== "") {
        dataHandler.addCard(newCardContent, newCardStatus, newCardBoardId, function (data) {
            let newCardString = `
            <div class="card" data-card-id="${data[0]['id']}">
            <div class="card-remove"><img class="del-icon" src="static/img/delete.png"></div>
            <div class="card-rename"><img class="rename-icon" src="static/img/rename.png"></div>
            <div class="card-title">${newCardContent}</div>
            </div>`
            let cardsContainer = board.querySelector(`[data-board-column-id="${newCardStatus}"] .board-column-content`);
            cardsContainer.insertAdjacentHTML('beforeend', newCardString);
            inputCardTitle.value = "";
            inputCardStatus.value = "";
            inputCardTitle.hidden = true;
            inputCardStatus.hidden = true;
            const deleteIcons = document.querySelectorAll('.del-icon');
            changeIconHover(deleteIcons);
            const renameIcons = document.querySelectorAll('.rename-icon');
            changeIconHover(renameIcons);
            initDeleteCardIcon();
            initRenameCardButton();
        })

    }
}

function addNewStatusEventHandler(e) {
    let board = e.target.closest(`.board`);
    let inputStatusTitle = board.querySelector('.input-new-status-title');
    let newStatusContent = inputStatusTitle.value;
    let newStatusBoardId = board.dataset.boardId;
    console.log(newStatusBoardId);
    inputStatusTitle.hidden = false;
    if (newStatusContent !== "") {
        dataHandler.addStatus(newStatusContent, newStatusBoardId, function (data) {
            console.log(data);
            let newStatusString = `
        <div class="board-column" data-board-column-id="${data[0]['id']}">
            <div class="board-column-title">${newStatusContent} (${data[0]['id']})</div>
            <div class="board-column-content"></div>
        </div>`
            let statusesContainer = board.querySelector(`.board-columns`);
            statusesContainer.insertAdjacentHTML('beforeend', newStatusString);
            inputStatusTitle.value = "";
            inputStatusTitle.hidden = true;

        })
    }
}

function renameCardEventHandler(e) {
    const card = e.target.closest('.card');
    let cardId = card.dataset.cardId;
    let cardSelect = card.querySelector(`.card-title`);
    let cardContent = cardSelect.innerHTML;
    let newTitle = prompt('Edit your card!',`${cardContent}`)
    if (newTitle != null){
        dataHandler.renameCard(cardId,newTitle, function (data) {
            cardSelect.innerHTML = `${data[0]['title']}`;
    })}
}

function renameBoardEventHandler(e) {
    let board = e.target.closest('.board');
    let boardId = board.dataset.boardId;
    let boardSelect = board.querySelector(`.board-title`);
    let boardTitleContent = boardSelect.innerHTML;
    let newBoardTitle = prompt('Edit your board name!',`${boardTitleContent}`);
    if (newBoardTitle != null) {
        dataHandler.renameBoard(boardId,newBoardTitle, function (data) {
            boardSelect.innerHTML = `${data[0]['title']}`
            }
        )
    }
}

function deleteBoardEventHandler(e) {
    let board = e.target.closest('.board');
    let boardId = board.dataset.boardId;
    dataHandler.deleteBoard(boardId, function () {
        deleteDomElement(board)
    })
}
function deleteCardEventHandler(e) {
    let card = e.target.closest('.card');
    let cardId = card.dataset.cardId;
    dataHandler.deleteCard(cardId, function () {
        deleteDomElement(card)
    })
}

function deleteDomElement(selected) {
    selected.remove();
}

function changeIconHover(selected) {
    const deleteIcons = selected;
    for (let img of deleteIcons) {
        img.addEventListener('mouseenter', function (e) {
            e.target.style.opacity = "1";
        })
        img.addEventListener('mouseleave', function (e) {
            e.target.style.opacity = "0.2";
        })
    }
}








