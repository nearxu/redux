import { combineReducers } from "redux";
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from "../actions";

const initState = {
  isFetching: false,
  didInvalidate: false,
  items: []
};

const selectedSub = (state = "reactjs", action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.sub;
    default:
      return state;
  }
};

const posts = (state = initState, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
};
const postsBySub = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      console.log(action, "action");
      return {
        ...state,
        [action.sub]: posts(state[action.sub], action)
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  postsBySub,
  selectedSub
});

export default rootReducer;
