
"use client"

import Navbar from '@/Components/Navbar';
import NetworkSecure from '@/Components/NetworkSecure';
import { initFlowbite } from 'flowbite';
import React, { useEffect, useState } from 'react';


export default function RootLayout({ children }: { children: React.ReactNode }) {
    // Initialize Flowbite when the component mounts
    const [username, setUsername] = useState('');
    const [useremail, setUserEmail] = useState('');
    useEffect(() => {
        initFlowbite()
        setUsername(localStorage.getItem('name') || '');
        setUserEmail(localStorage.getItem('email') || '');
    }, []);

    return (<>
        <NetworkSecure element={<>
            <Navbar username={username} email={useremail} />
            {children}
        </>} />
    </>
    );
}