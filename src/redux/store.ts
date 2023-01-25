import { createStore } from "../../lib/store";
import { reducer } from "./reducer";
export const { createDispatch, createSelector } = createStore(reducer);