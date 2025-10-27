export function createChessClock(gameTime, bonusTime = 2000) {
    let whiteTime = gameTime;
    let blackTime = gameTime;
    let activePlayer = 'white';
    let gameOver = false;

    const switchPlayer = () => {
        // TODO
    }

    const getState = () => ({
        whiteTime,
        blackTime,
        activePlayer,
        gameOver
    });

    return {
        switchPlayer,
        getState
    };
}
