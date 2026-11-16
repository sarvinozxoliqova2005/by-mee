import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import HomaPages from '../pages/HomaPages'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Layout/>}>
        <Route index element = {<HomaPages/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App