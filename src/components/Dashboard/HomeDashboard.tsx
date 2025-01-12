import React, { useEffect, useState } from 'react'
import { ArrowDown, ArrowUp, IndianRupee } from 'lucide-react'


const HomeDashboard = () => {
 
 
  const headerItems = [
    {
      name: 'Current Balance',
      icon: <IndianRupee size={18} />,
      bg: '#624ad9'
    },
    {
      name: 'Money In',
      icon: <ArrowDown size={18} />,
      bg: '#27b393'
    },

    {
      name: 'Money Out',
      icon: <ArrowUp size={18} />,
      bg: '#fc6e6b'
    }
  ]
  return (
    <div className='dark:bg-zinc-900 p-4 w-full'>
      <div className='poppins-regular space-y-3'>
        <h1>Balances</h1>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-28'>
          {headerItems?.map(item => {
            return (
              <div
                style={{ backgroundColor: item.bg }}
                className={`p-2 py-8 rounded-lg flex flex-col cursor-pointer  gap-2`}
              >
                <h1
                  className='border w-8 rounded-full aspect-square p-1
                 flex justify-center items-center border-zinc-300 '
                >
                  {item.icon}
                </h1>
                <h1>{item?.name}</h1>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HomeDashboard
