//packages
import React from "react";

const Field = ({ value, addTodo, setValue }) => {
  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={addTodo}>Add</button>
    </div>
  );
};

export default Field;
