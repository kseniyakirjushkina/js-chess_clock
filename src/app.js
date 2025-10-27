export function createChessClock(gameTime, bonusTime = 2000) {
    const TICK_INTERVAL = 1000;

    const PLAYERS = {
        WHITE: 'white',
        BLACK: 'black'
    };

    let innerState = {
        whiteTime: gameTime,
        blackTime: gameTime,
        activePlayer: PLAYERS.WHITE,
        gameStarted: false,
        gameOver: false
    };

    let tickInterval = null;

    const tick = () => {
        if (innerState.gameOver) return;

        innerState[`${innerState.activePlayer}Time`] -= TICK_INTERVAL;

        const activeTime = innerState[`${innerState.activePlayer}Time`];

        if (activeTime < 0) {
            innerState.gameOver = true;
            clearInterval(tickInterval);
        }
    };

    const switchPlayer = () => {
        if (innerState.gameOver) return;

        if (!innerState.gameStarted) {
            innerState.gameStarted = true;
            tickInterval = setInterval(tick, TICK_INTERVAL);
            return;
        }

        innerState[`${innerState.activePlayer}Time`] += bonusTime;

        innerState.activePlayer =
            innerState.activePlayer === PLAYERS.WHITE
                ? PLAYERS.BLACK
                : PLAYERS.WHITE;

        clearInterval(tickInterval);
        tickInterval = setInterval(tick, TICK_INTERVAL);
    };

    const getState = () => ({
        whiteTime: innerState.whiteTime,
        blackTime: innerState.blackTime,
        activePlayer: innerState.activePlayer,
        gameOver: innerState.gameOver
    });

    return {
        switchPlayer,
        getState
    };
}