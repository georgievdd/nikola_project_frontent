import DefaultLayout from "@/components/Layouts/DefaultLayout";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Nikola | Services",
  description: "nikola services",
  keywords: "nikola, services",
}

export default function Service() {
  return (
    <DefaultLayout>
      <h1>Service</h1>
    </DefaultLayout>
  );
}
