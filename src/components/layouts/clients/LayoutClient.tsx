import React from 'react'
import HeaderClient from '../../views/clients/HeaderClient'
import FooterClient from '../../views/clients/FooterClient'
import { Outlet } from 'react-router-dom'

type Props = {}

const LayoutClient = (props: Props) => {
  return (
    <div>
      <HeaderClient />
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <Outlet/>
      </div>
      <FooterClient />
    </div>
  )
}

export default LayoutClient
