// "use client"
// import { authOptions } from '@/auth'
// import getAllBrand from '@/BrandActions/getallbrands.action'
// import { getServerSession } from 'next-auth'
// import { useSession } from 'next-auth/react'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'next/link';

// export default function Brands() {
//   // in server to use session getserversession
// //   let session=await getServerSession(authOptions)
// // console.log(session);

//   const [brands, setbrands] = useState([])
  
//   async function getUserBrands() {
//     let res = await getAllBrand()
//     console.log(res.data);
//     setbrands(res.data)

    
//   }


//   useEffect(() => {
//     getUserBrands()
//   },[])
  
  
  

//   return <>
//       <div className="container mx-auto px-4 py-8">
//         <h2 className="text-3xl font-bold text-center mb-8">All Brands</h2>
        
//         {brands.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//             {brands.map((brand) => (
//               // The key should be on the outermost element of the map
//               <div key={brand._id}>
//                 <Link to={`/brand/${brand._id}`}>
//                   <div className="group border border-gray-200 rounded-lg p-4 text-center transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-emerald-500/50">
//                     <img
//                       src={brand.image}
//                       alt={`${brand.name} logo`}
//                       className="mx-auto h-24 object-contain" // `object-contain` keeps the logo aspect ratio
//                     />
//                     <h3 className="mt-4 text-lg font-semibold text-gray-800">
//                       {brand.name}
//                     </h3>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No brands found.</p>
//         )}
//       </div>
//     </>


// }

"use client"
import getAllBrand from '@/BrandActions/getallbrands.action'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'; // Corrected the import statement capitalization
import { brandType } from '@/types/Brands.type';
import Image  from 'next/image';

export default function Brands() {
  // 1. Add loading and error states
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function getUserBrands() {
    try {
      let res = await getAllBrand();
      // It's safer to check if the data exists and is an array
     
        setBrands(res.data);
      
    } catch (err) {
      console.error("Failed to fetch brands:", err);
      setError("Could not load brands. Please try again later.");
    } finally {
      // 2. Set loading to false after the API call is complete
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserBrands();
  }, []);

  // 3. Render a loading state
  if (isLoading) {
    return <div className="text-center p-10">Loading brands...</div>;
  }

  // Optional: Render an error state
  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return <>
     <div className="container w-[80%] mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">All Brands</h2>
      
      {brands.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand:brandType) => (
            <div key={brand._id}>
             
              <Link href={`/brands/${brand._id}`}>
                <div className="group border border-gray-200 rounded-lg p-4 text-center transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-emerald-500/50">
                  <Image 
                    src={brand.image} 
                    alt={`${brand.name} logo`} 
                    className="mx-auto h-24 object-contain" width={100} height={100}
                  />
                  <h3 className="mt-4 text-lg font-semibold text-gray-800">
                    {brand.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No brands found.</p>
      )}
    </div>
    </>

}
