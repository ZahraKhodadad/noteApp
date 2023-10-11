import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import AddTodoForm from "./components/Todos/AddTodoForm";
import TodoList from "./components/Todos/TodoList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container pt-3">
      <h1 className="text-center">TodoApp with RTK</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}

export default App;
