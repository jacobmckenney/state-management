import React, { PropsWithChildren, FC } from "react";
import { CreatedDispatch } from "../lib/types";
import { Company } from "./redux/reducer";

interface Props extends PropsWithChildren {
    addCompany: (company: Company) => void;
}

const DispatchButton: FC<Props> = ({ addCompany }) => {
    return (
        <div>
            <button onClick={() => addCompany({ name: "Levanta", salary: 6000 })}>add Levanta</button>
            {/* {companies.map(({ name }: Company) => (
                <li key={name}>{name}</li>
            ))} */}
        </div>
    );
};

export default DispatchButton;
