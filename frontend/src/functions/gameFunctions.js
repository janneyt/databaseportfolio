
// Default value for game, "None" or "Unassigned"
const currentGame = 0;

const getCurrentGame = () => {
  return currentGame;  
};

const setCurrentGame = (gameNumber) => {
    currentGame = gameNumber;
};

export {getCurrentGame, setCurrentGame};