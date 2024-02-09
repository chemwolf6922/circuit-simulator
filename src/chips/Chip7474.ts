import { Chip } from "../Chip.js";
import { InputPin, OutputPin } from "../Pin.js";
import * as NS from '../NetworkState.js';

class Chip7474 extends Chip {
    info = {
        name: '7474',
        description: 'Dual D flip-flop with clear and preset',
        inputPins:['NCLR1','NCLR2','NPRE1','NPRE2','CLK1','CLK2','D1','D2'],
        outputPins:['Q1','Q2','NQ1','NQ2']
    }
    NCLR1: InputPin = new InputPin();
    NCLR2: InputPin = new InputPin();
    NPRE1: InputPin = new InputPin();
    NPRE2: InputPin = new InputPin();
    CLK1: InputPin = new InputPin();
    CLK2: InputPin = new InputPin();
    D1: InputPin = new InputPin();
    D2: InputPin = new InputPin();
    Q1: OutputPin = new OutputPin(NS.State.LOW);
    Q2: OutputPin = new OutputPin(NS.State.LOW);
    NQ1: OutputPin = new OutputPin(NS.State.HIGH);
    NQ2: OutputPin = new OutputPin(NS.State.HIGH);
    #lastCLK1 = NS.State.HIGH_IMPEDANCE;
    #lastCLK2 = NS.State.HIGH_IMPEDANCE;
    updateCh1():void {
        const isRisingEdge = this.CLK1.state === NS.State.HIGH && this.#lastCLK1 === NS.State.LOW;
        this.#lastCLK1 = this.CLK1.state;
        if(this.NPRE1.state === NS.State.LOW && this.NCLR1.state === NS.State.HIGH){
            this.Q1.state = NS.State.HIGH;
            this.NQ1.state = NS.State.LOW;
            return;
        }
        if(this.NPRE1.state === NS.State.HIGH && this.NCLR1.state === NS.State.LOW){
            this.Q1.state = NS.State.LOW;
            this.NQ1.state = NS.State.HIGH;
            return;
        }
        if(this.NPRE1.state === NS.State.LOW && this.NCLR1.state === NS.State.LOW){
            this.Q1.state = NS.State.HIGH;
            this.NQ1.state = NS.State.HIGH;
            return;
        }
        if(!isRisingEdge){
            return;
        }
        switch(this.D1.state){
            case NS.State.HIGH:
                this.Q1.state = NS.State.HIGH;
                this.NQ1.state = NS.State.LOW;
                break;
            case NS.State.LOW:
                this.Q1.state = NS.State.LOW;
                this.NQ1.state = NS.State.HIGH;
                break;
            default:
                break;
        }
    }
    updateCh2():void {
        const isRisingEdge = this.CLK2.state === NS.State.HIGH && this.#lastCLK2 === NS.State.LOW;
        this.#lastCLK2 = this.CLK2.state;
        if(this.NPRE2.state === NS.State.LOW && this.NCLR2.state === NS.State.HIGH){
            this.Q2.state = NS.State.HIGH;
            this.NQ2.state = NS.State.LOW;
            return;
        }
        if(this.NPRE2.state === NS.State.HIGH && this.NCLR2.state === NS.State.LOW){
            this.Q2.state = NS.State.LOW;
            this.NQ2.state = NS.State.HIGH;
            return;
        }
        if(this.NPRE2.state === NS.State.LOW && this.NCLR2.state === NS.State.LOW){
            this.Q2.state = NS.State.HIGH;
            this.NQ2.state = NS.State.HIGH;
            return;
        }
        if(!isRisingEdge){
            return;
        }
        switch(this.D2.state){
            case NS.State.HIGH:
                this.Q2.state = NS.State.HIGH;
                this.NQ2.state = NS.State.LOW;
                break;
            case NS.State.LOW:
                this.Q2.state = NS.State.LOW;
                this.NQ2.state = NS.State.HIGH;
                break;
            default:
                break;
        }
    }
    update(): void {
        this.updateCh1();
        this.updateCh2();
    }
}

export { Chip7474 };
