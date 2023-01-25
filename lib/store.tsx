import { Component, FC, ReactElement, useState } from "react";
import React from "react";
import { Action, OptionalActionArgs, State, ConnectArgs } from "./types";

type Selector = (state: State) => State;

const createStore = (reducer: (state: State, action: Action) => State) => {
    const listeners: Function[] = [];
    let store: State = undefined; // use functional init for lazy init (one call)
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

    const connect = ({ mapDispatchToProps, mapStateToProps }: ConnectArgs): ((component: FC) => FC) => {
        const mappedProps = { ...mapDispatchToProps, ...mapStateToProps };
        const wrapped = (Comp: FC) => {
            return () => <Comp {...mappedProps} />;
        };
        return wrapped;
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
