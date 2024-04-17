
"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import Logo from "../../../../public/icon.png"

export default function Register() {

    useEffect(() => {
        fetch('/api/logout', {
            method: 'GET',
            headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string },
        })
            .then(async (res) => {
                const data = await res.json()
                if (data.error) {
                    console.error(data.error)
                    window.location.href = '/web/home';
                }
                localStorage.removeItem('user');
                localStorage.removeItem('name');
                localStorage.removeItem('email');
                localStorage.removeItem('setup');
                localStorage.
                window.location.href = '/auth/login';
            })
            .catch((err) => {
                console.error(err.message)
                window.location.href = '/web/home';
            })
    }, [])

    return (
        <>
            <section className="h-[100vh] flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <Image className="w-8 h-8 mr-2" src={Logo} alt="logo" />
                        Hsquare
                    </a>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Logging Out...
                    </h1>
                </div>
            </section >
        </>
    )
}