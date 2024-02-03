import { Chip } from "../Chip.js";
import { InputPin, OutputPin } from "../Pin.js";
import * as NS from "../NetworkState.js";

class Chip7400 extends Chip {
    A1:InputPin = new InputPin();
    B1:InputPin = new InputPin();
    Y1:OutputPin = new OutputPin();
    A2:InputPin = new InputPin();
    B2:InputPin = new InputPin();
    Y2:OutputPin = new OutputPin();
    A3:InputPin = new InputPin();
    B3:InputPin = new InputPin();
    Y3:OutputPin = new OutputPin();
    A4:InputPin = new InputPin();
    B4:InputPin = new InputPin();
    Y4:OutputPin = new OutputPin();
    update(): void {
        this.Y1.state = NS.not(NS.and(this.A1.state, this.B1.state));
        this.Y2.state = NS.not(NS.and(this.A2.state, this.B2.state));
        this.Y3.state = NS.not(NS.and(this.A3.state, this.B3.state));
        this.Y4.state = NS.not(NS.and(this.A4.state, this.B4.state));
    }
}

export { Chip7400 };
