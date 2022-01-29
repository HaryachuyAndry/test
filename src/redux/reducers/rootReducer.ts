import { combineReducers } from "redux";
import convertReducer from "./convertReducer";
import historyReducer from "./historyReducer";
import comparisonReducer from "./comparisonReducer";
import chartReducer from "./chartReducer";

const rootReducer = combineReducers({
    convertReducer,
    historyReducer,
    comparisonReducer,
    chartReducer,

});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
