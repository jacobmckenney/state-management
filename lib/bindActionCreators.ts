import { ActionCreator, ActionCreators, Dispatch } from "./types";

const bindActionCreators = (actionCreators: ActionCreators, dispatch: Dispatch) => {
    return Object.fromEntries(Object.entries(actionCreators).map(([actionName, actionCreator]: [string, ActionCreator]) => {
        return [actionName, (args: Parameters<ActionCreator>) => {
            dispatch(actionCreator(args));
        }];
    }));

};

export default bindActionCreators;