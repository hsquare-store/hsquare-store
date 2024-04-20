
"use client"

import Image from 'next/image'
import Logo from "../../../../../../public/icon.png"
import React, { useEffect, useState } from 'react'
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Page = ({ params }: { params: { subject: string, unit: string } }) => {


    const [url, setURL] = useState("")
    const [subject, setSubject] = useState("")
    const [unit, setUnit] = useState("")
    const [available, setAvailable] = useState("")

    useEffect(() => {
        fetch(`/api/payments/${params.subject}`, {
            method: 'GET',
            headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string }
        })
            .then(async (res) => {
                const val = await res.json()
                if (val.data.paid) {
                    setSubject(params.subject)
                    setUnit(params.unit)
                } else {
                    window.location.href = '/web/buy/' + params.subject
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }, [params])

    useEffect(() => {
        fetch(`/api/files/${subject}/${unit}`, {
            method: 'GET',
            headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string }
        })
            .then(async (res) => {
                const val = await res.json()
                setAvailable(val.available)
                setURL(val.data)
            })
            .catch((err) => {
                console.error(err);
            })
    }, [subject, unit])

    return (
        available ? (
            <div className="h-screen w-screen">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer
                        fileUrl={url}
                    />
                </Worker>
            </div>
        ): (<>
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
            </section >
        </>)
    )
}

export default Page