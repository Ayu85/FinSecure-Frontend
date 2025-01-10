import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-md '>
      <Loader2 className='animate-spin text-teal-400 h-screen' size={40} />
    </div>
  )
}

export default Loader
