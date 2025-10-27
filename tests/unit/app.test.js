import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import {createChessClock} from '../../src/app.js';

describe('Базовая логика из условия: ', () => {
    const chessClock = createChessClock(10000, 2000);
    it('первыми ходят белые', () => {
        expect(typeof chessClock.getState).toBe('function');
        expect(chessClock.getState().activePlayer).toBe("white");
        expect(chessClock.getState().activePlayer).toBe("white");
    });

    it('первый switchPlayer() запускает игру', () => {
        vi.useFakeTimers();
        expect(typeof chessClock.switchPlayer).toBe('function');
        chessClock.switchPlayer();
        vi.advanceTimersByTime(1000);
        expect(chessClock.getState().whiteTime).toBe(9000);
        vi.restoreAllMocks();
    });

    it('последующие switchPlayer() передают ход', () => {
        chessClock.switchPlayer();
        expect(chessClock.getState().activePlayer).toBe("black");
    });

    it('переход хода увеличивает время', () => {
        expect(chessClock.getState().whiteTime).toBe(11000);
    });
})

describe('Партии: ', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('для часов Фишера: ', () => {

        it('игрок не успел сделать ход', () => {
            const chessClock = createChessClock(5000, 2000);
            chessClock.switchPlayer();

            vi.advanceTimersByTime(6000);

            const state = chessClock.getState();
            expect(state.whiteTime).toBeLessThanOrEqual(0);
            expect(state.gameOver).toBe(true);
            expect(state.activePlayer).toBe('white');
        });

        it('второй игрок проигрывает после переключения', () => {
            const chessClock = createChessClock(5000, 2000);
            chessClock.switchPlayer();

            vi.advanceTimersByTime(3000);
            chessClock.switchPlayer();
            vi.advanceTimersByTime(6000);

            const state = chessClock.getState();
            expect(state.blackTime).toBeLessThanOrEqual(0);
            expect(state.gameOver).toBe(true);
            expect(state.activePlayer).toBe('black');
        });

        it('игрок спасается, если свитч произошел до проверки', () => {
            const chessClock = createChessClock(5000, 2000);
            chessClock.switchPlayer();

            vi.advanceTimersByTime(5500);
            chessClock.switchPlayer();

            const state = chessClock.getState();
            expect(state.whiteTime).toBeGreaterThan(0);
            expect(state.gameOver).toBe(false);
            expect(state.activePlayer).toBe('black');
        });
    });

    describe('разные спецэффекты: ', () => {

        it('несколько часов не зависимы друг от друга', () => {
            const chessClock1 = createChessClock(5000, 2000);
            const chessClock2 = createChessClock(12000, 2000);
            chessClock1.switchPlayer();
            chessClock2.switchPlayer();
            chessClock1.switchPlayer();

            vi.advanceTimersByTime(3000);
            chessClock1.switchPlayer();
            vi.advanceTimersByTime(8000);

            const state1 = chessClock1.getState();
            expect(state1.whiteTime).toBeLessThanOrEqual(0);
            expect(state1.blackTime).toBe(4000);
            expect(state1.gameOver).toBe(true);
            expect(state1.activePlayer).toBe('white');

            const state2 = chessClock2.getState();
            expect(state2.whiteTime).toBe(1000);
            expect(state2.gameOver).toBe(false);
            expect(state2.activePlayer).toBe('white');
        });

        it('время уменьшается постоянно', () => {
            const chessClock = createChessClock(5000, 2000);
            chessClock.switchPlayer();

            vi.advanceTimersByTime(3000);
            chessClock.switchPlayer();

            vi.advanceTimersByTime(5000);
            chessClock.switchPlayer();

            vi.advanceTimersByTime(3000);

            const state = chessClock.getState();
            expect(state.whiteTime).toBe(1000);
            expect(state.blackTime).toBe(2000);
            expect(state.gameOver).toBe(false);
            expect(state.activePlayer).toBe('white');
        });

        it('после проигрыша ничего не происходит с часами', () => {
            const chessClock = createChessClock(5000, 2000);
            chessClock.switchPlayer();

            vi.advanceTimersByTime(6000);
            chessClock.switchPlayer();
            vi.advanceTimersByTime(6000);

            const state = chessClock.getState();
            expect(state.whiteTime).toBeLessThanOrEqual(0);
            expect(state.blackTime).toBe(5000)
            expect(state.gameOver).toBe(true);
            expect(state.activePlayer).toBe('white');
        });

        it('таймер не отсчитывает время до старта игры', () => {
            const chessClock = createChessClock(5000, 2000);

            vi.advanceTimersByTime(3000);

            const state = chessClock.getState();
            expect(state.whiteTime).toBe(5000);
            expect(state.blackTime).toBe(5000);
            expect(state.activePlayer).toBe('white');
        });

        it('тик "начатый" у другого игрока не влияет на текущего', () => {
            const chessClock = createChessClock(5000, 2000);
            chessClock.switchPlayer();

            vi.advanceTimersByTime(900);
            chessClock.switchPlayer();
            vi.advanceTimersByTime(900);

            const state = chessClock.getState();
            expect(state.whiteTime).toBe(7000);
            expect(state.blackTime).toBe(5000);
        });
    });
});
