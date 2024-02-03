import {Chip} from './Chip.js';
import {Network} from './Network.js';
import * as NetworkState from './NetworkState.js';

class Circuit{
    static MAX_ITERATIONS = 100;
    chips: Set<Chip> = new Set();
    networks: Set<Network> = new Set();
    udpate(){
        let iterations = 0;
        let changed:boolean;
        let states:Array<NetworkState.State> = [];
        do {
            for(const network of this.networks){
                network.lock();
            }
            for(const network of this.networks){
                states.push(network.state);
            }
            for(const chip of this.chips){
                chip.update();
            }
            for(const network of this.networks){
                network.unlock();
            }
            changed = false;
            for(const network of this.networks){
                if(network.state !== states.shift()){
                    changed = true;
                    break;
                }
            }
            states = [];
            iterations++;
            if(iterations >= Circuit.MAX_ITERATIONS && changed){
                throw new Error(`Circuit did not converge after ${iterations} iterations`);
            }
        } while (changed);
    }
};

export {Circuit};