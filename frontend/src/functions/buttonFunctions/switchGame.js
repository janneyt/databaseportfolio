import setCurrentgame, { setCurrentGame } from '../gameFunctions';

let currentDisabled = "";
// A button onClick/onSubmit function
const switchGame = (e) => {
    if (currentDisabled !== "") {
        currentDisabled.target.disabled = false;
    }
    currentDisabled = e;
    setCurrentGame(e.target.value);
    window.alert(`You have changed the current game.
    This may affect the results shown on other pages.`);
    e.target.disabled = true;
};

export {switchGame};