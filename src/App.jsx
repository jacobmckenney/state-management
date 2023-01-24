import React, { useState } from "react";
import Test from "./Test";
import { createStore } from "../lib/store";
import { reducer, CHANGE_NAME } from "../lib/example_reducer";


const App = () => {
  const { store, dispatch, connect, useSelector, createDispatch, getState} = createStore(reducer);
  const changeName = createDispatch(CHANGE_NAME);
  const [name, setName] = useState("");
  let value = useSelector(state => state);
  return(
    <div>
      <h1 className="wow">Jake's Redux</h1>
        <Test/>
        {JSON.stringify(store)}
        <input value={name} onChange={(e) => setName(e.currentTarget.value)}></input>
        <button onClick={() => changeName({payload: name})}>dispatch action!</button>
        <button onClick={() => console.log(value)}>log state</button>
    </div>
  );
}

export default App;