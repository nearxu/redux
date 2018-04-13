import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const setVisibilityFilter = filter => ({
  type: "SET_VISIBILITY_FILTER",
  filter
});

const FilterLink = ({ active, onClick, children }) => {
  if (active) {
    return <span>{children}</span>;
  }
  return <div onClick={() => onClick()}>{children}</div>;
};
FilterLink.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func
};
const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  }
});

const FilterLinks = connect(mapStateToProps, mapDispatchToProps)(FilterLink);

let Footer = () => (
  <div>
    Show: <FilterLinks filter="SHOW_ALL">All</FilterLinks>
    <FilterLinks filter="SHOW_ACTIVE">Active</FilterLinks>
    <FilterLinks filter="SHOW_COMPLETED">Completed</FilterLinks>
  </div>
);

export default Footer;
