import { Chip } from "../Chip.js";
import * as NS from "../NetworkState.js";
import { InputPin, OutputPin } from "../Pin.js";

class ChipToggle extends Chip {
    static info = {
        name:'toggle',
        inputPins:[],
        outputPins:['OUT']
    };
    OUT:OutputPin = new OutputPin(NS.State.LOW);
    set level(level:boolean){
        this.OUT.state = level ? NS.State.HIGH : NS.State.LOW;
    }
    get level():boolean{
        return this.OUT.state === NS.State.HIGH;
    }
}

export { ChipToggle };
