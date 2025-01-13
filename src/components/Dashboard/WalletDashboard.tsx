import useWallet from '@/store/useWallet'
import { EllipsisVertical, IndianRupee, Wallet } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const WalletDashboard = () => {
  const { userWallets, fetchWallets } = useWallet()
  const [currentCard, setCurrentCard] = useState(-1)
  const popoverRef = useRef(null)

  useEffect(() => {
    fetchWallets()
  }, [])
  useEffect(() => {
    const handleClickOutside = event => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setCurrentCard(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div className='dark:bg-zinc-900 p-4 w-full'>
      <div className='poppins-regular space-y-3 border-b pb-4'>
        <h1 className='border-b border-b-zinc-800'>Wallets</h1>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-28'>
          {userWallets?.map((item, index) => {
            return (
              <div
                key={index}
                className='group from-teal-500 to-teal-800
                  p-2 py-8 text-white pl-4 border border-teal-700 rounded-lg flex relative flex-col
                   cursor-pointer gap-2 transition-all duration-700 ease-in-out bg-gradient-to-br hover:bg-[length:400%_400%] bg-[length:100%_100%] animate-gradient'
                style={{
                  backgroundImage: `linear-gradient(135deg, ${item.bg} 0%, ${item.gradientTo} 50%, ${item.bg} 100%)`,
                  backgroundSize: '200% 200%',
                  backgroundPosition: '0% 0%',
                  transition: 'all 0.5s ease-in-out'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundPosition = '100% 100%'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundPosition = '0% 0%'
                }}
              >
                <EllipsisVertical
                  onClick={e => {
                    e.stopPropagation()
                    setCurrentCard(currentCard === index ? -1 : index)
                  }}
                  className='absolute right-1 cursor-pointer top-3 size-5'
                />
                <Wallet className='absolute -bottom-2 opacity-20 right-2 size-44'/>
                <div
                  ref={popoverRef}
                  className={`absolute right-1 transition-all scale-0 ${
                    currentCard === index && 'scale-100'
                  } top-9 text-xs bg-white text-zinc-400 rounded-md p-2 space-y-1`}
                >
                  {currentCard === index && (
                    <div>
                      <h1 className='hover:text-zinc-800 transition-all'>
                        Show detailed data
                      </h1>
                      <h1 className='hover:text-zinc-800 transition-all'>
                        Refresh
                      </h1>
                    </div>
                  )}
                </div>
                <h1 className='border w-8 rounded-full aspect-square p-1 flex justify-center items-center border-zinc-300'>
                  {item?.walletId}
                </h1>
                <h1>{item?.walletName}</h1>
                <h1 className='flex items-center'>
                  <IndianRupee size={15} /> {item?.balance}
                </h1>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WalletDashboard
