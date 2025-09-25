"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Autoplay } from 'swiper/modules'
import Image from 'next/image';
import { CategoryType } from '@/types/Category.type';

export default function Categoryswipper({ data }:{data:CategoryType[]}) {
    console.log(data);//array of object come from categoryslider
    
    return <>
        <div className='w-[80%] mx-auto '>
        <h1 className='text-slate-500 font-semibold my-2'>Our Categories</h1>
                <Swiper
      spaceBetween={0}
                    slidesPerView={7}
              modules={[Autoplay]}
                    autoplay={{delay:2000}}
    >
        {data.map((catageory:CategoryType)=><SwiperSlide key={catageory._id}>
            <img src={catageory.image} alt='' className='w-full h-[150px] object-cover' />
            <p className='text-center font-bold'>{ catageory.name}</p>
            </SwiperSlide>)}
     
    </Swiper>
    </div>
    </>
}
