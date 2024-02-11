// @ts-check
import { Circuit, Connection, CHIPS } from "../build/index.js";

class TestCircuit extends Circuit {
    source;
    clk;
    U1;
    U2;
    T1;
    T2;
    constructor(){
        super();
        this.source = new CHIPS.ChipSource();
        this.clk = new CHIPS.ChipToggle();
        this.U1 = new CHIPS.Chip74163();
        this.U2 = new CHIPS.Chip74163();
        this.T1 = new CHIPS.ChipProbe();
        this.T2 = new CHIPS.ChipProbe();
        this.chips.add(this.source);
        this.chips.add(this.clk);
        this.chips.add(this.U1);
        this.chips.add(this.U2);
        this.chips.add(this.T1);
        this.chips.add(this.T2);
        let connections = [];
        
        connections.push(new Connection(this.source.VCC, this.U1.NCLR));
        connections.push(new Connection(this.source.VCC, this.U1.NLOAD));
        connections.push(new Connection(this.source.VCC, this.U1.ENP));
        connections.push(new Connection(this.source.VCC, this.U1.ENT));
        connections.push(new Connection(this.source.VCC, this.U1.A));
        connections.push(new Connection(this.source.VCC, this.U1.B));
        connections.push(new Connection(this.source.VCC, this.U1.C));
        connections.push(new Connection(this.source.VCC, this.U1.D));
        connections.push(new Connection(this.clk.OUT, this.U1.CLK));

        connections.push(new Connection(this.U1.QA, this.T1.IN0));
        connections.push(new Connection(this.U1.QB, this.T1.IN1));
        connections.push(new Connection(this.U1.QC, this.T1.IN2));
        connections.push(new Connection(this.U1.QD, this.T1.IN3));
        connections.push(new Connection(this.U1.RCO, this.T1.IN4));
        connections.push(new Connection(this.source.GND, this.T1.IN5));
        connections.push(new Connection(this.source.GND, this.T1.IN6));
        connections.push(new Connection(this.source.GND, this.T1.IN7));
        
        connections.push(new Connection(this.source.VCC, this.U2.NCLR));
        connections.push(new Connection(this.source.VCC, this.U2.NLOAD));
        connections.push(new Connection(this.source.VCC, this.U2.ENP));
        connections.push(new Connection(this.U1.RCO, this.U2.ENT));
        connections.push(new Connection(this.source.VCC, this.U2.A));
        connections.push(new Connection(this.source.VCC, this.U2.B));
        connections.push(new Connection(this.source.VCC, this.U2.C));
        connections.push(new Connection(this.source.VCC, this.U2.D));
        connections.push(new Connection(this.clk.OUT, this.U2.CLK));

        connections.push(new Connection(this.U2.QA, this.T2.IN0));
        connections.push(new Connection(this.U2.QB, this.T2.IN1));
        connections.push(new Connection(this.U2.QC, this.T2.IN2));
        connections.push(new Connection(this.U2.QD, this.T2.IN3));
        connections.push(new Connection(this.U2.RCO, this.T2.IN4));
        connections.push(new Connection(this.source.GND, this.T2.IN5));
        connections.push(new Connection(this.source.GND, this.T2.IN6));
        connections.push(new Connection(this.source.GND, this.T2.IN7));

        this.networks = Connection.getNetworks(connections);
    }
}

const c = new TestCircuit();
c.udpate();
console.log(c.T2.value, c.T1.value);
for(let i = 0; i < 256; i++){
    c.clk.level = false;
    c.udpate();
    c.clk.level = true;
    c.udpate();
    console.log(c.T2.value, c.T1.value);
}


