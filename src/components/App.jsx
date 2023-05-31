//packages
import React, { useState } from "react";
import { useEffect } from "react";

//styles
import "../styles/App.css";

// //actions
// import { addTodo } from "./store/todoSlice/todoSlice";

//extraReducers
import { getTask, addTask } from "./store/todoSlice/todoSlice";

//components
import Field from "./Field/Field";
import List from "./List/List";
import { useDispatch } from "react-redux";

const App = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTask());
  }, [dispatch]);

  const addTaskHelper = () => {
    if (value.length) {
      dispatch(addTask(value));
    }

    setValue("");
  };

  return (
    <div>
      <Field value={value} addTodo={addTaskHelper} setValue={setValue} />
      <List />
    </div>
  );
};

export default App;
