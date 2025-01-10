import React from 'react'
import { ModeToggle } from '../mode-toogle'
import { ShieldEllipsis } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='p-4 flex justify-between dark:shadow-xl  dark:shadow-zinc-800 shadow-zinc-100 shadow-lg' >
      <div className='flex items-center gap-1 text-teal-500'>
        <h1 className='poppins-semibold'>FinSecure</h1>
        <ShieldEllipsis />
      </div>
      <ModeToggle />
    </div>
  )
}

export default Navbar
