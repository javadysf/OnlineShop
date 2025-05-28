import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar/Navbar";
import MainSideBar from "@/components/common/SideBars/MainSidebar/MainSideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Online Shop",
  description: "Online Selling",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`antialiased`}
      >
        <div className="flex font-nazanin flex-col">
        <Navbar/>
        <span className="flex h-screen p-1 gap-2">
        {/* <MainSideBar/> */}
        <span className="bg-sky-100 w-full p-2 rounded-lg h-fit">

        {children}
        </span>
        </span>
        </div>
      </body>
    </html>
  );
}
