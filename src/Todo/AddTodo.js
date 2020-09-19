import React, { useState } from "react";
import PropTypes from "prop-types";

//создаю свой хук
function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(""); //начальное состояние у value пустая строка
  //return { value: value, onChange: (event) => setValue(event.target.value) };
  return {
    bind: { value: value, onChange: (event) => setValue(event.target.value) },
    clear: () => setValue(""),
    value: () => value,
  };
}

function AddTodo({ onCreate }) {
  //const [value, setValue] = useState(""); //начальное состояние у value пустая строка
  const input = useInputValue("");

  function submitHandler(event) {
    event.preventDefault(); //отменяю дефолтное поведение страницы с перезагрузкой
    // if (value.trim()) {
    //   onCreate(value); //onCreate - нужно передавать как параметр функции
    //   setValue(""); //после добавления очищает поле со значением
    // }
    if (input.value().trim()) {
      onCreate(input.value()); //onCreate - нужно передавать как параметр функции
      //setValue(""); //после добавления очищает поле со значением
      input.clear();
    }
  }
  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
      {/* <input value={value} onChange={(event) => setValue(event.target.value)} /> */}
      <input {...input.bind} />
      <button type="submit">Add todo</button>
    </form>
  );
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
