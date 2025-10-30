import { useState } from 'react'
import React from "react";
import './App.css'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router';
import CreateTodo from './Pages/CreateTodo';
import UpdateTodo from './Pages/updateTodo';
import ItemDisplay from './Pages/ItemDisplay';
function App() {
 

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-todo" element={<CreateTodo />} />
        <Route path="/updateTodo/:id" element={<UpdateTodo />} />
        <Route path="/ItemDisplay/:id" element={<ItemDisplay />} />
      </Routes>
      
    </>
  )
}

export default App
