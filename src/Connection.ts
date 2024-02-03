import {Pin} from "./Pin.js";
import { Network } from "./Network.js";

class Connection{
    A:Pin;
    B:Pin;
    constructor(A:Pin, B:Pin){
        this.A = A;
        this.B = B;
    }
    static getNetworks(connections:Array<Connection>):Set<Network>{
        let groups:Set<Set<Pin>> = new Set();
        let groupedPins:Map<Pin,Set<Pin>> = new Map();
        for(const connection of connections){
            let groupA = groupedPins.get(connection.A);
            let groupB = groupedPins.get(connection.B);
            if(groupA && groupB){
                if(groupA !== groupB){
                    for(const pin of groupA){
                        groupB.add(pin);
                        groupedPins.set(pin, groupB);
                    };
                    groups.delete(groupA);
                }
            }else if(groupA){
                groupA.add(connection.B);
                groupedPins.set(connection.B, groupA);
            }else if(groupB){
                groupB.add(connection.A);
                groupedPins.set(connection.A, groupB);
            }else{
                let newGroup = new Set([connection.A, connection.B]);
                groups.add(newGroup);
                groupedPins.set(connection.A, newGroup);
                groupedPins.set(connection.B, newGroup);
            }
        }
        let networks:Set<Network> = new Set();
        for(const group of groups){
            let network = new Network();
            for(const pin of group){
                network.connect(pin);
                pin.connect(network);
            }
            networks.add(network);
        }
        return networks;
    }
};

export {Connection};
