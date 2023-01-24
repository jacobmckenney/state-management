import React, { useState } from "react";
import Test from "./Test";
import { createStore } from "../lib/store";
import { reducer, CHANGE_NAME } from "../lib/example_reducer";

const { dispatch, connect, useSelector, createDispatch} = createStore(reducer);

const App = () => {
  const state = useSelector(state => console.log(state));
  const changeName = createDispatch(CHANGE_NAME);
  const [name, setName] = useState("");
  return(
    <div>
      <h1 className="wow">Jake's Redux</h1>
        <Test/>
        <input value={name} onChange={(e) => setName(e.currentTarget.value)}></input>
        <button onClick={() => changeName({payload: name})}>dispatch action!</button>
    </div>
  );
}

export default App;