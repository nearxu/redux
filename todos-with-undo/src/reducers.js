import { combineReducers } from "redux";

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          text: action.text,
          id: action.id,
          completed: false
        }
      ];
    case "TOGGLE_TODO":
      return state.map(
        m => (m.id === action.id ? { ...m, completed: !m.completed } : m)
      );
    default:
      return state;
  }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter
});
export default todoApp;
