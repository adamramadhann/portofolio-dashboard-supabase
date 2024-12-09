import { EditOutlined, HomeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div 
      className={`flex relative overflow-y-hidden flex-col w-screen h-screen bg-cover bg-center`} 
    >
       {/* Main Content */}
       <div className="flex-grow bg-gradient-to-r from-blue-100 to-blue-200 p-5">
        <div className="w-full  flex-1 h-full  bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg  ">
          <Outlet />
        </div>
      </div>
      {/* Sidebar */}
      <div className="w-full h-[50px] bottom-10 absolute flex-1 flex justify-center items-center">
      {/* Navbar Container */}
      <div className='gap-5 bg-white/80 justify-between px- w-[800px] backdrop-blur-lg shadow-lg py-5 flex items-center'>
        {/* Home NavLink with Icon */}
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            `hover:text-blue-500 font-medium border-r-4 h-full text-center w-full transition-colors ${
              isActive ? 'text-blue-600 underline' : ''
            }`
          }
        >
          <HomeOutlined className="mr-2" /> {/* Home Icon */}
          Home
        </NavLink>

        {/* Data Mhs NavLink with Icon */}
        <NavLink
          to={'list'}
          className={({ isActive }) =>
            `hover:text-blue-500 font-medium border-r-4 h-full text-center w-full transition-colors ${
              isActive ? 'text-blue-600 underline' : ''
            }`
          }
        >
          <UserOutlined className="mr-2" /> {/* User Icon */}
          Data Mhs
        </NavLink>

        {/* Message NavLink with Icon */}
        <NavLink
          to={'message'}
          className={({ isActive }) =>
            `hover:text-blue-500 font-medium border-r-4 h-full text-center w-full transition-colors ${
              isActive ? 'text-blue-600 underline' : ''
            }`
          }
        >
          <MessageOutlined className="mr-2" /> {/* Message Icon */}
          Message
        </NavLink>

        {/* Send Message NavLink with Icon */}
        <NavLink
          to={'formMessage'}
          className={({ isActive }) =>
            `hover:text-blue-500 font-medium text-center w-full transition-colors ${
              isActive ? 'text-blue-600 underline' : ''
            }`
          }
        >
          <EditOutlined className="mr-2" /> {/* Edit Icon */}
          Send Message
        </NavLink>
        <NavLink
          to={'profile'}
          className={({ isActive }) =>
            `hover:text-blue-500 font-medium text-center w-full transition-colors ${
              isActive ? 'text-blue-600 underline' : ''
            }`
          }
        >
          <EditOutlined className="mr-2" /> {/* Edit Icon */}
          Profile
        </NavLink>
      </div>
    </div>
    </div>
  );
};

export default Layout;
