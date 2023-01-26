import React, { FC, useContext, createContext, PropsWithChildren } from "react";
import { Store } from "./types";

interface Props<S> extends PropsWithChildren {
    store: Store<S>;
}
const StoreContext = createContext({});

function StoreProvider<S>({ store, children }: Props<S>) {
    const { useSelector } = store;
    return <StoreContext.Provider value={useSelector((store) => store)}>{children}</StoreContext.Provider>;
}

function useStore() {
    const store = useContext(StoreContext);
    return store;
}

export { StoreProvider, useStore };
