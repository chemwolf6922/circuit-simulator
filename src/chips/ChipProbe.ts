import { Chip } from '../Chip.js';
import { InputPin } from '../Pin.js';
import * as NS from '../NetworkState.js';

class ChipProbe extends Chip {
    static info = {
        name:'probe',
        description:'8-bit probe',
        inputPins:['IN0','IN1','IN2','IN3','IN4','IN5','IN6','IN7'],
        outputPins:[]
    }
    IN0: InputPin = new InputPin();
    IN1: InputPin = new InputPin();
    IN2: InputPin = new InputPin();
    IN3: InputPin = new InputPin();
    IN4: InputPin = new InputPin();
    IN5: InputPin = new InputPin();
    IN6: InputPin = new InputPin();
    IN7: InputPin = new InputPin();
    get value():string {
        /** check for any conflicts */
        if(this.IN0.state === NS.State.CONFLICT ||
            this.IN1.state === NS.State.CONFLICT ||
            this.IN2.state === NS.State.CONFLICT ||
            this.IN3.state === NS.State.CONFLICT ||
            this.IN4.state === NS.State.CONFLICT ||
            this.IN5.state === NS.State.CONFLICT ||
            this.IN6.state === NS.State.CONFLICT ||
            this.IN7.state === NS.State.CONFLICT){
            return 'conflict';
        }
        /** check for any high impedance */
        if(this.IN0.state === NS.State.HIGH_IMPEDANCE ||
            this.IN1.state === NS.State.HIGH_IMPEDANCE ||
            this.IN2.state === NS.State.HIGH_IMPEDANCE ||
            this.IN3.state === NS.State.HIGH_IMPEDANCE ||
            this.IN4.state === NS.State.HIGH_IMPEDANCE ||
            this.IN5.state === NS.State.HIGH_IMPEDANCE ||
            this.IN6.state === NS.State.HIGH_IMPEDANCE ||
            this.IN7.state === NS.State.HIGH_IMPEDANCE){
            return 'high Z';
        }
        const value = Number(this.IN7.state === NS.State.HIGH) << 7 |
                        Number(this.IN6.state === NS.State.HIGH) << 6 |
                        Number(this.IN5.state === NS.State.HIGH) << 5 |
                        Number(this.IN4.state === NS.State.HIGH) << 4 |
                        Number(this.IN3.state === NS.State.HIGH) << 3 |
                        Number(this.IN2.state === NS.State.HIGH) << 2 |
                        Number(this.IN1.state === NS.State.HIGH) << 1 |
                        Number(this.IN0.state === NS.State.HIGH);
        return value.toString(16).padStart(2,'0');
    }
}

export {ChipProbe};

