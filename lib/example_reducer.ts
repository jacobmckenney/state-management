import type { State, Action, ActionHandlers} from "./types"

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

type S = typeof initialState;
;

export const CHANGE_NAME = "change_name";
export const ADD_COMPANY = "add_company"

const HANDLERS: ActionHandlers = {
   [CHANGE_NAME]: (state: State, action: Action) => {
        return {
            ...state,
            name: action.payload
        }
   },
   [ADD_COMPANY]: (state: State, action: Action) => {
        const newCompany = action.payload;
        const currentCompanies = state?.companies;
        return currentCompanies.includes(newCompany) ? state : {
            ...state,
            companies: [...currentCompanies, newCompany]
        }
   }
}

type ActionHandler = (state: S, action: Action) => S;

interface HandlerTypes {
    [CHANGE_NAME]: ActionHandler,
    [ADD_COMPANY]: ActionHandler,
}

type PossibleHandlers = {[key in keyof HandlerTypes]}

const reducer = (state: S = initialState, action: Action) => {
    if(HANDLERS[action.type]) {
        return HANDLERS[action.type](state, action);
    }
    return state;
}

export { reducer, S };