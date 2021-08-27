import React, { useState } from 'react';
import InputItem from './components/InputItem';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);

  return (
    <div className="todoList_container">
      <InputItem todoList={todoList} setTodoList={setTodoList} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
};

export default App;