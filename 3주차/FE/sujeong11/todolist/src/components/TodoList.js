import React from 'react';
import TodoItem from './TodoItem';

const ToDoItemList = ({ todoList, setTodoList }) => (
  <div className="todoList_list">
    <p className="todoList_list_title">[ To-do-List ]</p>

    <ol className="todoList_list_items">
      {
        todoList.map((todoItem) => {
          if (todoItem.delete) return null;

          return (
            <TodoItem key={todoItem.id} todoItem={todoItem} todoList={todoList} setTodoList={setTodoList} />
          );
        })}
    </ol>
  </div>
);

export default ToDoItemList;