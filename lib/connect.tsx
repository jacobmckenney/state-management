import { ConnectArgs, Selector } from "./types";
import React, { FC, useState } from "react";
import bindActionCreators from "./bindActionCreators";
const connect = <T extends object>({
    mapDispatchToProps,
    mapStateToProps,
    store,
}: ConnectArgs<T>): ((component: FC) => FC) => {
    // TODO: expand functionality to allow mapDispatchToProps to be a factory funciton as seen
    // TODO: in the docs https://react-redux.js.org/using-react-redux/connect-mapdispatch#why-is-my-component-not-receiving-dispatch
    const { dispatch, subscribe, getState } = store; // TODO: augment provider.tsx so you
    // can just call useStore instead of passing it
    const mappedStateEntries = Object.entries(mapStateToProps);
    // Get initial selected state for each registered selector
    const initialState = Object.fromEntries(
        mappedStateEntries.map(([stateName, selector]: [string, Selector<T>]) => [stateName, selector(getState())])
    );
    // Just bind action creators
    const mappedDispatches = bindActionCreators(mapDispatchToProps, dispatch);

    const wrapped = (Comp: FC) => {
        // eslint-disable-next-line react/display-name
        return () => {
            const [mappedState, setMappedState] = useState(initialState);
            const mappedProps = { ...mappedDispatches, ...mappedState };
            // Subscribe to state updates
            const unsubscriptions = mappedStateEntries.map(([stateName, selector]: [string, Selector<T>]) => {
                return subscribe(() => {
                    setMappedState((prev) => ({ ...prev, [stateName]: selector(getState()) }));
                });
            });
            return <Comp {...mappedProps} />;
        };
    };
    return wrapped;
};

export default connect;
