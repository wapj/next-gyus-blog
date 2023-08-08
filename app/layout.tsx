import './globals.css'
import "styles/prism.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "@/components/Header";
import React from "react";
import {getMetaData} from "@/app/seo";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = getMetaData({title: '승귤입니다'});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header />
      {children}
      </body>
    </html>
  )
}
