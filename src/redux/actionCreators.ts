import { CHANGE_NAME, ADD_COMPANY, Company } from "./reducer";
import { Action } from "../../lib/types";
import bindActionCreators from "../../lib/bindActionCreators";


const changeName = (newName: string): Action => {
    return {
        type: CHANGE_NAME,
        payload: newName,
    };
};

const addCompany = (company: Company) => ({type: ADD_COMPANY, payload: company});

export { changeName, addCompany };