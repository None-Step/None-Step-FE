import { combineReducers } from "@reduxjs/toolkit";
import memberReducer from "./slices/memberSlice";
import categoryReducer from "./slices/categorySlice";

// combineReducers : 여러 reducer를 결합 => 추후 리듀서를 추가할 경우 여기다 추가하면 됨
const rootReducer = combineReducers({
    member: memberReducer,
    category: categoryReducer,
});

export default rootReducer;
