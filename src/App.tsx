import React, { useState } from "react";
import Test from "./Test";
import { createStore } from "../lib/store";
import { reducer, CHANGE_NAME } from "../lib/example_reducer";
import { AppState } from "../lib/example_reducer";

const { dispatch, subscribe, connect, createDispatch, createSelector, getState } = createStore(reducer);

const App = () => {
    const changeName = createDispatch(CHANGE_NAME);
    const [name, setName] = useState<string>("");
    const filteredState = createSelector(({ name, ...rest }: AppState) => {
        return { name };
    });
    return (
        <div>
            <h1 className="wow">Jake's Redux</h1>
            <Test />
            {JSON.stringify(filteredState)}
            <input value={name} onChange={(e) => setName(e.currentTarget.value)}></input>
            <button onClick={() => changeName({ payload: name })}>dispatch action!</button>
        </div>
    );
};

export default App;
