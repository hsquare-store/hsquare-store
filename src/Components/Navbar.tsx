
"use client"

import React, { useEffect, useState } from 'react'
import Logo from '../../public/icon.png'
import Image from 'next/image'
import Link from 'next/link'


export default function Navbar() {

  const [name, setName] = useState("User")
  const [email, setEmail] = useState("Email")
  useEffect(() => {
    setEmail(localStorage.getItem('email') || '');
    setName(localStorage.getItem('name') || '');
  }, [])


  return (


    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/web/home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src={Logo} width={32} height={32} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-xl text-black font-semibold whitespace-nowrap dark:text-black">Hsquare</span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" className="flex text-sm bg-red-700 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <span className="sr-only">Open user menu</span>
            <div className="w-8 h-8 text-white font-bold flex justify-center items-center bg-green-500 rounded-full">{name[0].toUpperCase()}</div>
          </button>
          <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">{name}</span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{email}</span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link href="/web/home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Home</Link>
              </li>
              <li>
                <Link href="/auth/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </nav>

  )
}
