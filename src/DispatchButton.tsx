import React, { PropsWithChildren, FC } from "react";
import { CreatedDispatch } from "../lib/types";
import { Company } from "./redux/types";

interface Props extends PropsWithChildren {
    addCompany: (company: Company) => void;
    companies: Company[];
    name: string;
}

const DispatchButton: FC<Props> = ({ addCompany, companies }) => {
    return (
        <div>
            <button onClick={() => addCompany({ name: "Levanta", salary: 6000 })}>add Levanta</button>
            {companies.map(({ name }: Company) => (
                <li key={name}>{name}</li>
            ))}
        </div>
    );
};

export default DispatchButton;
