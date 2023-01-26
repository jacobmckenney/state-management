import { createStore } from "../../lib/store";
import { AppState, reducer } from "./reducer";
const store = createStore<AppState>(reducer);
export default store;