import React, { useState } from "react";
import DispatchButton from "./DispatchButton";
import { CHANGE_NAME, ADD_COMPANY, Company } from "./redux/reducer";
import { AppState } from "./redux/reducer";
import { createDispatch, createSelector } from "./redux/store";

const App = () => {
    const changeName = createDispatch(CHANGE_NAME);
    const addCompany = createDispatch(ADD_COMPANY);
    const [name, setName] = useState<string>("");
    const selectedName = createSelector(({ name }: AppState) => name);
    const companies: Company[] = createSelector(({ companies }: AppState) => companies);
    return (
        <div>
            <h1>{selectedName}'s Redux</h1>
            <input value={name} onChange={(e) => setName(e.currentTarget.value)}></input>
            <button onClick={() => changeName({ payload: name })}>dispatch action!</button>
            <DispatchButton dispatch={addCompany} payload={{ name: "Levanta", salary: 6000 }}>
                add levanta
            </DispatchButton>
            {companies.map(({ name }: Company) => (
                <li key={name}>{name}</li>
            ))}
        </div>
    );
};

export default App;
