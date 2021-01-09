import React, { useEffect, useState } from "react";
import TodoList from "./Components/todoList";
import Loader from "./Components/loader/loader";
import Context from "./context";

const AddTodo = React.lazy(
  () =>
    new Promise((resolve) => {
      resolve(import("./Components/addTodo/addTodo"));
    })
);

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todos) => {
        setTodos(todos);
        setLoading(false);
      });
  }, []);

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const addTodo = (title) => {
    setTodos(
      todos.concat([
        {
          title,
          id: Math.floor(Math.random() * 100), //ради примера
          completed: false,
        },
      ])
    );
  };

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1> React tutorial </h1>
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}

        {todos.length > 1 ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
