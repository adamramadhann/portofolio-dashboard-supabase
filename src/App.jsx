  import React from 'react'
  import { Route, Routes } from 'react-router-dom'
  import Layout from './page/Layout'
  import LIstMahasiswa from './page/LIstMahasiswa'
import Messages from './page/message/Messages'
import FormMessage from './page/message/FormMessage'
import DetailMessage from './page/message/DetailMessage'
import HomeScreen from './page/HomeScreen'
import UserProfile from './page/UserProfile'

  const App = () => {
    return (
      <Routes>
        <Route path='/' element={<Layout/>} > 
          <Route index element={<HomeScreen/>} />
          <Route path='list' element={<LIstMahasiswa/>} />
          <Route path='message' element={<Messages/>} />
          <Route path='formMessage' element={<FormMessage/>} />
          <Route path='detailMessage' element={<DetailMessage/>} />
          <Route path='profile' element={<UserProfile/>} />
        </Route>
      </Routes>
    )
  }

  export default App
