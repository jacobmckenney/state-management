import React, { useState } from "react";
import { StoreProvider } from "../lib/provider";
import DispatchButton from "./DispatchButton.connect";
import { type Company, type AppState } from "./redux/reducer";
import store from "./redux/store";
import * as actionCreators from "./redux/actionCreators";
import bindActionCreators from "../lib/bindActionCreators";

const { useSelector, dispatch } = store;
const { changeName, addCompany } = bindActionCreators(actionCreators, dispatch);

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
                        changeName(name);
                    }}
                >
                    dispatch action!
                </button>
                <DispatchButton />
            </div>
        </StoreProvider>
    );
};

export default App;
