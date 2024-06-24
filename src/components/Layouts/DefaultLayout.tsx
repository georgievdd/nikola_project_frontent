'use client'

import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { Mode, useThemeMode } from "@/theme/useMode";

export default function DefaultLayout({
  children,
  noContainer,
}: {
  children: React.ReactNode
  noContainer?: boolean
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const theme = useThemeMode()

  useEffect(() => {
    const favicon: HTMLLinkElement = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = theme === Mode.LIGHT ? '/favicon-dark.ico' : '/favicon-light.ico';
    document.head.appendChild(favicon);
  }, [theme]);

  return (
    <>
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
