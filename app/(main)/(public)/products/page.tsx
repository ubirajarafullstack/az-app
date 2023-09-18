/* eslint-disable @next/next/no-img-element */
'use client';

import Loading from '@/app/components/Loading';
import SpinnerSmall from '@/app/components/SpinnerSmall';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs, Controller, Virtual } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { useCallback, useEffect, useState } from 'react';
import { useProducts } from '@/app/data/useProducts';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import './swiper.css';

export default function Products() {

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
    modules: [Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs, Controller, Virtual],
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
    //hashNavigation: { watchState: false },
    //watchSlidesProgress: false,
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

  const mainOnSwiper = (swiper: any) => {
    setMainContainer((main: any) => [...main, swiper]);
  };

  const galleryOnSwiper = (swiper: any) => {
    setGalleryContainer((gallery: any) => [...gallery, swiper]);
    //swiper.disable();
  };

  const thumbsOnSwiper = (swiper: any) => {
    setThumbsContainer((thumbs: any) => [...thumbs, swiper]);
    //swiper.disable();
  };

  const mainOnSlideChange = (swiper: any) => {
    if (galleryContainer[swiper.activeIndex]) {
      const gallerySwiper = galleryContainer[swiper.activeIndex];
      gallerySwiper.slideNext();
    }
  };

  const galleryOnSlideChange = (swiper: any) => {
  };

  const thumbsOnSlideChange = (swiper: any) => {
  };

  let {
    data,
    totalProducts,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage
  } = useProducts(99);

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

    if (mainContainer[0]) {
      const mainSwiper = mainContainer[0];
      mainSwiper.slideTo(data?.pageParams.length ? data.pageParams.length : 0);
    }

  }, [thumbsContainer, galleryContainer, mainContainer, data]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="relative h-screen flex justify-center items-center">
        {data && (
          <Swiper {...mainOptions} className="main" onSlideChange={mainOnSlideChange} onSwiper={mainOnSwiper}>
            <>
              {
                data?.pages.map((page, index) => (
                  <>
                    <div key={index}>
                      {page.map((edge, index) => {

                        return (
                          <SwiperSlide className="flex flex-col justify-center items-center" key={index}>

                            <div className="w-11/12 p-4 text-xs">{edge.node.department} / {edge.node.spirit} / {edge.node.productCategory}</div>
                            <div className="w-11/12 flex flex-col lg:flex-row-reverse">

                              <div className="w-full h-96 sm:h-[484px] gap-4 flex lg:w-7/12">

                                <div className="relative w-10/12">


                                  <div className="w-full h-full">
                                    <Swiper className={`gallery gallery-${index} bg-white rounded-md`} {...galleryOptions(index)} onSlideChange={galleryOnSlideChange} onSwiper={galleryOnSwiper}>
                                      {edge.node.images.map((e, i) => {
                                        return (
                                          <SwiperSlide className="bg-white p-6 rounded-md flex flex-row justify-center items-center" key={i}>
                                            <img className="block object-contain max-h-full" src={e.url} alt="" />
                                          </SwiperSlide>
                                        )
                                      })}
                                    </Swiper>
                                  </div>

                                  <Link href={`/products/detail/${edge.node.slug}`} className="absolute z-10 -bottom-12 -right-12 more-button m-4 inline-block px-3 py-2 rounded-md bg-slate-400 hover:bg-indigo-600 font-semibold text-sm text-white shadow-sm">
                                    Go
                                  </Link>
                                </div>

                                <div className="w-2/12 h-3/6">
                                  <Swiper className={`thumbs thumbs-${index}`} {...thumbsOptions(index)} onSlideChange={thumbsOnSlideChange} onSwiper={thumbsOnSwiper}>
                                    {edge.node.images.map((e, i) => {
                                      return (
                                        <SwiperSlide className="bg-white rounded-sm opacity-50 flex flex-col justify-center items-center" key={i}>
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

                                <Link href={`/products/detail/${edge.node.slug}`} className="more-button m-4 inline-block px-3 py-2 rounded-md bg-slate-400 hover:bg-indigo-600 font-semibold text-sm text-white shadow-sm">
                                  Go
                                </Link>
                              </div>

                            </div>
                          </SwiperSlide>
                        )

                      })}

                    </div>
                  </>
                ))
              }
            </>
          </Swiper>
        )}

        <div className="absolute z-20 bottom-0 left-0 w-full p-6 flex flex-col">
          <button
            className="
              loading-more-button 
              self-end flex 
              items-center 
              justify-center 
              px-3 py-2 
              rounded-md 
              bg-indigo-600
              hover:bg-white 
              focus:bg-white 
              disabled:bg-white 
              font-semibold 
              text-white 
              hover:text-black 
              focus:text-black 
              disabled:text-black 
              text-sm 
              shadow-sm
              "
            onClick={() => {
              fetchNextPage();
              //setMainContainer([])
              setGalleryContainer([])
              setThumbsContainer([])
            }}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? (
                <>
                  <SpinnerSmall />
                  <span className="inline-block ml-2">Mais</span>
                </>
              )
              : (data?.pages.length ?? 0) < totalProducts
                ? 'Mais'
                : 'Rolagem'}
          </button>
        </div>
      </div>

    </>
  )

}
