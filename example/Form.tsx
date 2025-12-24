"use client"
import { Visibility, VisibilityOff } from '@xanui/icons'
import React from 'react'
import IconButton from '../src/IconButton'
import Input from '../src/Input'

const SigninForm = () => {
   const [show, setShow] = React.useState(false)
   return (
      <Input
         variant="outline"
         type="password"
         placeholder="Enter your password"
         endIcon={
            <IconButton
               variant="text"
               color="default"
               size="small"
               onClick={() => {
                  setShow(p => !p);
               }}
            >
               {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
         }
      />
   )
}

export default SigninForm
