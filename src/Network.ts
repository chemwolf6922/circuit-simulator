import * as NetworkState from "./NetworkState.js"
import {Pin, OutputPin} from "./Pin.js"

class Network{
    #drivers:Set<OutputPin> = new Set();
    #priorState:NetworkState.State = NetworkState.State.HIGH_IMPEDANCE;
    #locked:boolean = false;
    lock(){
        if(this.#locked){
            return;
        }
        this.#priorState = this.state;
        this.#locked = true;
    }
    unlock(){
        this.#locked = false;
    }
    get state(){
        if(this.#locked){
            return this.#priorState;
        }else{
            let newState = NetworkState.State.HIGH_IMPEDANCE;
            for(let driver of this.#drivers){
                newState = NetworkState.add(newState, driver.state);
            }
            return newState;
        }
    }
    connect(pin:Pin){
        if(pin instanceof OutputPin){
            this.#drivers.add(pin);
        }
    }
};

export {Network}
