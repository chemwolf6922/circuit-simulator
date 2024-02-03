import {State} from "./NetworkState.js"
import {Network} from "./Network.js"

class Pin{
    network:Network|undefined;
    connect(network:Network){
        this.network = network;
    }
}

class InputPin extends Pin{
    get state(){
        return this.network?.state ?? State.HIGH_IMPEDANCE;
    }
}

class OutputPin extends Pin{
    #state:State;
    constructor(initialState:State = State.HIGH_IMPEDANCE){
        super();
        this.#state = initialState;
    }
    get state(){
        return this.#state;
    }
    set state(newState:State){
        this.#state = newState;
    }
}

export { Pin, InputPin, OutputPin }
