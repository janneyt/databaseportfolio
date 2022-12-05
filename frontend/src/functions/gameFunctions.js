
// Default value for game, 0 (none or unnasigned)
let currentGame = 0;

const getCurrentGame = () => {
  return currentGame;  
};

const setCurrentGame = (gameNumber) => {
    currentGame = gameNumber;
};

export {getCurrentGame, setCurrentGame};