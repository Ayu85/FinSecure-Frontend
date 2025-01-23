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

const WalletTransferModal = ({ show, onClose }) => {
  const [walletID, setWalletID] = useState('')
  const [recipientName, setRecipientName] = useState(null)
  const [selectedAccount, setSelectedAccount] = useState('')
  const [amount, setAmount] = useState(0)
  const { userAccounts } = useAccount()
  const { toast } = useToast()
  const verifyWallet = async () => {
    try {
      const res = await axiosInstance.post('/wallet/get-wallet-owner', {
        walletID
      })
      console.log(res)
      setRecipientName(res.data.owner.fullName)
      toast({
        title: "Wallet verified!!",
        variant: 'success'
      })
    } catch (error) {
      console.log(error)
      setRecipientName(null)

      toast({
        title: error.response.data.message || 'Wallet verification failed',
        variant: 'destructive'
      })
    }
  }
  // console.log('ownername', recipientName)

  const handleSend = async e => {
    // e.prevenDefault()
    // Logic to handle the transfer
    try {
      const transaction = await axiosInstance.post(
        '/transaction/initiate-transaction',
        {
          amount,
          fromAccountNo: selectedAccount.accountNumber,
          toAccountNo: accountNumber,
          toIFSC: ifscCode,
          toAccountName: recipientName
        }
      )
      if (transaction) {
        toast({
          title: transaction.data.message,
          variant: 'success'
        })
        onClose()
      }
    } catch (error) {
      console.log(error)

      toast({
        title: error.response.data.message || 'Login failed',
        variant: 'destructive'
      })
    }
  }

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Wallet Transfer</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          {/* Sender's Account Dropdown */}
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder="Select Sender's Account" />
            </SelectTrigger>
            <SelectContent>
              {userAccounts.map((account, index) => (
                <SelectItem key={index} value={account}>
                  {account.accountNumber}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Account Number Input */}
          <div className='relative'>
            <Input
              value={walletID}
              onChange={e => setWalletID(e.target.value)}
              placeholder='Enter Wallet ID'
              className='w-full'
            />
            <button onClick={verifyWallet} 
            className='absolute text-sm right-1 top-1'>
              Verify
            </button>
          </div>

          {/* Recipient Name Input */}
          <Input
            value={recipientName}
            // onChange={e => setRecipientName(e.target.value)}
            placeholder='Recipient Name'
            className='w-full'
          />
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
              disabled={recipientName === null ? true : false}
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

export default WalletTransferModal
