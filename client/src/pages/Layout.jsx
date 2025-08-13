import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import { useUser, SignIn } from '@clerk/clerk-react'
const Layout = () => {
  const { user } = useUser()
  const Navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  return user ? (
    <div className='flex flex-col justify-start items-start h-screen '>
      <nav className='w-full min-h-14 flex items-center justify-between px-8  border-b border-gray-200'>
        <h1
          className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent cursor-pointer tracking-wide"
          onClick={() => Navigate('/')}
        >
          PersonalAi
        </h1>
        {
          sidebar ? <X className='w-6 h-6 text-gray-600 sm:hidden' onClick={() => setSidebar(false)} /> : (
            <Menu className='w-6 h-6 text-gray-600 sm:hidden' onClick={() => setSidebar(true)} />
          )
        }
      </nav>
      <div className='flex-1 w-full  h-[calc(100vh - 60px)] flex'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className='flex-1 bg-slate-100'>
          <Outlet />
        </div >
      </div>
    </div>
  )
    : (
      <div className='flex items-center justify-center h-screen'>
        <SignIn />
      </div>
    )
}

export default Layout