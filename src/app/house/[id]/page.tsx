import DefaultLayout from "@/components/Layouts/DefaultLayout";

interface Props {
    params: {
        id: string
    }
}

export default function HouseId({params}: Props) {
  return (
    <DefaultLayout>
      <h1>House {params.id}</h1>
    </DefaultLayout>
  );
}
