import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import useAccount from '@/store/useAccount'
import { axiosInstance } from '@/lib/axiosInstance'
import { useToast } from '@/hooks/use-toast'
import useWallet from '@/store/useWallet'

const AddMoneyToWallet = ({ show, onClose }: any) => {
  const [selectedWallet, setSelectedWallet] = useState('')
  const [selectedAccount, setSelectedAccount] = useState('')
  const [amount, setAmount] = useState(0)
  const { userAccounts } = useAccount()
  const { userWallets } = useWallet()
  const { toast } = useToast()

  const handleSend = async e => {
    // e.prevenDefault()
    // Logic to handle the transfer
    try {
      const transaction = await axiosInstance.post(
        '/wallet/transfer-self-wallet',
        {
          accountNumber: selectedAccount.accountNumber,
          walletId: selectedWallet.walletId,
          amount
        }
      )
      if (transaction) {
        toast({
          title: transaction.data.message || 'Money added successfully',
          variant: 'success'
        })
        onClose()
        window.location.reload()
      }
    } catch (error) {
      console.log(error)

      toast({
        title: error.response.data.message || 'Add Money Failed',
        variant: 'destructive'
      })
    }
  }

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Add Money To Wallet</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select From Account' />
            </SelectTrigger>
            <SelectContent>
              {userAccounts.map((account, index) => (
                <SelectItem key={index} value={account}>
                  {account.accountNumber}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedWallet} onValueChange={setSelectedWallet}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select Wallet' />
            </SelectTrigger>
            <SelectContent>
              {userWallets?.map((wallet, index) => (
                <SelectItem key={index} value={wallet}>
                  {wallet?.walletId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Amount Input */}
          <Input
            value={amount}
            type='number'
            onChange={e => setAmount(e.target.value)}
            placeholder='Enter amount'
            className='w-full'
          />
          <div className='flex flex-col gap-2 pt-4'>
            <Button
              onClick={handleSend}
              className='w-full disabled:cursor-not-allowed'
            >
              Send
            </Button>
            <DialogClose asChild>
              <Button variant='outline' className='w-full'>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddMoneyToWallet
