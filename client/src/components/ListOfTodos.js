import React from 'react';
import { useTodo } from '../context/TodoContext';

const ListOfTodos = () => {
  const { todos } = useTodo();

  return <div>List of Todos</div>;
};

export default ListOfTodos;
