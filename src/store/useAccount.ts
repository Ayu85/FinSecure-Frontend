import { axiosInstance } from '@/lib/axiosInstance'
import { create } from 'zustand'
interface account {
  userAccounts: any
  totalBalance: number
  moneyIn: number
  moneyOut: number
  fetchAccounts: () => Promise<void>
  fetchTransactions: () => void
}
const useAccount = create<account>((set, get) => ({
  userAccounts: [],
  totalBalance: 0,
  moneyIn: 0,
  moneyOut: 0,
  fetchAccounts: async () => {
    try {
      const accounts = await axiosInstance.get('/account/fetch-accounts')
      console.log(accounts)
      set({ userAccounts: accounts.data.accounts })
      const acc = get().userAccounts
      let bal = 0
      acc.forEach(element => {
        bal += element.balance
      })
      set({ totalBalance: bal })
    } catch (error) {
      console.log(error)
    }
  },
  fetchTransactions: async () => {
    try {
      
    } catch (error) {}
  }
}))

export default useAccount
