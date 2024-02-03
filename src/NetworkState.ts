enum State {
    CONFLICT  = -2,
    HIGH_IMPEDANCE = -1,
    LOW = 0,
    HIGH = 1
};

function and(A:State, B:State ):State{
    if(A===State.LOW || B===State.LOW){
        return State.LOW;
    }
    if(A===State.HIGH && B===State.HIGH){
        return State.HIGH;
    }
    return State.HIGH_IMPEDANCE;
}

function or(A:State, B:State):State{
    if(A===State.HIGH || B===State.HIGH){
        return State.HIGH;
    }
    if(A===State.LOW && B===State.LOW){
        return State.LOW;
    }
    return State.HIGH_IMPEDANCE;
}

function not(A:State):State{
    if(A===State.LOW){
        return State.HIGH;
    }
    if(A===State.HIGH){
        return State.LOW;
    }
    return State.HIGH_IMPEDANCE;
}

function add(A:State, B:State):State{
    if(A===B){
        return A;
    }
    if(A === State.HIGH_IMPEDANCE){
        return B;
    }
    if(B === State.HIGH_IMPEDANCE){
        return A;
    }
    return State.CONFLICT;
}

function stringify(state:State):string{
    switch(state){
        case State.CONFLICT:
            return "CONFLICT";
        case State.HIGH_IMPEDANCE:
            return "HIGH_IMPEDANCE";
        case State.LOW:
            return "LOW";
        case State.HIGH:
            return "HIGH";
        default:
            throw new Error("Invalid state");
    }    
}

export { State, and, or, not ,add, stringify };
