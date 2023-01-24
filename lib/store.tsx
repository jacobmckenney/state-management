import { Component, FC, ReactElement, useState } from "react";
import React from "react";
import { Action, OptionalActionArgs, State, ConnectArgs } from "./types";

type Selector = (state: State) => State;

const createStore = (reducer: (state: State, action: Action) => State) => {
    // Initialize to an undefined object and unkown type to start with the user-defined initial state
    const [store, setStore] = useState<State>(() => reducer(undefined, { type: "^^initialize^^" })); // use functional init for lazy init (one call)
    const dispatch = (action: Action) => {
        setStore(reducer(store, action));
    };
    return {
        dispatch,
        store,
        getState: () => store,
        useSelector: (selector: Selector) => {
            return selector(store);
        },
        createDispatch: (actionType: string) => {
            return (restOfAction: OptionalActionArgs) => {
                dispatch({ type: actionType, ...restOfAction });
            };
        },
        connect: ({ mapDispatchToProps, mapStateToProps }: ConnectArgs): ((component: FC) => FC) => {
            const mappedProps = { ...mapDispatchToProps, ...mapStateToProps };
            const wrapped = (Comp: FC) => {
                return () => <Comp {...mappedProps} />;
            };
            return wrapped;
        },
    };
};

export { createStore };
