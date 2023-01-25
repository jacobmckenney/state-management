import { useState } from "react";
import { Action, OptionalActionArgs, State} from "./types";
import connect from "../lib/connect";

const createStore = <State>(reducer: (state: State | undefined, action: Action) => State) => {
    const listeners: Function[] = [];
    const initial = reducer(undefined, {type: "^^initialize^^"});
    let store: State = initial as State; // use functional init for lazy init (one call)
    const dispatch = (action: Action) => {
        store = reducer(store, action);
        listeners.forEach((listener: Function) => listener());
    };
    // Initialize with unknown action type to start with the user-defined initial state
    dispatch({ type: "^^initialize^^" });
    const subscribe = (listener: Function): Function => {
        listeners.push(listener);
        return () => {
            // Function for unsubscribing listener
            const listenerIdx = listeners.indexOf(listener);
            listeners.splice(listenerIdx, 1);
        };
    };
    const getState = () => store;

    const createSelector = (selector: Function) => {
        const [selectedValue, setSelectedValue] = useState(() => getState());
        subscribe(() => setSelectedValue(getState()));
        return selector(selectedValue);
    };

    const createDispatch = (actionType: string) => {
        return (restOfAction: OptionalActionArgs) => {
            dispatch({ type: actionType, ...restOfAction });
        };
    };

    return {
        dispatch,
        getState,
        createSelector,
        createDispatch,
        connect,
        subscribe,
    };
};

export { createStore };
