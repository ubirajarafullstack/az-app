/* eslint-disable @next/next/no-img-element */
'use client';

import Loading from '@/app/components/Loading';
import ProductsShoes from '@/app/components/ProductsShoes';
import { useShoe } from '@/app/data/useShoe';
import { useShoes } from '@/app/data/useShoes';
import { useShoesInfinite } from '@/app/data/useShoesInfinite';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs, Controller } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import './locals.css';
import { useShoesInfiniteWithInitialData } from '@/app/data/useShoesInfiniteWithInitialData';
import { useProducts } from '@/app/data/useProducts';
import { InfiniteData } from '@tanstack/react-query';

export default function Products() {

  const [hash, setHash] = useState('null');
  const [mainContainer, setMainContainer] = useState<any>([]);
  const [galleryContainer, setGalleryContainer] = useState<any>([]);
  const [thumbsContainer, setThumbsContainer] = useState<any>([]);

  const getGallerySwiper = useCallback(
    (i: number) => {
      return galleryContainer[i];
    },
    [galleryContainer]
  );

  const getThumbsSwiper = useCallback(
    (i: number) => {
      return thumbsContainer[i];
    },
    [thumbsContainer]
  );

  const commonOptions: SwiperOptions = {
    modules: [Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs, Controller],
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

  const galleryOptions: (i: number) => SwiperOptions = (i: number) => ({
    ...commonOptions,
    pagination: false,
    watchSlidesProgress: true,
    nested: true,
    thumbs: {
      swiper: getThumbsSwiper(i)
    }
  });

  const thumbsOptions: (i: number) => SwiperOptions = (i: number) => ({
    ...commonOptions,
    direction: 'vertical',
    spaceBetween: 10,
    slidesPerView: 3,
    pagination: false,
    mousewheel: false,
    keyboard: false,
    freeMode: true,
    watchSlidesProgress: true,
  });

  const mOnSwiper = (swiper: any) => {
    setMainContainer((main: any) => [...main, swiper]);
  };

  const gOnSwiper = (swiper: any) => {
    setGalleryContainer((gallery: any) => [...gallery, swiper]);
    //swiper.disable();
  };

  const tOnSwiper = (swiper: any) => {
    setThumbsContainer((thumbs: any) => [...thumbs, swiper]);
    //swiper.disable();
  };

  const onSlideChange = (swiper: any) => {
    if (galleryContainer[swiper.activeIndex]) {
      const gallerySwiper = galleryContainer[swiper.activeIndex];
      gallerySwiper.slideNext();
    }
  };

  const gOnSlideChange = (swiper: any) => {
  };

  const tOnSlideChange = (swiper: any) => {
  };

  let {
    data,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage
  } = useProducts(4);

  if (isLoading || isFetchingNextPage) return <Loading />;

  console.log('data from tsx', hasNextPage);

  return (
    <div className="h-screen flex justify-center items-center">
      <Swiper {...mainOptions} className="main" onSlideChange={onSlideChange} onSwiper={mOnSwiper}>

        {data && (
          <>
            {
              data?.pages.map((page, index) => (

                <div key={index}>

                  {page.map((edge, index) => {

                    return (
                      <SwiperSlide className="flex flex-col justify-center items-center" key={index} data-hash={edge.node.slug}>
                        <div className="w-11/12 flex flex-col lg:flex-row-reverse">
                          <div className="w-full h-96 gap-4 flex lg:w-7/12">
                            <div className="relative w-10/12">
                              <div className="w-full h-full">
                                <Swiper className={`gallery gallery-${index} bg-white rounded-md`} {...galleryOptions(index)} onSlideChange={gOnSlideChange} onSwiper={gOnSwiper}>
                                  {edge.node.images.map((e: any, i: any) => {
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
                              <Swiper className={`thumbs thumbs-${index}`} {...thumbsOptions(index)} onSlideChange={tOnSlideChange} onSwiper={tOnSwiper}>
                                {edge.node.images.map((e: any, i: any) => {
                                  return (
                                    <SwiperSlide className="bg-white rounded-md opacity-50 flex flex-col justify-center items-center" key={i}>
                                      <img className="w-full h-full block object-contain" src={e.url} alt="" />
                                    </SwiperSlide>
                                  )
                                })}
                              </Swiper>
                            </div>
                          </div>

                          <div className="info w-10/12 lg:w-5/12">
                            <h1 className="m-4 md:text-2xl lg:text-2xl">{edge.node.name}</h1>
                            <h2 className="m-4 md:text-2xl lg:text-2xl">{edge.node.price}</h2>

                            <Link href="#" className="more-button m-4 inline-block rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus:bg-indigo-600">Veja Mais</Link>
                          </div>

                        </div>
                      </SwiperSlide>
                    )

                  })}

                </div>


              ))
            }
          </>
        )}

      </Swiper>
    </div>
  )

}





/* 
    return (
      <div className="pt-36">
        {data?.pages.map((page, i) => (
          <ul key={i}>
            {/* @ts-expect-error }
            {page.map((edge) => (
              <li key={edge.node.id}>{edge.node.name}</li>
            ))}
          </ul>
        ))}
        <button onClick={() => {
          fetchNextPage();
        }} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage
            ? 'loading more...'
            : (data?.pages.length ?? 0) < 4
            ? 'load more'
            : 'nothing more to load'}
        </button>
      </div>
    )
  
   */