import React, { useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { axiosInstance } from '@/lib/axiosInstance'
import { useToast } from '@/hooks/use-toast'
const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { toast } = useToast()
  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/auth/login-user', {
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
      if (response) {
        toast({
          title: response.data.message,
          variant: 'success'
        })
      }
    } catch (error) {
      console.log(error);
      
      toast({
        title: error.response.data.message || "Login failed",
        variant: 'destructive'
      })
    }
  }
  return (
    <div className='flex justify-center items-center pt-44'>
      <div className='w-96 space-y-4 p-10 border dark:border-zinc-800 border-zinc-200  rounded-md'>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='email'>Email</Label>
          <Input ref={emailRef} type='email' id='email' placeholder='Email' />
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='password'>Password</Label>
          <Input
            ref={passwordRef}
            type='password'
            id='password'
            placeholder='Password'
          />
        </div>
        <Button className='w-full' onClick={handleLogin}>
          Submit
        </Button>
      </div>
    </div>
  )
}

export default Login
