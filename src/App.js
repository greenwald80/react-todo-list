import React, { useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import AddTodo from "./Todo/AddTodo";

function App() {
  // let mytodos = [
  //   { id: 1, completed: false, title: "One" },
  //   { id: 2, completed: false, title: "Two" },
  //   { id: 3, completed: false, title: "Three" },
  // ];
  // function toggleTodo(id) {
  //   mytodos = mytodos.map((todo) => {
  //     if (todo.id === id) {
  //       todo.completed = !todo.completed;
  //     }
  //     return todo;
  //   });
  // }

  const [mytodos, setTodos] = React.useState([
    { id: 1, completed: false, title: "One" },
    { id: 2, completed: true, title: "Two" },
    { id: 3, completed: false, title: "Three" },
  ]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((mytodos) => setTodos(mytodos));
  }, []);

  function toggleTodo(id) {
    setTodos(
      mytodos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(mytodos.filter((todo) => todo.id !== id)); //создает массив с туду, где нет указанного айди
  }

  function addTodo(title) {
    setTodos(
      mytodos.concat([
        {
          //добавляет новый объект в существующий массив
          title: title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  return (
    <Context.Provider value={{ removeTodo: removeTodo }}>
      <div className="wrapper">
        <h1>Todo List using React</h1>
        <AddTodo onCreate={addTodo} />
        {mytodos.length ? (
          <TodoList todos={mytodos} onToggle={toggleTodo} />
        ) : (
          <p>No todos</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
