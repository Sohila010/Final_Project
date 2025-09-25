import Image from "next/image";

export default async function CategoryDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log(id);
  
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  const data = await res.json();
  console.log(data);

    return <>
    
    <div className="container w-[70%] mx-auto py-10">
       <h1 className="text-4xl font-bold text-center text-emerald-600 ">{data.data.name}</h1>
      <Image src={data.data.image} alt={data.data.name} className=" w-[80%] text-center mx-auto shadow-2xl shadow-emerald-700 mt-6" width={200} height={200} /> 
    </div>
    
    </>
  
}
