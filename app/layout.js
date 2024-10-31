import 'bootstrap/dist/css/bootstrap.min.css';
import {Inter} from "next/font/google";
import "./globals.css";
import MainHeader from '@/Components/header/main-header';
import MainFooter from '@/Components/footer/main-footer';
import BackToTop from "@/Components/backtotop/backtotop";
import Loading from "@/app/loading";
import {Suspense} from "react";


const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Mies",
    description: "Mies",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <MainHeader/>
        <BackToTop/>
        <Suspense fallback={<Loading/>}>
            {children}
        </Suspense>
        <MainFooter/>
        </body>
        </html>
    );
}
