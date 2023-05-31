//packages
import React from "react";
import { useDispatch } from "react-redux";

//extraReducers
import { toogleTask } from "../store/todoSlice/todoSlice";

//actions
import { deleteTask } from "../store/todoSlice/todoSlice";

const Todo = ({ title, id, completed }) => {
  const dispatch = useDispatch();
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toogleTask(id))}
      />
      <span>{title}</span>
      <span onClick={() => dispatch(deleteTask(id))}>&times;</span>
    </li>
  );
};

export default Todo;
