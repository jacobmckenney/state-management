import React, { useState } from "react";
import DispatchButton from "./DispatchButton";
import { Company } from "./redux/reducer";
import { AppState } from "./redux/reducer";
import { useSelector } from "./redux/store";
import * as dispatchers from "./redux/dispatchers";

const { addCompany, changeName } = dispatchers;

const App = () => {
    const [name, setName] = useState<string>("");
    const companies: Company[] = useSelector(({ companies }: AppState) => companies);
    const selectedName = useSelector(({ name }: AppState) => name);
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
