import getAllcategories from '@/api/getAllCategories'
import React from 'react'
import Categoryswipper from '../CategorySwipper/Categoryswipper';

export default async function CategorySlider() {
//array of objects
let data=await getAllcategories()
console.log(data);

    return <>
    <Categoryswipper data={data} />
    
    
    </>
}
