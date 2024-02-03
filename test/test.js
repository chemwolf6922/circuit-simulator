// @ts-check
import { Circuit, Connection, ChipSource, Chip7400, stringifyState } from "../build/index.js";

class TestCircuit extends Circuit {
    source;
    U1;
    constructor(){
        super();
        this.source = new ChipSource();
        this.U1 = new Chip7400();
        this.chips.add(this.source);
        this.chips.add(this.U1);
        let connections = [];
        connections.push(new Connection(this.source.GND,this.U1.A1));
        connections.push(new Connection(this.source.VCC,this.U1.B1));
        connections.push(new Connection(this.source.VCC,this.U1.A2));
        connections.push(new Connection(this.source.VCC,this.U1.B2));
        connections.push(new Connection(this.U1.Y1,this.U1.A3));
        connections.push(new Connection(this.U1.Y2,this.U1.B3));
        connections.push(new Connection(this.U1.Y3,this.U1.A4));
        connections.push(new Connection(this.source.GND,this.U1.B4));
        this.networks = Connection.getNetworks(connections);
    }
    dump(){
        console.log(stringifyState(this.U1.Y1.state));
        console.log(stringifyState(this.U1.Y2.state));
        console.log(stringifyState(this.U1.Y3.state));
        console.log(stringifyState(this.U1.Y4.state));
    }
}

const c = new TestCircuit();
c.dump();
c.udpate();
c.dump();

