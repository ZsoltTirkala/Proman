// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            console.log(boards)
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards, statuses, cards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardList = '';

        for (let board of boards) {
            boardList += `
            <section class="board">
                <div class="board-header"><span class="board-title">${board.title}</span>
                    <button class="board-add">Add Card</button>
                    <button class="board-toggle"><i class="fas fa-chevron-down"></i> </button> 
                </div>
                <div class="board-columns"></div>
            </section>
            `;
        }

        let boardsContainer = document.querySelector('.board-container');
        boardsContainer.insertAdjacentHTML('beforeend', boardList);
    },
};

