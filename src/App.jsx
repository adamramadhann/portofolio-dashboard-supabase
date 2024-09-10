  import React from 'react'
  import { Route, Routes } from 'react-router-dom'
  import Layout from './page/Layout'
  import LIstMahasiswa from './page/LIstMahasiswa'

  const App = () => {
    return (
      <Routes>
        <Route path='/' element={<Layout/>} > 
          <Route index element={<h1>home</h1>} />
          <Route path='list' element={<LIstMahasiswa/>} />
        </Route>
      </Routes>
    )
  }

  export default App
