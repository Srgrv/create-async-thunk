//packages
import React from "react";
import { useSelector } from "react-redux";

//components
import Todo from "../Todo/Todo";

const List = () => {
  const list = useSelector(({ todos }) => todos.list);

  return (
    <ul>
      {list.map((props) => {
        return <Todo key={props.id} {...props} />;
      })}
    </ul>
  );
};

export default List;
