import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import AddMoneyToWallet from '../Modals/AddMoneyToWallet'

const WalletQuickLinks = () => {
  const [showWalletModal, setShowWalletModal] = useState(false)
  return (
    <div className='poppins-regular'>
      <div
        onClick={() => setShowWalletModal(true)}
        className='border group cursor-pointer gap-3 dark:border-teal-900 rounded-md hover:bg-gradient-to-br  hover:bg-teal-50 dark:hover:bg-teal-600  transition-all duration-200 text-sm w-44 flex flex-col justify-center items-center py-3'
      >
        <span className='p-2 bg-teal-600 rounded-full text-white group-hover:bg-white group-hover:text-teal-600'>
          <Plus size={18} />
        </span>
        <h1>Add Money</h1>
      </div>
      <AddMoneyToWallet onClose={setShowWalletModal} show={showWalletModal} />
    </div>
  )
}

export default WalletQuickLinks
