import React, { useState } from "react";
import { StoreProvider } from "../lib/provider";
import DispatchButton from "./DispatchButton";
import { type Company, type AppState } from "./redux/reducer";
import store from "./redux/store";
import * as dispatchers from "./redux/dispatchers";

const { useSelector } = store;

const { addCompany, changeName } = dispatchers;

const App: React.FC = () => {
    const [name, setName] = useState<string>("");
    const companies: Company[] = useSelector(({ companies }: AppState) => companies);
    const selectedName = useSelector(({ name }: AppState) => name);
    return (
        <StoreProvider store={store}>
            <div>
                <h1>{selectedName}s Redux</h1>
                <input
                    value={name}
                    onChange={(e) => {
                        setName(e.currentTarget.value);
                    }}
                ></input>
                <button
                    onClick={() => {
                        changeName({ payload: name });
                    }}
                >
                    dispatch action!
                </button>
                <DispatchButton dispatch={addCompany} payload={{ name: "Levanta", salary: 6000 }}>
                    add levanta
                </DispatchButton>
                {companies.map(({ name }: Company) => (
                    <li key={name}>{name}</li>
                ))}
            </div>
        </StoreProvider>
    );
};

export default App;
