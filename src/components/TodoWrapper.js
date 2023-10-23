import React, { useState,useEffect } from "react";
import { Todo } from "./Todo";
import {TodoForm} from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = ({name}) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
}, []);

  const addTodo = (todo) => {
    console.log(todos);
    const newTodos = [...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}];
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const deleteTodo = (id) =>  { 
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos))
};


  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
      const newTodos = todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo);
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
  }
    /*setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );*/
  

  return (
    <div className="TodoWrapper">
      <h1>ToDo - List</h1>

      <h2>Let's Start Now !!!</h2>
 
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};