import React from "react";
import { useStore } from "../lib/provider";

const Another: React.FC = () => {
    const store = useStore();
    return <>{JSON.stringify(store)}</>;
};

export default Another;
