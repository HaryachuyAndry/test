import { combineReducers } from "redux";
import convertReducer from "./convertReducer";

const rootReducer = combineReducers({
    convertReducer 
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
