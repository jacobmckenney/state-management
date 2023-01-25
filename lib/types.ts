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
type ActionHandlers<S> = Record<string, (state: S, action: Action) => S>;
interface ConnectArgs<S> {
    mapStateToProps: {[prop: string]: S},
    mapDispatchToProps: {[prop: string]: (restOfAction: OptionalActionArgs) => void},
};
type Selector<S, T> = (state: S) => T;

export {
   Selector, ConnectArgs, Action, ActionHandlers, OptionalActionArgs
};