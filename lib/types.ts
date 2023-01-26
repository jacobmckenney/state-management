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
    mapStateToProps: {[prop: string]: Selector<S>},
    mapDispatchToProps: ActionCreators,
    store: Store<S>;
};
type Selector<S> = (state: S) => any;
type Snapshot<S> = () => S;
type SelectorFactory<S> = (selector: Selector<S>) => any;
type DispatchFactory<S> = (actionType: string) => CreatedDispatch;
type SubscribeFn = (listener: () => void) => (() => void);
type Store<S> = {
    dispatch: Dispatch,
    getState: Snapshot<S>,
    useSelector: SelectorFactory<S>,
    createDispatch: DispatchFactory<S>,
    subscribe: SubscribeFn,
}
type ActionCreator = (...args: any) => Action;
type ActionCreators = {
    [name: string]: ActionCreator
}

export {
    ActionCreator, ActionCreators, SubscribeFn, Snapshot, SelectorFactory, DispatchFactory, Dispatch, CreatedDispatch, Store, Selector, ConnectArgs, Action, ActionHandlers, OptionalActionArgs
};