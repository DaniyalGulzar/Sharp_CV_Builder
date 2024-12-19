"use client"
import Setting from '@/screens/settings'
import React from 'react'
import withAuth from '@/app/auth/auth/authHOC'

function Settings() {
  return (
    <div className="flex w-full">
      <Setting />
    </div>
  )
}

export default withAuth(Settings);
