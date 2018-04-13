export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";

export const selectSub = sub => ({
  type: SELECT_SUBREDDIT,
  sub
});

export const requestPosts = sub => ({
  type: REQUEST_POSTS,
  sub
});

export const receivePosts = (sub, json) => ({
  type: RECEIVE_POSTS,
  sub,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
});

const fetchPosts = sub => dispatch => {
  dispatch(requestPosts(sub));
  return fetch(`https://www.reddit.com/r/${sub}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(sub, json)));
};
const shouldFetchPosts = (state, sub) => {
  const posts = state.postsBySub[sub];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
};

export const fetchPostsIfNeeded = sub => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), sub)) {
    return dispatch(fetchPosts(sub));
  }
};
