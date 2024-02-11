import { Chip } from "../Chip.js";
import { InputPin,OutputPin } from "../Pin.js";
import * as NetworkState from "../NetworkState.js";

class ChipSource extends Chip {
    static info = {
        name:'source',
        inputPins:[],
        outputPins:['VCC','GND']
    };
    GND:OutputPin = new OutputPin(NetworkState.State.LOW);
    VCC:OutputPin = new OutputPin(NetworkState.State.HIGH);
}

export { ChipSource };
