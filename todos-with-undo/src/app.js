import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "./footer";
// action
let nextTodoId = 0;
const addTodos = text => ({
  type: "ADD_TODO",
  text,
  id: nextTodoId++
});

const toggleTodo = id => ({
  type: "TOGGLE_TODO",
  id
});

// container
const addTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          console.log(input.value);
          dispatch(addTodos(input.value));
          input.value = "";
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">add todos</button>
      </form>
    </div>
  );
};

const AddTodoc = connect()(addTodo);

const Todos = ({ todos, onTodoClick }) => {
  console.log(todos, "todos");
  return (
    <div>
      {todos.map((m, i) => {
        return (
          <div
            style={{
              textDecoration: m.completed ? "line-through" : "none"
            }}
            key={i}
            onClick={() => onTodoClick(m.id)}
          >
            {m.text}
          </div>
        );
      })}
    </div>
  );
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = {
  onTodoClick: toggleTodo
};
const TodosList = connect(mapStateToProps, mapDispatchToProps)(Todos);

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <AddTodoc />
        <TodosList />
        <Footer />
      </div>
    );
  }
}

export default Index;
