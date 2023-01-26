import { ConnectArgs, Selector } from "./types";
import React, { FC } from "react";
import bindActionCreators from "./bindActionCreators";
const connect = <T extends object>({
    mapDispatchToProps,
    mapStateToProps,
    store,
}: ConnectArgs<T>): ((component: FC) => FC) => {
    const { dispatch, useSelector } = store; // TODO: augment provider.tsx so you
    // can just call useStore instead of passing it
    const mappedState = Object.fromEntries(
        Object.entries(mapStateToProps).map(([stateName, selector]: [string, Selector<T>]) => {
            return [stateName, useSelector(selector)];
        })
    );
    const mappedDispatches = bindActionCreators(mapDispatchToProps, dispatch);
    const mappedProps = { ...mappedDispatches, ...mappedState };

    const wrapped = (Comp: FC) => {
        // eslint-disable-next-line react/display-name
        return () => <Comp {...mappedProps} />;
    };
    return wrapped;
};

export default connect;
