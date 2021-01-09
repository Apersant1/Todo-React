import React, { useState } from "react";
import PropTypes from "prop-types";

function AddTodo({ onCreate }) {
  const [value, SetValue] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    if (value.trim()) {
      onCreate(value);
      SetValue("");
    }
  }

  return (
    <form
      style={{ marginBottom: "10px", marginLeft: "10%" }}
      onSubmit={submitHandler}
    >
      <input
        type="text"
        value={value}
        onChange={(event) => SetValue(event.target.value)}
      />
      <button type="submit">Add todo</button>
    </form>
  );
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
