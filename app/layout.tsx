import './globals.css'
import "styles/prism.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "@/components/Header";
import React from "react";
import {getMetaData} from "@/app/seo";
import Script from 'next/script'
import siteMetadata from "@/datas/siteMetadata";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = getMetaData({title: '승귤입니다'});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${siteMetadata.analytics.google}`} />
      <Script id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
   
            gtag('config', '${siteMetadata.analytics.google}');
          `}
      </Script>
      <body className={inter.className}>
      <Header />
      {children}
      </body>
    </html>
  )
}
