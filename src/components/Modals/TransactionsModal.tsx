import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { axiosInstance } from '@/lib/axiosInstance'

const TransactionModal = ({ isOpen, onClose }) => {
  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    fetchTransactions()
  }, [])
  const fetchTransactions = async () => {
    const res = await axiosInstance.get('/transaction/fetch-total')
    setTransactions(res.data.transactions)
    // console.log(res)
  }
  // const transactions = [
  //   {
  //     id: '435ny86f',
  //     amount: 500,
  //     fromAccountNo: '557780482745',
  //     toAccountNo: '509978891984',
  //     time: '2025-01-14T10:54:14.782Z'
  //   },
  //   {
  //     id: '5g1qi51v',
  //     amount: 500,
  //     fromAccountNo: '557780482745',
  //     toAccountNo: '509978891984',
  //     time: '2025-01-14T10:54:33.768Z'
  //   },
  //   {
  //     id: 'v5e6jly6',
  //     amount: 500,
  //     fromAccountNo: '557780482745',
  //     toAccountNo: '509978891984',
  //     time: '2025-01-14T10:58:42.175Z'
  //   },
  //   {
  //     id: 'd558gh86',
  //     amount: 500,
  //     fromAccountNo: '557780482745',
  //     toAccountNo: '509978891984',
  //     time: '2025-01-16T13:13:32.833Z'
  //   },
  //   {
  //     id: 'g58g55nl',
  //     amount: 500,
  //     fromAccountNo: '557780482745',
  //     toAccountNo: '509978891984',
  //     time: '2025-01-16T14:00:59.807Z'
  //   },
  //   {
  //     id: '3hgfud6g',
  //     amount: 500,
  //     fromAccountNo: '557780482745',
  //     toAccountNo: '509978891984',
  //     time: '2025-01-16T14:03:09.023Z'
  //   },
  //   {
  //     id: '78e3e667',
  //     amount: 50,
  //     fromAccountNo: '557780482745',
  //     toAccountNo: '509978891984',
  //     time: '2025-01-16T14:07:52.641Z'
  //   },
  //   {
  //     id: 'ony5vd3z',
  //     amount: 50,
  //     fromAccountNo: '509978891984',
  //     toAccountNo: '557780482745',
  //     time: '2025-01-17T10:39:12.841Z'
  //   }
  // ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Transaction History</DialogTitle>
        </DialogHeader>
        <ScrollArea className='h-[500px] w-full rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>From Account</TableHead>
                <TableHead>To Account</TableHead>
                <TableHead className='w-[180px]'>Date & Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell className='font-mono'>{transaction.id}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell className='font-mono'>
                    {transaction.fromAccountNo}
                  </TableCell>
                  <TableCell className='font-mono'>
                    {transaction.toAccountNo}
                  </TableCell>
                  <TableCell>
                    {format(new Date(transaction.time), 'MMM d, yyyy HH:mm:ss')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default TransactionModal
