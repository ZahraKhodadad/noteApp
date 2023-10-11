import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../../features/todos/todoSlice";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();
  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center gap-1">
          <input
            onChange={(e) => dispatch(toggleTodo({ id }))}
            type="checkbox"
            className="mr-3"
            checked={completed}
          ></input>
          <span>{title}</span>
        </span>
        <button
          onClick={() => dispatch(deleteTodo({ id }))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;