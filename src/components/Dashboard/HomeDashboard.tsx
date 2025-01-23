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
import MoneyOutModal from '../Modals/MoneyOutModal'
import MoneyInModal from '../Modals/MoneyInModal'
import WalletTransferModal from '../Modals/WalletTransferModal'
import SelfTransferModal from '../Modals/SelfTransferModal'

const HomeDashboard = () => {
  const {
    fetchAccounts,
    totalBalance,
    moneyIn,
    moneyOut,
    fetchMoneyOut,
    fetchMoneyIn
  } = useAccount()
  const [currentCard, setCurrentCard] = useState(-1)
  const [showBankTranserModal, setShowBankTranserModal] = useState(false)
  const [showWalletTranserModal, setShowWalletTranserModal] = useState(false)
  const [showSelfTranserModal, setShowSelfTranserModal] = useState(false)
  const [showTransactionsModal, setShowTrans] = useState(false)
  const [showSentMoneyModal, setShowSentMoneyModal] = useState(false)
  const [showRecvMoneyModal, setShowRecvMoneyModal] = useState(false)
  const popoverRef = useRef(null)

  useEffect(() => {
    fetchAccounts()
    fetchMoneyOut()
    fetchMoneyIn()
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
        <h1 className='border-b dark:border-b-zinc-800'>Balances</h1>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-28'>
          {headerItems?.map((item, index) => {
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
                onClick={() => {
                  index === 0 && setShowTrans(!showTransactionsModal)
                  index === 1 && setShowRecvMoneyModal(!showRecvMoneyModal)
                  index === 2 && setShowSentMoneyModal(!showSentMoneyModal)
                }}
              >
                <TransactionModal
                  isOpen={showTransactionsModal}
                  onClose={setShowTrans}
                />
                <MoneyOutModal
                  isOpen={showSentMoneyModal}
                  onClose={setShowSentMoneyModal}
                />

                <MoneyInModal
                  isOpen={showRecvMoneyModal}
                  onClose={setShowRecvMoneyModal}
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
                <h1 className='border text-white w-8 rounded-full aspect-square p-1 flex justify-center items-center border-zinc-300'>
                  {item.icon}
                </h1>
                <h1 className='text-white'>{item.name}</h1>
                <h1 className='flex items-center text-white'>
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
        <h1 className='border-b dark:border-b-zinc-800'>Money transfer</h1>
        <div className='grid md:grid-cols-6 grid-cols-1 gap-28'>
          <BankTransferModal
            onClose={setShowBankTranserModal}
            show={showBankTranserModal}
          />
          <WalletTransferModal
            onClose={setShowWalletTranserModal}
            show={showWalletTranserModal}
          />

          <div
            onClick={() => setShowBankTranserModal(true)}
            className='border cursor-pointer gap-3 dark:border-teal-900 rounded-md hover:bg-gradient-to-br  hover:bg-teal-50 dark:hover:bg-teal-600  transition-all duration-200 text-sm w-44 flex flex-col justify-center items-center py-3'
          >
            <span className='p-2 bg-teal-600 rounded-full text-white'>
              <Landmark size={18} />
            </span>
            <h1>To Bank A/c</h1>
          </div>
          <div className='grid md:grid-cols-3 grid-cols-1 gap-28 '>
            <div
              onClick={() => setShowWalletTranserModal(true)}
              className='border cursor-pointer gap-3 dark:border-teal-900 rounded-md hover:bg-gradient-to-br  hover:bg-teal-50 dark:hover:bg-teal-600  transition-all duration-200 text-sm w-44 flex flex-col justify-center items-center py-3'
            >
              <span className='p-2 bg-teal-600 rounded-full text-white'>
                <Wallet size={18} />
              </span>
              <h1>To Wallet</h1>
            </div>
          </div>
          <div
            onClick={() => setShowSelfTranserModal(true)}
            className='border cursor-pointer gap-3 dark:border-teal-900 rounded-md hover:bg-gradient-to-br  hover:bg-teal-50 dark:hover:bg-teal-600  transition-all duration-200 text-sm w-44 flex flex-col justify-center items-center py-3'
          >
            <span className='p-2 bg-teal-600 rounded-full text-white'>
              <SwitchCamera size={18} />
            </span>
            <h1>Self Transfer</h1>
          </div>
        </div>
      </div>
      <div className='poppins-regular space-y-3  pb-4 '>
        <h1 className='border-b dark:border-b-zinc-800 '>Loans</h1>
        <div className='grid md:grid-cols-6 grid-cols-1 gap-28'>
          <div className='border cursor-pointer gap-3 dark:border-teal-900 rounded-md hover:bg-gradient-to-br  hover:bg-teal-50 dark:hover:bg-teal-600  transition-all duration-200 text-sm w-44 flex flex-col justify-center items-center py-3'>
            <span className='p-2 bg-teal-600 rounded-full text-white'>
              <Nfc size={18} />
            </span>
            <h1>EMI Repayment</h1>
          </div>
          <div className='grid md:grid-cols-3 grid-cols-1 gap-28 '>
            <div className='border cursor-pointer gap-3 dark:border-teal-900 rounded-md hover:bg-gradient-to-br  hover:bg-teal-50 dark:hover:bg-teal-600  transition-all duration-200 text-sm w-44 flex flex-col justify-center items-center py-3'>
              <span className='p-2 bg-teal-600 rounded-full text-white'>
                <FileUser size={18} />
              </span>
              <h1 className='dark:text-zinc-300'>Apply for loan</h1>
            </div>
          </div>
          <div className='border cursor-pointer gap-3 dark:border-teal-900 rounded-md hover:bg-gradient-to-br  hover:bg-teal-50 dark:hover:bg-teal-600  transition-all duration-200 text-sm w-44 flex flex-col justify-center items-center py-3'>
            <span className='p-2 bg-teal-600 rounded-full text-white'>
              <AppWindowMac size={18} />
            </span>
            <h1>Active loans</h1>
          </div>
          <div className='border cursor-pointer gap-3 dark:border-teal-900 rounded-md hover:bg-gradient-to-br  hover:bg-teal-50 dark:hover:bg-teal-600  transition-all duration-200 text-sm w-44 flex flex-col justify-center items-center py-3'>
            <span className='p-2 bg-teal-600 text-white rounded-full'>
              <History size={18} />
            </span>
            <h1>Repayment history</h1>
          </div>
        </div>
      </div>
      <SelfTransferModal
        onClose={setShowSelfTranserModal}
        show={showSelfTranserModal}
      />
    </div>
  )
}

export default HomeDashboard
