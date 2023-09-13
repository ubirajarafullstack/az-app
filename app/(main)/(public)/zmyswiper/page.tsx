/* eslint-disable @next/next/no-img-element */
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { useState } from 'react';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import './locals.css';

export default function Myswiper() {

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

  return (
    <div className="flex justify-center h-screen items-center">
      <Swiper
        {...mainOptions}
        className="main"
        onSlideChange={onSlideChangeMain}
        onSwiper={onSwiperMain}
      >
        <SwiperSlide data-hash="slide1">
          <Swiper
            {...galleryOptions}
            className="gallery"
          >
            <SwiperSlide>
              <Image
                fill
                src="https://swiperjs.com/demos/images/nature-1.jpg"
                alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-4.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-5.jpg" alt="" />
            </SwiperSlide>
          </Swiper>
          <Swiper
            {...thumbsOptions}
            className="thumbs"
            onSwiper={setThumbsContainer}
          >
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-4.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-5.jpg" alt="" />
            </SwiperSlide>
          </Swiper>
        </SwiperSlide>
        <SwiperSlide data-hash="slide2">Slide 2</SwiperSlide>
        <SwiperSlide data-hash="slide3">Slide 3</SwiperSlide>
        <SwiperSlide data-hash="slide4">
          <Swiper
            {...otherOptions}
            className="other"
          >
            <SwiperSlide>Image 4 1</SwiperSlide>
            <SwiperSlide>Image 4 2</SwiperSlide>
            <SwiperSlide>Image 4 3</SwiperSlide>
            <SwiperSlide>Image 4 4</SwiperSlide>
            <SwiperSlide>Image 4 5</SwiperSlide>
          </Swiper>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
