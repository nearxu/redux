import React, { Component } from "react";
import { connect } from "react-redux";

const setVisibilityFilter = filter => ({
  type: "SET_VISIBILITY_FILTER",
  filter
});

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <div>{children}</div>;
  }
  return <div onClick={onClick}>{children}</div>;
};

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  }
});

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

const Footer = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </p>
);

export default Footer;
