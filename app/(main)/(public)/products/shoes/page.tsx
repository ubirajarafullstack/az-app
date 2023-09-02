/* eslint-disable @next/next/no-img-element */
'use client';

import { useProductsShoes } from '@/app/data/useProductsShoes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { useState } from 'react';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import './locals.css';

export default function Shoes() {

  const [thumbsContainer, setThumbsContainer] = useState<any>(null);

  const commonOptions: SwiperOptions = {
    modules: [Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs],
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: false,
    pagination: { clickable: true },
    mousewheel: true,
    keyboard: { enabled: true },
    freeMode: false,
    loop: true,
    hashNavigation: false,
    watchSlidesProgress: false,
    nested: false,
    thumbs: undefined,
  }

  const mainOptions: SwiperOptions = {
    ...commonOptions,
    direction: 'vertical',
    hashNavigation: { watchState: true },
    watchSlidesProgress: true,
  }

  const galleryOptions: SwiperOptions = {
    ...commonOptions,
    pagination: false,
    watchSlidesProgress: true,
    nested: true,
    thumbs: { swiper: thumbsContainer },
  }

  const thumbsOptions: SwiperOptions = {
    ...commonOptions,
    direction: 'vertical',
    spaceBetween: 10,
    slidesPerView: 3,
    pagination: false,
    mousewheel: false,
    keyboard: false,
    freeMode: true,
    watchSlidesProgress: true,
  }

  const onSlideChangeMain = () => console.log('on slide change main');
  const onSwiperMain = (swiper: any) => console.log("on swiper main object");

  const { data, isLoading, error } = useProductsShoes(1);

  if (isLoading) return <div>Loading...</div>
  if (error) console.log(error);

  return (
    <div className="flex justify-center h-screen items-center">
      <Swiper {...mainOptions} className="main" onSlideChange={onSlideChangeMain} onSwiper={onSwiperMain}>
        {data?.map((e, i) => {
          return (
            <SwiperSlide className="flex flex-col justify-center items-center" key={i} data-hash={e.slug}>

              {/* {e.id}
              {e.department}
              {e.spirit}
              {e.productCategory}

              {e.productType.id}
              {e.productType.brand}
              {e.productType.sizes.map((e, i) => {
                return (
                  <span key={i}>{e}</span>
                )
              })}

              {e.productType.colors.map((e, i) => {
                return (
                  <span key={i} className="h-4 w-4"
                    style={{ background: e.hex }}></span>
                )
              })}

              {e.productType.shoeCategory}
              {e.productType.gender}

              {e.name}
              {e.rating}
              {e.price}
              <div dangerouslySetInnerHTML={{ __html: e.description.html }} />
              {e.buttonType}
              {e.buttonLabel}
              {e.buttonLink}

              <div dangerouslySetInnerHTML={{ __html: e.highlights.html }} /> */}

              <div className="w-11/12 flex flex-col lg:flex-row-reverse">

                <div className="w-full gap-4 flex lg:w-7/12">
                  <div className="relative w-10/12">
                    <div className="w-full h-full">
                      <Swiper className="gallery bg-white rounded-md" {...galleryOptions}>

                        {e.images.map((e, i) => {
                          return (
                            <SwiperSlide className="bg-white p-6 rounded-md flex flex-row justify-center items-center" key={i}>
                              <img className="block object-contain" src={e.url} alt="" />
                            </SwiperSlide>
                          )
                        })}

                      </Swiper>
                    </div>
                    
                    <Link href="#" className="more-button absolute z-10 -bottom-12 -right-12 m-4 inline-block rounded-md bg-slate-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus:bg-indigo-600">Ver</Link>
                  </div>
                  <div className="w-2/12 h-3/6">
                    <Swiper className="thumbs" {...thumbsOptions} onSwiper={setThumbsContainer}>

                      {e.images.map((e, i) => {
                        return (
                          <SwiperSlide className="bg-white rounded-md opacity-50 flex flex-col justify-center items-center" key={i}>
                            <img className="w-full h-full block object-contain" src={e.url} alt="" />
                          </SwiperSlide>
                        )
                      })}

                    </Swiper>
                  </div>
                </div>

                <div className="info w-11/12 lg:w-5/12">

                  <h1 className="m-4 md:text-2xl lg:text-2xl">{e.name}</h1>

                  <h2 className="m-4 md:text-2xl lg:text-2xl">{e.price}</h2>

                  <Link href="#" className="m-4 inline-block rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus:bg-indigo-600">Veja Mais</Link>

                </div>

              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}