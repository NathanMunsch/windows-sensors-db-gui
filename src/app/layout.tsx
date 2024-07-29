import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "WindowsSensorsDbGui",
    description: "Dashboard for the WindowsSensorsDbService project",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <script async src={"https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.js"}></script>
        {children}
        </body>
        </html>
    );
}
