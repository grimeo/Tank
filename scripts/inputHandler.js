export default class InputHandler {
    constructor(){
        this.keys = [];
        window.addEventListener('keydown', e => {
            if((    e.key == ' '  ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'z' ||
                    e.key === 'Z'||
                    e.key === 'x' ||
                    e.key === 'X'||
                    e.key === 'c' ||
                    e.key === 'C')
                    && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', e => {
            if (    e.key == ' '  ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight'||
                    e.key === 'z' ||
                    e.key === 'Z'||
                    e.key === 'x' ||
                    e.key === 'X'||
                    e.key === 'c' ||
                    e.key === 'C') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}