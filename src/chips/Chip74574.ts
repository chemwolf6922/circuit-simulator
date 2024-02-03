import { Chip } from "../Chip.js";
import { InputPin, OutputPin } from "../Pin.js";
import * as NS from "../NetworkState.js";

class Chip74574 extends Chip{
    info = {
        name:'74574',
        description:'Octal D-type flip-flop with tri-state outputs',
        inputPins:['D1','D2','D3','D4','D5','D6','D7','D8','CLK','NOE'],
        outputPins:['Q1','Q2','Q3','Q4','Q5','Q6','Q7','Q8']
    };
    D1:InputPin = new InputPin();
    D2:InputPin = new InputPin();
    D3:InputPin = new InputPin();
    D4:InputPin = new InputPin();
    D5:InputPin = new InputPin();
    D6:InputPin = new InputPin();
    D7:InputPin = new InputPin();
    D8:InputPin = new InputPin();
    CLK:InputPin = new InputPin();
    NOE:InputPin = new InputPin();
    Q1:OutputPin = new OutputPin();
    Q2:OutputPin = new OutputPin();
    Q3:OutputPin = new OutputPin();
    Q4:OutputPin = new OutputPin();
    Q5:OutputPin = new OutputPin();
    Q6:OutputPin = new OutputPin();
    Q7:OutputPin = new OutputPin();
    Q8:OutputPin = new OutputPin();
    /** @todo maybe fill it with random values at the begining */
    levels:Array<NS.State> = new Array(8).fill(NS.State.LOW);
    lastClk: NS.State = NS.State.LOW;
    update():void{
        if(this.CLK.state === NS.State.HIGH && this.lastClk === NS.State.LOW){
            this.levels = [
                this.D1.state,
                this.D2.state,
                this.D3.state,
                this.D4.state,
                this.D5.state,
                this.D6.state,
                this.D7.state,
                this.D8.state
            ];
        }
        this.lastClk = this.CLK.state;
        if(this.NOE.state === NS.State.LOW){
            this.Q1.state = this.levels[0];
            this.Q2.state = this.levels[1];
            this.Q3.state = this.levels[2];
            this.Q4.state = this.levels[3];
            this.Q5.state = this.levels[4];
            this.Q6.state = this.levels[5];
            this.Q7.state = this.levels[6];
            this.Q8.state = this.levels[7];
        }else{
            this.Q1.state = NS.State.HIGH_IMPEDANCE;
            this.Q2.state = NS.State.HIGH_IMPEDANCE;
            this.Q3.state = NS.State.HIGH_IMPEDANCE;
            this.Q4.state = NS.State.HIGH_IMPEDANCE;
            this.Q5.state = NS.State.HIGH_IMPEDANCE;
            this.Q6.state = NS.State.HIGH_IMPEDANCE;
            this.Q7.state = NS.State.HIGH_IMPEDANCE;
            this.Q8.state = NS.State.HIGH_IMPEDANCE;
        }
    }
}

export {Chip74574};
