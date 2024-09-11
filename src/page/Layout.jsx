import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {

  return (


    <div className={` flex w-screen h-screen `}>
        <div className='w-[200px] items-center gap-5 bg-slate-100 flex flex-col '>
            <NavLink to={'/'} className={''} >Home</NavLink>
            <NavLink to={'list'} className={''} >Data Mhs</NavLink>
            <NavLink to={'message'} className={''} >Message</NavLink>
        </div>
        <div className='p-3 w-full'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout
