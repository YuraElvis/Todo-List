import React, { useState, useEffect } from "react";
import './App.css';

//Importing Components
import Form from  "./components/Form.js"
import TodoList from "./components/TodoList";

function App() {
    //State
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all")
    const [filteredTodos, setFilteredTodos] = useState([]);
    // Run once at the Start
    useEffect(() => {
        getLocalTodos();
    }, []);
    //Use Effect
    useEffect(() => {
        filterHandler();
        saveLocalTodos();
    }, [todos, status]);

    //Function and Events
    const filterHandler= () => {
      switch (status){
          case "completed": void
              setFilteredTodos(todos.filter((todo) => todo.completed === true))
              break;
          case "uncompleted": void
              setFilteredTodos(todos.filter((todo) => todo.completed === false))
              break;
          default: setFilteredTodos(todos);
          break;
      }
    };
    //Save To Local
    const saveLocalTodos = () => {
           localStorage.setItem("todos", JSON.stringify(todos))
    };
    const getLocalTodos = () => {
        if(localStorage.getItem("todos") === null){
            localStorage.setItem("todos", JSON.stringify([]));
        }else {
         let todoLocal = JSON.parse(localStorage.getItem("todos"));
         setTodos(todoLocal);
        }
    }

  return (
    <div className="App">
        <header>
            <h1>My Todo List</h1>
        </header>
        <Form
            inputText={inputText}
            todos={todos}
            setTodos={setTodos}
            setInputText={setInputText}
            setStatus={setStatus}/>
        <TodoList
            filteredTodos={filteredTodos}
            setTodos={setTodos}
            todos={todos}/>
    </div>
  );
}

export default App;
