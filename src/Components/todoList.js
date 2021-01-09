import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./todoItem/todoItem";

export default function TodoList(props) {
  return (
    <ul>
      {props.todos.map((todo, index) => {
        return (
          <TodoItem
            key={todo.id}
            index={index}
            todo={todo}
            onChange={props.onToggle}
          />
        );
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
};
