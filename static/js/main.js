import { dom } from "./dom.js";
// import { newCard } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();
    // newCard.addNewCardEventHandler();

}

init();
