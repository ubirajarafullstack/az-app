/* eslint-disable @next/next/no-img-element */
'use client';

import Loading from '@/app/components/Loading';
import SpinnerSmall from '@/app/components/SpinnerSmall';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs, Controller, Virtual } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { useCallback, useEffect, useState } from 'react';
import { useProducts } from '@/app/data/useProducts';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import './swiper.css';

export default function Products() {

  const router = useRouter()

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

  let item;

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
                        item = edge.node;
                        return (
                          <SwiperSlide className="flex flex-col justify-center items-center" key={index}>

                            <div className="breadcrumb w-11/12 p-4 text-xs">
                              {item.department}
                              <span className="inline-block px-1">/</span>
                              {item.spirit}
                              <span className="inline-block px-1">/</span>
                              {item.productCategory}
                              <span className="inline-block px-1">/</span>
                              {item.productCategory === 'Books'
                                ?
                                (
                                  <>
                                    {/* @ts-ignore */}
                                    {item.productType.bookCategory}
                                    <span className="inline-block px-1">/</span>
                                    {/* @ts-ignore */}
                                    {item.productType.author}
                                  </>
                                )
                                :
                                (
                                  <>
                                    {/* @ts-ignore */}
                                    {item.productType.shoeCategory}
                                    <span className="inline-block px-1">/</span>
                                    {/* @ts-ignore */}
                                    {item.productType.brand}
                                    <span className="inline-block px-1">/</span>
                                    {/* @ts-ignore */}
                                    {item.productType.gender}
                                  </>
                                )
                              }
                            </div>
                            <div className="w-11/12 flex flex-col lg:flex-row-reverse">

                              <div className="w-full h-96 sm:h-[484px] gap-4 flex lg:w-7/12">

                                <div className="w-10/12">

                                  <div className="w-full h-full">
                                    <Swiper className={`gallery gallery-${index} bg-white rounded-md`} {...galleryOptions(index)} onSwiper={galleryOnSwiper} onSlideChange={galleryOnSlideChange}>
                                      {item.images.map((e, i) => {
                                        return (
                                          <SwiperSlide className="bg-white p-6 rounded-md flex flex-row justify-center items-center" key={i}>
                                            <img className="block object-contain max-h-full" src={e.url} alt="" />
                                          </SwiperSlide>
                                        )
                                      })}
                                    </Swiper>
                                  </div>

                                </div>

                                <div className="w-2/12 h-3/6">
                                  <Swiper className={`thumbs thumbs-${index}`} {...thumbsOptions(index)} onSlideChange={thumbsOnSlideChange} onSwiper={thumbsOnSwiper}>
                                    {item.images.map((e, i) => {
                                      return (
                                        <SwiperSlide className="bg-white rounded-sm opacity-50 flex flex-col justify-center items-center" key={i}>
                                          <img className="w-full h-full block object-contain" src={e.url} alt="" />
                                        </SwiperSlide>
                                      )
                                    })}
                                  </Swiper>
                                </div>

                              </div>



                              <div className="info w-full lg:w-5/12 flex">

                                <div className="w-10/12 flex flex-col">
                                  <div className="flex">
                                    <div className="w-full flex flex-col justify-between items-start sm:flex-row sm:items-center lg:items-start">
                                      <h1 className="m-4 mt-6">{item?.name}</h1>

                                      <h2 className="m-4 mt-6">{item?.price}</h2>
                                    </div>
                                  </div>

                                  <div className="m-4 mt-2 text-sm" dangerouslySetInnerHTML={{ __html: item!.description.html }} />

                                  <Link
                                    href="#"
                                    className="
                                      more-button 
                                      m-4 self-start 
                                      rounded-md 
                                      px-3 
                                      py-2 
                                      bg-indigo-600 
                                      text-sm 
                                      font-semibold 
                                      text-white 
                                      shadow-sm 
                                      "
                                  >
                                    {item?.buttonLabel}
                                  </Link>

                                </div>

                                <div className="w-2/12">
                                  <button
                                    onClick={() => router.push(`/products/detail/${item!.slug}`)}
                                    className="
                                      more-button 
                                      m-4 
                                      p-[2px] 
                                      inline-block
                                      text-4xl 
                                      text-black 
                                      "
                                  >
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path>
                                    </svg>

                                  </button>
                                </div>

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

        <div className="absolute z-20 bottom-0 left-1/2 -translate-x-1/2 w-11/12 py-4 flex flex-col">
          <button
            className="
              loading-more-button 
              self-end flex 
              items-center 
              justify-center 
              px-3 py-2 
              rounded-md 
              bg-black
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
