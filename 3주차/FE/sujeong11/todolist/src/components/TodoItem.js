import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"

const ToDoItem = ({ todoItem, todoList, setTodoList }) => {
  const onDeleteBtn = () => {
    const showTodoItem = todoList.map((item) => ({
      ...item,
      delete: (item.id === todoItem.id) ? true : item.delete,
    }));

    setTodoList(showTodoItem);
  };

  return (
    <div className="todoList_line">
      <li className="todoList_items">
        {todoItem.newItem}
      </li>
      <div className="Logo_Del" onClick={onDeleteBtn}>
        <button className="todoList_delete_btn" type="button" onClick={onDeleteBtn}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;

