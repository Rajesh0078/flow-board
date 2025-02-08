import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Task from './pages/Task'
import WorkingOn from './pages/WorkingOn'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Task />} path='/' />
          <Route element={<WorkingOn />} path='/projects' />
          <Route element={<WorkingOn />} path='/reports' />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App