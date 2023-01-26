import connect from "../lib/connect";
import DispatchButton from "./DispatchButton";
import store from "./redux/store";
import { addCompany } from "./redux/actionCreators";
import { AppState } from "./redux/reducer";

export default connect({
    mapDispatchToProps: { addCompany },
    mapStateToProps: {
        companies: ({ companies }: AppState) => companies,
        name: ({ name }) => name,
    },
    store,
})(DispatchButton);
