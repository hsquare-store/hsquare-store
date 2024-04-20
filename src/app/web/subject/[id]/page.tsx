
"use client"

import Link from 'next/link'
import { SlNotebook } from "react-icons/sl";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '../../../../../public/icon.png'

const Page = ({ params }: { params: { id: string } }) => {


    const [data, setData] = useState<any>([])
    const [id, setId] = useState<any>("")

    useEffect(() => {
        fetch(`/api/payments/${params.id}`, {
            method: 'GET',
            headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string }
        })
            .then(async (res) => {
                const val = await res.json()
                if (val.data.paid) {
                    setId(params.id)
                } else {
                    window.location.href = '/web/buy/' + params.id
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }, [params.id])

    useEffect(() => {

        fetch(`/api/files/${id}`, {
            method: 'GET',
            headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string }
        })
            .then(async (res) => {
                const val = await res.json()
                setData(val.data)
            })
            .catch((err) => {
                console.error(err);
            })
    }, [id])

    useEffect(() => { console.log(data) }, [data])

    return (
        <>{Object.keys(data).length === 0 ? (
            <section className="h-[100vh] flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <Image className="w-8 h-8 mr-2" src={Logo} alt="logo" />
                        Hsquare
                    </a>
                    <h1 className="leading-tight tracking-tight text-gray-500 md:text-xl dark:text-white">
                        Loading course information...
                    </h1>
                </div>
            </section >) : (
                <>
                    <div id="toast-default" className="flex items-center w-[200%] max-w-xs p-4 text-gray-500 bg-white rounded-lg  dark:text-gray-400 dark:bg-gray-800">

                        <div className="ms-3 text-black text-xl font-bold">Units</div>

                    </div>

                    <div className="w-full  max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                        <ul className="my-4 space-y-3">
                            {data.map((unit: { name: string; unit: number; }, index: number) => (
                                <li key={index}>

                                    <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                        <SlNotebook />
                                        <span className="flex-1 ms-3 whitespace-nowrap">Unit-{index + 1}: {unit.name}</span>
                                        <Link href={`/web/view/${params.id}/${index + 1}`} className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Open</Link>
                                    </div>
                                </li>
                            ))}

                        </ul>
                        <div>
                        </div>
                    </div>
                </>
            )}

            
        </>
    )
}

export default Page