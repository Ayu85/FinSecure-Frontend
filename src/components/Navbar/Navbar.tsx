import React from 'react'
import { ModeToggle } from '../mode-toogle'
import { LogOut, ShieldEllipsis } from 'lucide-react'
import useAuth from '@/store/useAuth'
import { Button } from '../ui/button'

const Navbar = () => {
  const { authUser, logout } = useAuth()
  console.log(authUser)

  return (
    <div className='p-4 flex justify-between dark:shadow-xl  dark:shadow-zinc-900 shadow-zinc-100 shadow-lg'>
      <div className='flex items-center gap-1 text-teal-500 text-xl'>
        <h1 className='poppins-semibold'>FinSecure</h1>
        <ShieldEllipsis />
      </div>
      <div className='flex items-center gap-6'>
        {authUser && (
          <div>
            <h1 className='poppins-light text-sm'>
              Welcome : {authUser?.fullName.split(' ')[0]}!
            </h1>
          </div>
        )}
        <ModeToggle />
        {authUser && (
          <Button
            onClick={logout}
            className='flex items-center gap-1 '
            variant={'destructive'}
          >
            Logout <LogOut />
          </Button>
        )}
      </div>
    </div>
  )
}

export default Navbar
