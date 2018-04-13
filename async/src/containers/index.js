import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPostsIfNeeded, selectSub } from "../actions";
import Picker from "./picker";
import Posts from "./posts";
class Index extends Component {
  componentDidMount() {
    const { dispatch, selectedSub } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSub));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSub !== this.props.selectedSub) {
      const { dispatch, selectedSub } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedSub));
    }
  }
  handleChange = nextSub => {
    this.props.dispatch(selectSub(nextSub));
  };
  render() {
    const { selectedSub, posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker
          value={selectedSub}
          onChange={this.handleChange}
          options={["reactjs", "frontend"]}
        />
        <Posts posts={posts} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { selectedSub, postsBySub } = state;
  console.log(selectedSub, postsBySub, "props123");
  const { isFetching, lastUpdated, items: posts } = postsBySub[selectedSub] || {
    isFetching: true,
    items: []
  };
  return {
    selectedSub,
    posts,
    isFetching,
    lastUpdated
  };
};
export default connect(mapStateToProps)(Index);
