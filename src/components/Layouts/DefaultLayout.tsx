'use client'

import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";
import Footer from "../Footer/Footer";
import { Mode, useThemeMode } from "@/theme/useMode";
import Head from "next/head";
import styles from './DefaultLayout.module.scss'

export default function DefaultLayout({
  children,
  noContainer,
}: {
  children: React.ReactNode
  noContainer?: boolean
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const theme = useThemeMode()

  return (
    <>
      <Head>
        {theme === Mode.LIGHT ? 
        <link rel="stylesheet" href="/favicon-dark.ico"/> : 
        <link rel="stylesheet" href="/favicon-light.ico"/>}
      </Head>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <div>
        <main style={noContainer ? {
            margin: 0,
            padding: 0,
            maxWidth: '100%',
        } : {}}>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
