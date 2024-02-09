import { Chip } from "../Chip.js";
import { InputPin, OutputPin } from "../Pin.js";
import * as NS from "../NetworkState.js";

class Chip7404 extends Chip {
    info = {
        name:'7404',
        description:'Hex inverter',
        inputPins:['A1','A2','A3','A4','A5','A6'],
        outputPins:['Y1','Y2','Y3','Y4','Y5','Y6']
    };
    A1:InputPin = new InputPin();
    Y1:OutputPin = new OutputPin();
    A2:InputPin = new InputPin();
    Y2:OutputPin = new OutputPin();
    A3:InputPin = new InputPin();
    Y3:OutputPin = new OutputPin();
    A4:InputPin = new InputPin();
    Y4:OutputPin = new OutputPin();
    A5:InputPin = new InputPin();
    Y5:OutputPin = new OutputPin();
    A6:InputPin = new InputPin();
    Y6:OutputPin = new OutputPin();
    update(): void {
        this.Y1.state = NS.not(this.A1.state);
        this.Y2.state = NS.not(this.A2.state);
        this.Y3.state = NS.not(this.A3.state);
        this.Y4.state = NS.not(this.A4.state);
        this.Y5.state = NS.not(this.A5.state);
        this.Y6.state = NS.not(this.A6.state);
    }
}

export {Chip7404};