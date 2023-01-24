type State = Record<string, any>
type Action = RequiredActionArgs & OptionalActionArgs;
type RequiredActionArgs = {
    type: string;
}
type OptionalActionArgs = {
    payload?: any;
    meta?: any;
    error?: boolean
}
type Dispatch = (action: Action) => void;
type ActionHandlers = Record<string, (state: State, action: Action) => State>;
interface ConnectArgs {
    mapStateToProps: {[prop: string]: State},
    mapDispatchToProps: {[prop: string]: (restOfAction: OptionalActionArgs) => void},
};
type Selector<T> = (state: State) => T;

export {
   Selector, ConnectArgs, State, Action, ActionHandlers, OptionalActionArgs
};