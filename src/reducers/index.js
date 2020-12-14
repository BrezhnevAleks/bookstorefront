import { combineReducers } from "redux";

import user from "./userReducer";
import booklist from "./booksReducer";
import lists from "./listsReducer";

export default combineReducers({
  booklist,
  user,
  lists,
});
