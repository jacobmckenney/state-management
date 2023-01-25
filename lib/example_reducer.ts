import type { Action, ActionHandlers} from "./types"

const initialState = {
    name: "Jacob",
    title: "Software Engineer",
    companies: [{
        name: "Amazon",
        salary: 9000
    },
    {
        name: "Grovia",
        salary: 1000,
    }, {
        name: "Zillow",
        salary: 8000,
    }],
};

type AppState = typeof initialState;

export const CHANGE_NAME = "change_name";
export const ADD_COMPANY = "add_company"

const HANDLERS: ActionHandlers<AppState> = {
   [CHANGE_NAME]: (state: AppState, action: Action) => {
        return {
            ...state,
            name: action.payload
        }
   },
   [ADD_COMPANY]: (state: AppState, action: Action) => {
        const newCompany = action.payload;
        const currentCompanies = state?.companies;
        return currentCompanies.includes(newCompany) ? state : {
            ...state,
            companies: [...currentCompanies, newCompany]
        }
   }
}

const reducer = (state: AppState = initialState, action: Action) => {
    if(HANDLERS[action.type]) {
        return HANDLERS[action.type](state, action);
    }
    return state;
}

export { reducer, AppState };