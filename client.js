import * as alt from 'alt';
import * as game from 'natives';

let loaded = false;
let opened = false;
let currentMouseState = null;

let view = new alt.WebView("http://resources/editor/html/index.html");

view.on('clientEvalExecute', (evalcode) => {
    eval(evalcode);
})

view.on('serverEvalExecute', (evalcode) => {
    alt.emitServer('serverEvalExecute', evalcode);
})

view.on('editorReady', () => {
    loaded = true;
})

view.on('editorOpened', (active) => {
    opened = active;
    alt.toggleGameControls(!active);
    if(currentMouseState !== active){
      alt.showCursor(active)
      currentMouseState = active;
    }
    if(active)
      view.focus();
})

alt.on('keyup', (key) => {
    if (!loaded) return;

    // list of key codes https://docs.microsoft.com/en-us/windows/desktop/inputdev/virtual-key-codes
    if (key == 0x73) { //f4
        view.emit('toggleEditor');
        return;
    }
    if (opened) {
        switch(key) {
            case 0x1B: {
                view.emit('toggleEditor');
                break;
            }

            case 0x76 : { // f7
                view.emit('executeCode');
                break;
            }

            case 0x74: { // f5
                view.emit('toggleOpacity');
                break;
            }
        }
    }
})
