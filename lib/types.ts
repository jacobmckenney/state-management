/* eslint-disable @typescript-eslint/no-explicit-any */
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
type CreatedDispatch = (opArgs: OptionalActionArgs) => void;
type ActionHandlers<S> = Record<string, (state: S, action: Action) => S>;
type ConnectArgs<S> = {
    mapStateToProps: {[prop: string]: S},
    mapDispatchToProps: {[prop: string]: (restOfAction: OptionalActionArgs) => void},
};
type Selector<S> = (state: S) => any;
type Snapshot<S> = () => S;
type SelectorFactory<S> = (selector: Selector<S>) => any;
type DispatchFactory<S> = (actionType: string) => CreatedDispatch;
type SubscribeFn<S> = (listener: () => void) => (() => void);
type Store<S> = {
    dispatch: Dispatch,
    getState: Snapshot<S>,
    useSelector: SelectorFactory<S>,
    createDispatch: DispatchFactory<S>,
    subscribe: SubscribeFn<S>,
}

export {
    SubscribeFn, Snapshot, SelectorFactory, DispatchFactory, Dispatch, CreatedDispatch, Store, Selector, ConnectArgs, Action, ActionHandlers, OptionalActionArgs
};