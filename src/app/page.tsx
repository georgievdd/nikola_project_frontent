import HomePage from "@/components/HomePage/HomePage";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to Nikola Lenivets",
  description: "Welcome to Nikola Lenivets. Book house please!",
  keywords: "nikola, lenivets, house",
}


export default function Home() {
  return (
    <DefaultLayout noContainer>
      <HomePage />
    </DefaultLayout>
  );
}
