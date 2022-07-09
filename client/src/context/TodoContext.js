import React from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const TodoContext = React.createContext();

const TodoProvider = ({ children }) => {
  const { token } = useAuth();
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/todos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(response.data);
      } catch (err) {
        throw new Error(err);
      }
    };
    getTodos();
  }, [token]);

  return (
    <TodoContext.Provider value={{ todos }}>{children}</TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used inside a TodoProvider');
  }
  return context;
};

export default TodoProvider;
