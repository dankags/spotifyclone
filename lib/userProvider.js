"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

function UserProvider() {
  const {data,status}=useSession();
  return {data,status}
}

export default UserProvider