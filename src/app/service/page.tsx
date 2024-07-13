import { getServices } from "@/api/service";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ServicePage from "@/components/ServicePage/ServicePage";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Nikola | Services",
  description: "nikola services",
  keywords: "nikola, services",
}

export default async function Service() {
  const services = await getServices()
  return (
    <DefaultLayout>
      <ServicePage services={services}/>
    </DefaultLayout>
  );
}
