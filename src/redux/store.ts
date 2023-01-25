import { createStore } from "../../lib/store";
import { reducer } from "./reducer";
export const { createDispatch, useSelector } = createStore(reducer);