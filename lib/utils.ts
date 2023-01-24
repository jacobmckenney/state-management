import { State } from "./types";
const getUseSelector = (store: State | undefined) => {
    console.log(store);
    const useSelector = <T>(selector: (state: State| undefined) => T) => {
        return selector(store);
    }
    return useSelector;
}



export { getUseSelector };