'use client'

import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";
import Footer from "../Footer/Footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <div>
        <main>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
