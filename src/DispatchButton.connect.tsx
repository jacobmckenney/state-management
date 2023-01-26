import connect from "../lib/connect";
import DispatchButton from "./DispatchButton";
import store from "./redux/store";
import { addCompany } from "./redux/actionCreators";

export default connect({
    mapDispatchToProps: { addCompany },
    mapStateToProps: {},
    store,
})(DispatchButton);
