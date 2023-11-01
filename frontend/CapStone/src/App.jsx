import React from 'react'
import { useState, useContext, createContext } from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './HomePage'
import SignUpPage from './components/SignUpPage'
import ChatPage from './ChatPage'

const App = () => {

  return (
    <>
    <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/SignUp' element={<SignUpPage />} />
          <Route path='/ChatPage' element={<ChatPage />} />
    </Routes>   
    </>
  )
}

export default App
