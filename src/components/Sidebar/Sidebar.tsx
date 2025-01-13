import { Coins, Home, Settings, User, Wallet } from 'lucide-react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const sideBarItems = [
    {
      name: 'Home',
      path: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Wallets',
      path: '/wallets',
      icon: <Wallet size={18} />
    },
    {
      name: 'Investments',
      path: '/investments',
      icon: <Coins size={18} />
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <User size={18} />
    }
  ]
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <div>
      <div className='p-4 flex flex-col justify-between h-[90vh] border-r border-r-zinc-800 w-52 '>
        <div className='space-y-2'>
          {sideBarItems?.map(item => {
            return (
              <div
                className={`cursor-pointer hover:bg-zinc-800 py-2  rounded-lg pl-2
                 transition-all ${
                   location.pathname === item.path && 'bg-teal-500'
                 }  flex items-center gap-2 text-[15px]`}
                onClick={() => navigate(item.path)}
              >
                <span>{item?.icon}</span>
                <h1 className='poppins-regular'>{item?.name}</h1>
              </div>
            )
          })}
        </div>
        <div className='flex items-center gap-2 cursor-pointer pl-2'>
          <Settings size={18} />
          <h1>Settings</h1>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
