/* eslint-disable @next/next/no-img-element */
'use client';

import Loading from '@/app/components/Loading';
import ProductsShoes from '@/app/components/ProductsShoes';
import { useShoe } from '@/app/data/useShoe';
import { useShoes } from '@/app/data/useShoes';
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

export default function Shoes() {

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

  useEffect(() => {
    if (location.hash) setHash(location.hash.substring(1));
  }, []);

  useEffect(() => {
    for (const key in galleryContainer) {
      const gallerySwiper = galleryContainer[key];
      const thumbsSwiper = thumbsContainer[key];

      //gallerySwiper.enable();

      //thumbsSwiper.enable();
    }

    if (galleryContainer[0]) {
      const gallerySwiper = galleryContainer[0];
      gallerySwiper.slideNext();
    }

  }, [thumbsContainer, galleryContainer, mainContainer]);

  let { data: product, isLoading: productLoading, error: productError } = useShoe(hash);
  let { data: products, isLoading: productsLoading, error: productsError } = useShoes(2);

  if (productLoading || productsLoading) return <Loading />;
  if (productError || productsError) console.log(productError || productsError);

  let xproducts = [ ...product!, ...products!]
  if (product && products) {
    xproducts = [...product, ...products];
  }

  function sanitize(array: any) {
    
    array = array.filter((e: any) => e !== null);

    function removeDuplicated(arr: any): any {
      const uniqueIds = new Set(arr.map((e: any) => e.id));
      return arr.filter((e: any) => {
        if (uniqueIds.has(e.id)) {
          uniqueIds.delete(e.id);
          return true;
        }
        return false;
      });
    }

    return removeDuplicated(array);
  }

  xproducts = sanitize(xproducts);

  return (
    <div className="h-screen flex justify-center items-center">
      <Swiper {...mainOptions} className="main" onSlideChange={onSlideChange} onSwiper={mOnSwiper}>

        {xproducts && (
          <>
            {
              xproducts?.map((e, i) => {
                return (
                  <SwiperSlide className="flex flex-col justify-center items-center" key={i} data-hash={e?.slug}>
                    <div className="w-11/12 flex flex-col lg:flex-row-reverse">
                      <div className="w-full h-96 gap-4 flex lg:w-7/12">
                        <div className="relative w-10/12">
                          <div className="w-full h-full">
                            <Swiper className={`gallery gallery-${i} bg-white rounded-md`} {...galleryOptions(i)} onSlideChange={gOnSlideChange} onSwiper={gOnSwiper}>
                              {e?.images.map((e: any, i: any) => {
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
                          <Swiper className={`thumbs thumbs-${i}`} {...thumbsOptions(i)} onSlideChange={tOnSlideChange} onSwiper={tOnSwiper}>
                            {e?.images.map((e: any, i: any) => {
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
                        <h1 className="m-4 md:text-2xl lg:text-2xl">{e?.name}</h1>
                        <h2 className="m-4 md:text-2xl lg:text-2xl">{e?.price}</h2>

                        <Link href="#" className="more-button m-4 inline-block rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus:bg-indigo-600">Veja Mais</Link>
                      </div>

                    </div>
                  </SwiperSlide>
                )
              })
            }
          </>
        )}

      </Swiper>
    </div>
  )

}
