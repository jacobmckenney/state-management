/* eslint-disable @typescript-eslint/ban-types */
import { useSyncExternalStore } from "react";
import { SubscribeFn, Action, Dispatch, OptionalActionArgs, Store, Snapshot, SelectorFactory, DispatchFactory} from "./types";

const createStore = <S>(reducer: (state: S | undefined, action: Action) => S): Store<S> => {
    let listeners: Function[] = [];
    const initial = reducer(undefined, {type: "^^initialize^^"});
    let store: S = initial;
    const dispatch: Dispatch = (action: Action) => {
        store = reducer(store, action);
        listeners.forEach((listener: Function) => listener());
    };
    // Initialize with unknown action type to start with the user-defined initial state
    dispatch({ type: "^^initialize^^" });

    const subscribe: SubscribeFn<S> = (listener: () => void): (() => void) => {
        listeners.push(listener);
        return () => {
            // Function for unsubscribing listener
            listeners = listeners.filter(l => l !== listener);
        };
    };
    const getState: Snapshot<S> = () => store;

    const useSelector: SelectorFactory<S> = (selector: Function) => {
        // Sync to 'external' data source such that we don't have to use useState to have selectorStore
        // reflect the current state of data
        const selectorStore = useSyncExternalStore(subscribe, getState);
        return selector(selectorStore); // filter the data with the passed selector
    };

    const createDispatch: DispatchFactory<S> = (actionType: string) => {
        return (restOfAction: OptionalActionArgs) => {
            dispatch({ type: actionType, ...restOfAction });
        };
    };

    return {
        dispatch,
        getState,
        useSelector,
        createDispatch,
        subscribe,
    };
};

export { createStore };
