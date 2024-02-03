import { Chip } from "../Chip.js";
import * as NS from "../NetworkState.js";
import { InputPin, OutputPin } from "../Pin.js";

class ChipToggle extends Chip {
    info = {
        name:'toggle',
        inputPins:[],
        outputPins:['OUT']
    };
    OUT:OutputPin = new OutputPin();
    set level(level:boolean){
        this.OUT.state = level ? NS.State.HIGH : NS.State.LOW;
    }
}

export { ChipToggle };
