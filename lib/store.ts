import { useState, useSyncExternalStore } from "react";
import { Action, OptionalActionArgs} from "./types";
import connect from "../lib/connect";

const createStore = <S>(reducer: (state: S | undefined, action: Action) => S) => {
    let listeners: Function[] = [];
    const initial = reducer(undefined, {type: "^^initialize^^"});
    let store: S = initial;
    const dispatch = (action: Action) => {
        store = reducer(store, action);
        listeners.forEach((listener: Function) => listener());
    };
    // Initialize with unknown action type to start with the user-defined initial state
    dispatch({ type: "^^initialize^^" });
    const subscribe = (listener: () => void): (() => void) => {
        listeners.push(listener);
        return () => {
            // Function for unsubscribing listener
            listeners = listeners.filter(l => l !== listener);
        };
    };
    const getState = () => store;

    const useSelector = (selector: Function) => {
        // Sync to 'external' data source such that we don't have to use useState to have selectorStore
        // reflect the current state of data
        const selectorStore = useSyncExternalStore(subscribe, getState);
        return selector(selectorStore); // filter the data with the passed selector
    };

    const createDispatch = (actionType: string) => {
        return (restOfAction: OptionalActionArgs) => {
            dispatch({ type: actionType, ...restOfAction });
        };
    };

    return {
        dispatch,
        getState,
        useSelector,
        createDispatch,
        connect,
        subscribe,
    };
};

export { createStore };
