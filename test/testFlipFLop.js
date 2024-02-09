// @ts-check
import { Circuit, Connection, CHIPS, stringifyState } from "../build/index.js";

class TestCircuit extends Circuit {
    source;
    clk;
    U1;
    constructor(){
        super();
        this.source = new CHIPS.ChipSource();
        this.clk = new CHIPS.ChipToggle();
        this.U1 = new CHIPS.Chip7474();
        this.chips.add(this.source);
        this.chips.add(this.clk);
        this.chips.add(this.U1);
        let connections = [];
        
        connections.push(new Connection(this.source.VCC, this.U1.NPRE1));
        connections.push(new Connection(this.source.VCC, this.U1.NCLR1));
        connections.push(new Connection(this.clk.OUT, this.U1.CLK1));
        connections.push(new Connection(this.U1.NQ1, this.U1.D1));
        
        connections.push(new Connection(this.source.VCC, this.U1.NPRE2));
        connections.push(new Connection(this.source.VCC, this.U1.NCLR2));
        connections.push(new Connection(this.U1.Q1, this.U1.CLK2));
        connections.push(new Connection(this.U1.NQ2, this.U1.D2));

        this.networks = Connection.getNetworks(connections);
    }
    dump(){
        console.log(stringifyState(this.U1.Q1.state), stringifyState(this.U1.Q2.state));
    }
}

const c = new TestCircuit();
c.udpate();
c.dump();
for(let i=0;i<10;i++){
    c.clk.level = false;
    c.udpate();
    c.clk.level = true;
    c.udpate();
    c.dump();
}
