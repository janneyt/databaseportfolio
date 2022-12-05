
// Default value for game, "None" or "Unassigned"
const currentGame = 1;

const getCurrentGame = () => {
  return currentGame;  
};

const setCurrentGame = (gameNumber) => {
    currentGame = gameNumber;
};

export {getCurrentGame, setCurrentGame};