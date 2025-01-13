import WalletDashboard from '@/components/Dashboard/WalletDashboard'
import Sidebar from '@/components/Sidebar/Sidebar'
import React from 'react'

const Wallet = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <WalletDashboard/>
    </div>
  )
}

export default Wallet