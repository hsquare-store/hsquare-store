
import { useEffect, useState } from "react";

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
                <div className="fixed top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
                    <h1 className="text-2xl text-red-600">You are offline</h1>
                </div>
            </>}
        </>
    )
}
