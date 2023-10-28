import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Empleados from './pages/Empleados'
import EmpleadoForm from './pages/EmpleadoForm'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Empleados/>}/>
        <Route path='/form/:id?' element={<EmpleadoForm/>}/>
      </Routes>
    </>
  )
}

export default App
