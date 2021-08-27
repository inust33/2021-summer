import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


const InputBox = ({ todoList, setTodoList }) => {
  const [newItem, setNewItem] = useState('');

  const onInputBox = (event) => {
    setNewItem(event.target.value);
  };

  const onSubmitBtn = (event) => {
    event.preventDefault();

    const addTodoItem = todoList.concat({
      id: todoList.length,
      newItem,
      delete: false,
    });

    setTodoList(addTodoItem);
    setNewItem('');
  };

  return (
    <form className="todoList_input" onSubmit={onSubmitBtn}>
      <input
        className="todoList_input_item"
        type="text"
        value={newItem}
        placeholder="할 일을 입력해주세요"
        onChange={onInputBox}
      />
      <button className="todoList_input_btn" type="submit">
      <div className="Logo_Add">
        <FontAwesomeIcon icon={faPlus} />
      </div>
      </button>
    </form>
  );
};

export default InputBox;