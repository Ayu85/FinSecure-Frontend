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

const BankTransferModal = ({ show, onClose }) => {
  const [accountNumber, setAccountNumber] = useState('')
  const [ifscCode, setIfscCode] = useState('')
  const [recipientName, setRecipientName] = useState(null)
  const [selectedAccount, setSelectedAccount] = useState('')
  const [amount, setAmount] = useState(0)
  const { userAccounts } = useAccount()
  const { toast } = useToast()
  const verifyAccount = async () => {
    try {
      const res = await axiosInstance.post('/account/get-owner', {
        accountNo: accountNumber,
        ifsc: ifscCode
      })
      console.log(res)
      setRecipientName(res.data.ownerName.owner.fullName)
      toast({
        title: res.data.message,
        variant: 'success'
      })
    } catch (error) {
      console.log(error)
      setRecipientName(null)

      toast({
        title: error.response.data.message || 'Account verification failed',
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
          <DialogTitle>Bank Transfer</DialogTitle>
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
          <Input
            value={accountNumber}
            onChange={e => setAccountNumber(e.target.value)}
            placeholder='Enter Account Number'
            className='w-full'
          />

          {/* IFSC Code Input */}
          <div className='relative'>
            <Input
              value={ifscCode}
              onChange={e => setIfscCode(e.target.value)}
              placeholder='Enter IFSC Code'
              className='w-full'
            />

            <button
              onClick={verifyAccount}
              className='text-sm absolute right-0 top-1 cursor-pointer hover:text-green-400  px-3 float- py-1 rounded-md'
            >
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

export default BankTransferModal
