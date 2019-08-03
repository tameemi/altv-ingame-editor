import alt from 'alt';

alt.onClient('serverEvalExecute', (player, evalCode) => {

    let editor = {
        log: (...messages) => {
            alt.emitClient(player, 'consoleLog', ...messages);
            alt.log(...messages);
        }
    }

    eval(evalCode);
});