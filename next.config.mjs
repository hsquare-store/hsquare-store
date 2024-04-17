/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {
    ...withPWA({
        dest: "public",
        register: true,
        skipWating: true,
    }),
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lcijfvbkpbywioawgsyj.supabase.co',
                pathname: "/storage/v1/object/public/files/**"
            },
        ],
    },
};

export default nextConfig;