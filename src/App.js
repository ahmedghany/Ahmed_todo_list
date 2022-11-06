import React, { useState, useEffect } from 'react';
import './App.css';

//importing COmpOnents
import Form from './components/forms';
import TodoList from './components/TodoList';

function App() {
  
  
  //states
  const [inputText, setInputText] = useState("");
  const [todos, setTodos]  = useState([]);
  const [status, setStatus]  = useState("all");
  const [filteredTodos, setFiltertedTodos]  = useState([]);
  
  //effect
  useEffect (() =>{

    getLocalTodos();
  }, []);
  
  useEffect(() =>{
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  //functions
  const filterHandler = () =>{

    switch(status){
      
      case'completed':
        setFiltertedTodos(todos.filter(todo => todo.completed === true));
        break;
      
      case'uncompleted':
        setFiltertedTodos(todos.filter(todo => todo.completed === false));
        break;

      default:
        setFiltertedTodos(todos);
        break;
    }
  }

  //save to our local
  const saveLocalTodos = () =>{
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos =() =>{
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]));
    } else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"))
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
      <h1>Ahmed TODO List</h1>
      </header>
      <Form 
        todos = {todos} 
        inputText = {inputText}
        setTodos={setTodos} 
        setInputText ={setInputText}
        setStatus={setStatus}
        
        />
      
      <TodoList 
      todos = {todos}
      setTodos={setTodos}
      filteredTodos={filteredTodos}
        />
    </div>
  );
}

export default App;
