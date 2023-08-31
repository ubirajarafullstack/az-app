/* eslint-disable @next/next/no-img-element */
'use client';

import { useProductsShoes } from '@/app/data/useProductsShoes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { useState } from 'react';

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
    spaceBetween: 10,
    slidesPerView: 3,
    pagination: false,
    mousewheel: false,
    keyboard: false,
    freeMode: true,
    watchSlidesProgress: true,
  }

  const otherOptions: SwiperOptions = {
    ...commonOptions,
    mousewheel: false,
    navigation: true,
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



            <SwiperSlide key={i} data-hash={e.slug}>


              {e.id}
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
                  <span key={i} className='h-4 w-4'
                    style={{ background: e.hex }}></span>
                )
              })}

              {e.productType.shoeCategory}
              {e.productType.gender}


              {e.name}

              {e.rating}
              {e.name}
              {e.price}
              <div dangerouslySetInnerHTML={{ __html: e.description.html }} />
              {e.buttonType}
              {e.buttonLabel}
              {e.buttonLink}
              <div dangerouslySetInnerHTML={{ __html: e.highlights.html }} />


              <Swiper {...galleryOptions} className="gallery">

                {e.images.map((e, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <img src={e.url} alt="" />
                    </SwiperSlide>
                  )
                })}


              </Swiper>


              <Swiper {...thumbsOptions} className="thumbs" onSwiper={setThumbsContainer}>

                {e.images.map((e, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <img src={e.url} alt="" />
                    </SwiperSlide>
                  )
                })}


              </Swiper>



            </SwiperSlide>




























          )
        })}
      </Swiper>
    </div>
  )
}
