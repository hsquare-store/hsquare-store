
import { useEffect, useState } from "react";
import Image from 'next/image'
import Logo from "../../public/icon.png"

export default function NetworkSecure({ element }: { element: React.ReactNode }) {
    const [status, setStatus] = useState(true)

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
        }

        function updateOnlineStatus() {
            if (navigator.onLine) {
                setStatus(true);
            } else {
                setStatus(false);
            }
        }

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        updateOnlineStatus();

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        }
    }, []);
    return (
        <>
            {status ? element : <>
                <section className="h-[100vh] flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <Image className="w-8 h-8 mr-2" src={Logo} alt="logo" />
                            Hsquare
                        </a>
                        <h1 className="leading-tight tracking-tight text-gray-500 md:text-xl dark:text-white">
                            Please connect to internet to continue.
                        </h1>
                    </div>
                </section >
            </>}
        </>
    )
}
