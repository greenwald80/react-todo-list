import React, { useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

//import AddTodo from "./Todo/AddTodo";
//const AddTodo = React.lazy(() => import("./Todo/AddTodo"));
const AddTodo = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("./Todo/AddTodo"));
      }, 3000);
    })
);

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
    // { id: 1, completed: false, title: "One" },
    // { id: 2, completed: true, title: "Two" },
    // { id: 3, completed: false, title: "Three" },
  ]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((mytodos) => {
        setTimeout(() => {
          setTodos(mytodos);
          setLoading(false);
        }, 2000);
      });
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
        <Modal/>
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        {loading && <Loader />}
        {mytodos.length ? (
          <TodoList todos={mytodos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todos</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
