import { ConnectArgs } from "./types";
import React, { FC } from "react";
const connect = <T extends object>({
    mapDispatchToProps,
    mapStateToProps,
}: ConnectArgs<T>): ((component: FC) => FC) => {
    const mappedProps = { ...mapDispatchToProps, ...mapStateToProps };
    const wrapped = (Comp: FC) => {
        return () => <Comp {...mappedProps} />;
    };
    return wrapped;
};

export default connect;
