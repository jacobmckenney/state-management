import store from "./store";
import { CHANGE_NAME, ADD_COMPANY } from "./reducer";

const { createDispatch } = store;

const changeName = createDispatch(CHANGE_NAME);
const addCompany = createDispatch(ADD_COMPANY);

export { changeName, addCompany};