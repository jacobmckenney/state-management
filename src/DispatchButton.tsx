import React, { PropsWithChildren, FC } from "react";
import { CreatedDispatch } from "../lib/types";

interface Props extends PropsWithChildren {
    dispatch: CreatedDispatch;
    payload: any;
}

const DispatchButton: FC<Props> = ({ dispatch, payload, children }) => {
    return <button onClick={() => dispatch({ payload })}>{children}</button>;
};

export default DispatchButton;
