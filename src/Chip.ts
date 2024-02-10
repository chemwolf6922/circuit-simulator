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
}

export {Chip};
export type {ChipInfo};
