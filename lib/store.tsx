import { Component, FC, ReactElement } from "react";
import React from "react";
import { Action, OptionalActionArgs, State, ConnectArgs } from "./types";

const createStore = (reducer: (state: State, action: Action) => State) => {
    let store: any = undefined;
    const dispatch = (action: Action) => {
        store = reducer(store, action);
    };
    return {
        dispatch,
        useSelector: (selector: (state: State | undefined) => State | undefined) => {
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
