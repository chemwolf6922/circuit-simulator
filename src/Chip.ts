import { Pin } from "./Pin.js";

type ChipInfo = {
    name:string;
    description?:string;
    inputPins:Array<string>;
    outputPins:Array<string>;
};

class Chip{
    static info:ChipInfo = {
        name:'',
        inputPins:[],
        outputPins:[]
    };
    update():void{

    };
    getPin(name:string):Pin{
        const pin = this[name as keyof this];
        if(!(pin instanceof Pin)){
            throw new Error(`Pin ${name} not found`);
        }
        return pin;
    }
}

export {Chip};
export type {ChipInfo};
