import { Chip } from "../Chip.js";
import { InputPin, OutputPin, Pin } from "../Pin.js";
import * as NS from "../NetworkState.js";

class Chip74163 extends Chip {
    info = {
        name: '74163',
        description: '4-bit synchronous counter',
        inputPins: ['CLK', 'NLOAD', 'ENT', 'ENP', 'NCLR', 'A', 'B', 'C', 'D'],
        outputPins: ['QD', 'QC', 'QB', 'QA', 'RCO']
    };
    CLK: InputPin = new InputPin();
    NLOAD: InputPin = new InputPin();
    ENT: InputPin = new InputPin();
    ENP: InputPin = new InputPin();
    NCLR: InputPin = new InputPin();
    A: InputPin = new InputPin();
    B: InputPin = new InputPin();
    C: InputPin = new InputPin();
    D: InputPin = new InputPin();
    QD: OutputPin = new OutputPin(NS.State.LOW);
    QC: OutputPin = new OutputPin(NS.State.LOW);
    QB: OutputPin = new OutputPin(NS.State.LOW);
    QA: OutputPin = new OutputPin(NS.State.LOW);
    RCO: OutputPin = new OutputPin(NS.State.LOW);
    #lastCLK = NS.State.HIGH_IMPEDANCE;
    update(): void {
        let isRisingEdge = this.CLK.state === NS.State.HIGH && this.#lastCLK === NS.State.LOW;
        this.#lastCLK = this.CLK.state;
        if(!isRisingEdge){
            return;
        }
        if(this.NCLR.state === NS.State.LOW){
            this.QA.state = NS.State.LOW;
            this.QB.state = NS.State.LOW;
            this.QC.state = NS.State.LOW;
            this.QD.state = NS.State.LOW;
            this.RCO.state = NS.State.LOW;
            return;
        }
        if(this.NLOAD.state === NS.State.LOW){
            this.QA.state = this.A.state;
            this.QB.state = this.B.state;
            this.QC.state = this.C.state;
            this.QD.state = this.D.state;
            this.RCO.state = (this.A.state === NS.State.HIGH) &&
                            (this.B.state === NS.State.HIGH) &&
                            (this.C.state === NS.State.HIGH) &&
                            (this.D.state === NS.State.HIGH) ? NS.State.HIGH : NS.State.LOW;
            return;
        }
        if(this.ENT.state === NS.State.HIGH && this.ENP.state === NS.State.HIGH){
            this.QA.state = NS.not(this.QA.state);
            if(this.QA.state === NS.State.LOW){
                this.QB.state = NS.not(this.QB.state);
                if(this.QB.state === NS.State.LOW){
                    this.QC.state = NS.not(this.QC.state);
                    if(this.QC.state === NS.State.LOW){
                        this.QD.state = NS.not(this.QD.state);
                    }
                }
            }
            this.RCO.state = (this.QA.state === NS.State.HIGH) &&
                            (this.QB.state === NS.State.HIGH) &&
                            (this.QC.state === NS.State.HIGH) &&
                            (this.QD.state === NS.State.HIGH) ? NS.State.HIGH : NS.State.LOW;
        }
    }
};

export { Chip74163 };
