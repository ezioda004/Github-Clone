import { createStore } from "redux";
import { reducer } from "../reducers/index";

//create redux store
export const store = createStore(reducer);
