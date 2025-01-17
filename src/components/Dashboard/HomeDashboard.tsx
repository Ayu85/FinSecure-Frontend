import React, { useEffect, useState, useRef } from 'react'
import {
  ArrowDown,
  ArrowUp,
  IndianRupee,
  EllipsisVertical,
  CreditCard,
  HandCoins,
  Send,
  Banknote,
  Landmark,
  Wallet,
  SendHorizonal,
  Nfc,
  FileUser,
  AppWindowMac,
  History,
  SwitchCamera
} from 'lucide-react'
import useAccount from '@/store/useAccount'
import BankTransferModal from '../Modals/BankTransferModal'
import TransactionModal from '../Modals/TransactionsModal'

const HomeDashboard = () => {
  const { fetchAccounts, totalBalance, moneyIn, moneyOut } = useAccount()
  const [currentCard, setCurrentCard] = useState(-1)
  const [showBankTranserModal, setShowBankTranserModal] = useState(false)
  const [showTransactionsModal, setShowTrans] = useState(false)
  const popoverRef = useRef(null)

  useEffect(() => {
    fetchAccounts()
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

  const headerItems = [
    {
      name: 'Current Balance',
      icon: <IndianRupee size={18} />,
      bg: '#006E90',
      gradientTo: '#0093bc',
      popOverData: ['View detailed balances', 'Refresh data']
    },
    {
      name: 'Money In',
      icon: <ArrowDown size={18} />,
      bg: '#330C2F',
      gradientTo: '#4a1244'
    },
    {
      name: 'Money Out',
      icon: <ArrowUp size={18} />,
      bg: '#A14A76',
      gradientTo: '#c25d91'
    }
  ]

  return (
    <div className='dark:bg-zinc-900 p-4 w-full space-y-4'>
      <div className='poppins-regular space-y-3  pb-4 '>
        <h1 className='border-b border-b-zinc-800'>Balances</h1>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-28'>
          {headerItems.map((item, index) => {
            return (
              <div
                key={index}
                className='group p-2 py-8 pl-4 rounded-lg flex relative flex-col cursor-pointer gap-2 transition-all duration-700 ease-in-out bg-gradient-to-br hover:bg-[length:400%_400%] bg-[length:100%_100%] animate-gradient'
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
                onClick={() =>
                  index === 0 && setShowTrans(!showTransactionsModal)
                }
              >
                <TransactionModal
                  isOpen={showTransactionsModal}
                  onClose={setShowTrans}
                />
                <EllipsisVertical
                  onClick={e => {
                    e.stopPropagation()
                    setCurrentCard(index)
                  }}
                  className='absolute  right-1 cursor-pointer top-3 size-5'
                />
                <HandCoins className='absolute -bottom-2 opacity-10 right-2 size-44' />
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
                  {item.icon}
                </h1>
                <h1>{item.name}</h1>
                <h1 className='flex items-center '>
                  {' '}
                  <IndianRupee size={15} />
                  {index == 0 && totalBalance}
                  {index == 1 && moneyIn}
                  {index == 2 && moneyOut}
                </h1>
              </div>
            )
          })}
        </div>
      </div>
      <div className='poppins-regular space-y-3  pb-4 '>
        <h1 className='border-b border-b-zinc-800'>Money transfer</h1>
        <div className='grid md:grid-cols-6 grid-cols-1 gap-28'>
          <BankTransferModal
            onClose={setShowBankTranserModal}
            show={showBankTranserModal}
          />
          <div
            onClick={() => setShowBankTranserModal(true)}
            className='border cursor-pointer gap-3 border-teal-900 rounded-md hover:bg-gradient-to-br hover:from-teal-700 transition-all duration-200 text-sm w-44 flex flex-col justify-center items-center py-3'
          >
            <span className='p-2 bg-teal-600 rounded-full'>
              <Landmark size={18} />
            </span>
            <h1>To Bank A/c</h1>
          </div>
          <div className='grid md:grid-cols-3 grid-cols-1 gap-28 '>
            <div className='border cursor-pointer gap-3 border-teal-900 rounded-md text-sm w-44 flex flex-col justify-center items-center py-3'>
              <span className='p-2 bg-teal-600 rounded-full'>
                <Wallet size={18} />
              </span>
              <h1>To Wallet</h1>
            </div>
          </div>
          <div className='border cursor-pointer gap-3 border-teal-900 rounded-md text-sm w-44 flex flex-col justify-center items-center py-3'>
            <span className='p-2 bg-teal-600 rounded-full'>
              <SwitchCamera size={18} />
            </span>
            <h1>Self Transfer</h1>
          </div>
        </div>
      </div>
      <div className='poppins-regular space-y-3  pb-4 '>
        <h1 className='border-b border-b-zinc-800'>Loans</h1>
        <div className='grid md:grid-cols-6 grid-cols-1 gap-28'>
          <div className='border cursor-pointer gap-3 border-teal-900 rounded-md text-sm w-44 flex flex-col justify-center items-center py-3'>
            <span className='p-2 bg-teal-600 rounded-full'>
              <Nfc size={18} />
            </span>
            <h1>EMI Repayment</h1>
          </div>
          <div className='grid md:grid-cols-3 grid-cols-1 gap-28 '>
            <div className='border cursor-pointer gap-3 border-teal-900 rounded-md text-sm w-44 flex flex-col justify-center items-center py-3'>
              <span className='p-2 bg-teal-600 rounded-full'>
                <FileUser size={18} />
              </span>
              <h1 className='text-zinc-300'>Apply for loan</h1>
            </div>
          </div>
          <div className='border cursor-pointer gap-3 border-teal-900 rounded-md text-sm w-44 flex flex-col justify-center items-center py-3'>
            <span className='p-2 bg-teal-600 rounded-full'>
              <AppWindowMac size={18} />
            </span>
            <h1>Active loans</h1>
          </div>
          <div className='border cursor-pointer gap-3 border-teal-900 rounded-md text-sm w-44 flex flex-col justify-center items-center py-3'>
            <span className='p-2 bg-teal-600 rounded-full'>
              <History size={18} />
            </span>
            <h1>Repayment history</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeDashboard
