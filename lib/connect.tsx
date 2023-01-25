import { ConnectArgs } from "./types";
import React, { FC } from "react";
const connect = ({ mapDispatchToProps, mapStateToProps }: ConnectArgs): ((component: FC) => FC) => {
    const mappedProps = { ...mapDispatchToProps, ...mapStateToProps };
    const wrapped = (Comp: FC) => {
        return () => <Comp {...mappedProps} />;
    };
    return wrapped;
};

export default connect;
