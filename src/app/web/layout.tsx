
"use client"

import Navbar from '@/Components/Navbar';
import NetworkSecure from '@/Components/NetworkSecure';
import { initFlowbite } from 'flowbite';
import React, { useEffect, useState } from 'react';


export default function RootLayout({ children }: { children: React.ReactNode }) {
    // Initialize Flowbite when the component mounts
    useEffect(() => {
        initFlowbite()
    }, []);

    return (<>
        <NetworkSecure element={<>
            <Navbar/>
            {children}
        </>} />
    </>
    );
}