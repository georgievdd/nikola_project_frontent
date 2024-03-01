import DefaultLayout from "@/components/Layouts/DefaultLayout";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Nikola | About",
  description: "nikola about",
  keywords: "nikola, about"
}

export default function About() {
  return (
    <DefaultLayout>
      <h1>About</h1>
    </DefaultLayout>
  );
}
