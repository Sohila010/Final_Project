import React from 'react'
import { Category } from './../../types/Product.type';
import { CategoryType } from '@/types/Category.type';
import Image from 'next/image';
import Link from 'next/link';

export default async function Categories() {
 
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
  let {data} = await res.json()
  console.log(data);
  


  return (
    <>
      <div className="container mx-auto w-[80%] py-12">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Shop by Category
        </h2>

        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((category: CategoryType) => (
              // 2. Wrap the div with the Link component
              <Link href={`/categories/${category._id}`} key={category._id}>
                <div
                  className="group border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-2"
                >
                  <div className="w-full h-80">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={300} // Increased size for better quality
                      height={300} // Increased size for better quality
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-emerald-600 p-6 text-center bg-white">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No categories found.
          </p>
        )}
      </div>
    </>
  );
}
