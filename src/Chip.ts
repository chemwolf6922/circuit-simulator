class Chip{
    info:{
        name:string;
        description?:string;
        inputPins:Array<string>;
        outputPins:Array<string>;
    } = {
        name:'',
        inputPins:[],
        outputPins:[]
    };
    update():void{

    };
}

export {Chip};
