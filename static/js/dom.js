// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            console.log(boards);
            dataHandler.getStatuses(function (statuses) {
                console.log(statuses);
                dataHandler.getCards(function (cards) {
                    console.log(cards);
                    dom.showBoards(boards, statuses, cards);
                })
            });
        });
    },
    showBoards: function (boards, statuses, cards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardList = '';

        for (let board of boards) {
            boardList += this.generateBoardHtml(board.id, board.title);
            let statusList = '';

            for (let status of statuses) {
                statusList += this.generateStatusHtml(status.id, status.title);
                let cardList = '';

                for (let card of cards) {
                    if (card.board_id === board.id && card.status_id === status.id) {
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
        }

        let boardsContainer = document.querySelector('.board-container');
        boardsContainer.insertAdjacentHTML('beforeend', boardList);

        let boardToggleList = document.querySelectorAll('.board-toggle');
        for (let toggle of boardToggleList) {
            toggle.addEventListener('click', this.toggleBoard);
        }
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
                <button class="board-add">Add Card</button>
                <button class="board-toggle" id="toggle${boardId}"><i class="fas fa-chevron-down"></i></button>
            </div>
        `
    },
    toggleBoard: function (e) {
        let domId = e.target.getAttribute('id');
        let id = 'board'+ domId.slice(6);
        let x = document.getElementById(id);
        let style = getComputedStyle(x);
        if (style.display === "none") {
        x.style.display = "flex";
        } else {
            x.style.display = "none";
        }
    }
    // loadStatuses: function () {
    //     dataHandler.getStatuses(function (statuses) {
    //         dom.showStatuses(statuses);
    //     });
    // },
    // showStatuses: function (statuses) {
    //     let statusList = '';
    //
    //     for (let status of statuses) {
    //         statusList += `
    //             <div class="board-column" data-board-column-id="${status.id}">
    //                 <div class="board-column-title">${status.title}</div>
    //                 <div class="board-column-content"></div>
    //             </div>
    //         `;
    //     }
    //     const outerHtml = `
    //         <div class="board-columns">
    //             ${statusList}
    //         </div>
    //     `;
    //
    //     let statusesContainers = document.querySelectorAll('.board');
    //     for (let container of statusesContainers) {
    //         container.insertAdjacentHTML('beforeend', outerHtml);
    //     }
    // },
    // loadCards: function (boardId) {
    //     // retrieves cards and makes showCards called
    //     dataHandler.getCards(function (cards) {
    //         dom.showCards(cards);
    //     });
    // },
    // showCards: function (cards) {
    //     // shows the cards of a board
    //     // it adds necessary event listeners also
    //
    //     let statusesContainers = document.querySelectorAll('.board');
    //
    //     let cardsList = '';
    //     // let i = 1;
    //
    //     for (let card of cards) {
    //         cardsList += `
    //             <div class="card" data-card-id="${card.id}">
    //                 <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
    //                 <div class="card-title">${card.title}</div>
    //             </div>
    //         `
    //     }
    //
    //     const outerHtml = `
    //         <div class="board-column-content">
    //             ${cardsList}
    //         </div>
    //     `;
    //
    //     const cardsContainers = document.querySelectorAll('.board-column-content');
    //     for (let container of cardsContainers) {
    //         container.insertAdjacentHTML('beforeend', outerHtml);
    //     }
    // },
    // here comes more features
};
