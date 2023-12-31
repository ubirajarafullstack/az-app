/* eslint-disable @next/next/no-img-element */
'use client';

import Loading from '@/app/components/Loading';
import SpinnerSmall from '@/app/components/SpinnerSmall';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { useCallback, useEffect, useState } from 'react';
import { useProducts, Page, Edge } from '@/app/data/useProducts';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import './swiper.css';
import './products.css';

export default function Products() {

  const router = useRouter()

  const pathname = usePathname()

  /* const [mainContainer, setMainContainer] = useState<any>([]);
  const [galleryContainer, setGalleryContainer] = useState<any>([]);
  const [thumbsContainer, setThumbsContainer] = useState<any>([]); */

  const [mainData, setMainData] = useSessionStorage('mainData', []);

  const [mainContainer, setMainContainer] = useState<any>(null);
  //const [mainContainer, setMainContainer] = useSessionStorage('mainContainer', []);
  const [galleryContainer, setGalleryContainer] = useSessionStorage('galleryContainer', []);
  const [thumbsContainer, setThumbsContainer] = useSessionStorage('thumbsContainer', []);

  const [sliderNext, setSliderNext] = useState<boolean>(false);

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
    modules: [Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs],
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: false,
    pagination: { clickable: true },
    //mousewheel: true,
    //keyboard: { enabled: true },
    //freeMode: false,
    //loop: true,
    //hashNavigation: false,
    //watchSlidesProgress: false,
    //nested: false,
    //thumbs: undefined,
  }

  const mainOptions: SwiperOptions = {
    ...commonOptions,
    direction: 'vertical',
    keyboard: { enabled: true },
    mousewheel: true,
    hashNavigation: { watchState: true },
    //watchSlidesProgress: false,
  }

  const galleryOptions: (i: number) => SwiperOptions = (i: number) => ({
    ...commonOptions,
    pagination: false,
    //watchSlidesProgress: true,
    keyboard: { enabled: true },
    mousewheel: true,
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
    //mousewheel: false,
    //keyboard: false,
    //freeMode: false,
    //watchSlidesProgress: true,
  });

  const mainOnSwiper = (swiper: any) => {
    //setMainContainer((main: any) => [...main, swiper]);
    setMainContainer(swiper);

    // Sincronize o slide ativo com a página de dados atual
    //swiper.slideTo(data?.pageParams.length ? data.pageParams.length : 0);

    /* if (mainContainer) {
      const mainSwiper = mainContainer;
      mainSwiper.update();
      mainSwiper.slideTo(data?.pageParams.length ? data.pageParams.length : 0);
    } */
  };


  const galleryOnSwiper = (swiper: any) => {
    setGalleryContainer((gallery: any) => [...gallery, swiper]);
    //swiper.disable();
    /* if(mainContainer) {
      mainContainer.slideNext();
      console.log('from g on' , mainContainer)
    } */
  };

  const thumbsOnSwiper = (swiper: any) => {
    setThumbsContainer((thumbs: any) => [...thumbs, swiper]);
    //swiper.disable();
  };

  /* const mainOnSlideChange = (swiper: any) => {
    if (galleryContainer[swiper.activeIndex]) {
      const gallerySwiper = galleryContainer[swiper.activeIndex];
      const thumbsSwiper = galleryContainer[swiper.activeIndex];
      gallerySwiper.slideNext();
      //thumbsSwiper.enable()
    }
  }; */

  const mainOnSlideChange = (swiper: any) => {
    const activeIndex = swiper.activeIndex;
    const thumbsSwiper = thumbsContainer[activeIndex];
    const gallerySwiper = galleryContainer[activeIndex];

    if (gallerySwiper && thumbsSwiper) {
      gallerySwiper.disable();
      thumbsSwiper.disable();

      //gallerySwiper.thumbs.swiper = thumbsSwiper;
      //thumbsSwiper.thumbs.swiper = gallerySwiper;
      //thumbsSwiper.el.classList.add('swiper-thumbs');

      galleryContainer[activeIndex] = gallerySwiper;
      thumbsContainer[activeIndex] = thumbsSwiper;

      gallerySwiper.enable();
      thumbsSwiper.enable();
    }

    if (gallerySwiper) {
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
    imageUrls,
    isLoading,
    fetchNextPage,
    fetchAndSetNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage
  } = useProducts(99);

  /* useEffect(() => {
    for (const key in galleryContainer) {
      const gallerySwiper = galleryContainer[key];
      const thumbsSwiper = thumbsContainer[key];
      //gallerySwiper.enable();
      //thumbsSwiper.enable();
    }

    if (mainContainer[0]) {
      const mainSwiper = mainContainer[0];
      mainSwiper.slideTo(data?.pageParams.length ? data.pageParams.length : 0);
    }

  }, [thumbsContainer, galleryContainer, mainContainer, data]); */

  useEffect(() => {
    if (pathname === '/products') {
      for (const key in galleryContainer) {
        const gallerySwiper = galleryContainer[key];
        const thumbsSwiper = thumbsContainer[key];

        if (gallerySwiper && thumbsSwiper) {
          gallerySwiper.disable();
          thumbsSwiper.disable();


          gallerySwiper.thumbs.swiper = thumbsSwiper;
          thumbsSwiper.el.classList.add('swiper-thumbs');

          galleryContainer[key] = gallerySwiper;
          thumbsContainer[key] = thumbsSwiper;

          gallerySwiper.enable();
          thumbsSwiper.enable();
        }
      }
    }
  }, [pathname, galleryContainer, thumbsContainer]);


  /* useEffect(() => {
    if (pathname === '/products') {
      for (const key in galleryContainer) {
        const gallerySwiper = galleryContainer[key];
        const thumbsSwiper = thumbsContainer[key];

        if (!thumbsSwiper.el.classList.contains('swiper-thumbs')) {

          //gallerySwiper.thumbs.swiper = thumbsSwiper;
          //thumbsSwiper.thumbs.swiper = gallerySwiper;
          //thumbsSwiper.el.classList.add('swiper-thumbs');
        }
      }
    }
  }, [pathname, galleryContainer, thumbsContainer]); */

  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
    console.log('from img urls', url);
  });

  useEffect(() => {
    if (mainContainer && sliderNext) {

      mainContainer.slideNext();
      mainContainer.slideTo(totalProducts);

      setTimeout(() => setSliderNext(false), 1000);
    }
  }, [sliderNext, mainContainer, galleryContainer, totalProducts]);

  useEffect(() => {
    setMainData(data);
  }, [data, setMainData]);

  if (isLoading) return <Loading />;

  console.log('main data', mainData);

  let globalIndex = 0;

  return (
    <>
      <div className="relative h-[calc(100dvh)] flex justify-center items-center overflow-hidden">
        {mainData && (
          <Swiper {...mainOptions} className="main" onSwiper={mainOnSwiper} onSlideChange={mainOnSlideChange}>
            <>
              {
                mainData?.pages.map((page: Edge[], pageIndex: number) => (

                  <div key={pageIndex}>
                    {page.map((edge: Edge, index: number) => {
                      //console.log('ind', globalIndex);


                      return (
                        <SwiperSlide key={edge.cursor} className="" data-hash={edge.node.slug}>
                          <div className="slide-effect w-full flex flex-col justify-center items-center">

                            <div className="breadcrumb w-11/12 p-4 text-xs">
                              {edge.node.department}
                              <span className="inline-block px-1">/</span>
                              {edge.node.spirit}
                              <span className="inline-block px-1">/</span>
                              {edge.node.productCategory}
                              <span className="inline-block px-1">/</span>
                              {edge.node.productCategory === 'Books'
                                ?
                                (
                                  <>
                                    {/* @ts-ignore */}
                                    {edge.node.productType.bookCategory}
                                    <span className="inline-block px-1">/</span>
                                    {/* @ts-ignore */}
                                    {edge.node.productType.author}
                                  </>
                                )
                                :
                                (
                                  <>
                                    {/* @ts-ignore */}
                                    {edge.node.productType.shoeCategory}
                                    <span className="inline-block px-1">/</span>
                                    {/* @ts-ignore */}
                                    {edge.node.productType.brand}
                                    <span className="inline-block px-1">/</span>
                                    {/* @ts-ignore */}
                                    {edge.node.productType.gender}
                                  </>
                                )
                              }
                            </div>

                            <div className="w-11/12 flex flex-col lg:flex-row-reverse">

                              <div className="w-full h-80 sm:h-[484px] gap-4 flex lg:w-7/12">

                                <div className="w-10/12">

                                  <div className="w-full h-full">
                                    <Swiper className={`gallery gallery-${globalIndex} bg-white rounded-md`} {...galleryOptions(globalIndex)} onSwiper={galleryOnSwiper} onSlideChange={galleryOnSlideChange}>
                                      {edge.node.images.map((e, i) => {
                                        return (
                                          <SwiperSlide className="bg-white p-6 rounded-md flex flex-row justify-center items-center" key={i}>
                                            <img className="block object-contain max-h-full" src={e.url} alt="" />
                                          </SwiperSlide>
                                        )
                                      })}
                                    </Swiper>
                                  </div>

                                </div>

                                <div className="w-2/12 h-full">

                                  <div className="h-3/6 flex sm:hidden">
                                    <button
                                      onClick={() => router.push(`/products/detail/${edge.node.slug}`)}
                                      className="
                                        more-button 
                                        self-start 
                                        p-[2px] 
                                        inline-block
                                        text-4xl 
                                        text-slate-400
                                        "
                                    >
                                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path>
                                      </svg>

                                    </button>
                                  </div>


                                  <div className="h-3/6 hidden sm:flex">
                                    <Swiper className={`thumbs thumbs-${globalIndex}`} {...thumbsOptions(globalIndex)} onSwiper={thumbsOnSwiper} onSlideChange={thumbsOnSlideChange}>
                                      {edge.node.images.map((e, i) => {
                                        return (
                                          <SwiperSlide className="bg-white rounded-sm opacity-50 flex flex-col justify-center items-center" key={i}>
                                            <img className="w-full h-full block object-contain" src={e.url} alt="" />
                                          </SwiperSlide>
                                        )
                                      })}
                                    </Swiper>

                                    <>
                                      {(() => {
                                        console.log('gls', globalIndex);
                                        globalIndex++;
                                      })()}
                                    </>
                                  </div>




                                </div>

                              </div>

                              <div className="info w-full lg:w-5/12 flex">

                                <div className="w-10/12 flex flex-col">
                                  <div className="flex">
                                    <div className="w-full flex flex-col justify-between items-start sm:flex-row sm:items-center lg:items-start">
                                      <h1 className="m-4 mt-6 text-xl">{edge.node.name}</h1>

                                      <h2 className="mx-4 sm:m-4 sm:mt-6 text-xl">{edge.node.price}</h2>
                                    </div>
                                  </div>

                                  <div className="m-4 mt-0 hidden sm:flex" dangerouslySetInnerHTML={{ __html: edge.node.description.html }} />

                                </div>

                                <div className="w-2/12">
                                  <button
                                    onClick={() => router.push(`/products/detail/${edge.node.slug}`)}
                                    className="
                                      more-button 
                                      hidden
                                      m-4 
                                      p-[2px] 
                                      sm:flex
                                      text-4xl 
                                      text-slate-400
                                      "
                                  >
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path>
                                    </svg>

                                  </button>
                                </div>

                              </div>

                            </div>

                          </div>
                        </SwiperSlide>
                      )

                    })}

                  </div>

                ))
              }
            </>
          </Swiper>
        )}


        <button
          className="
              loading-more-button
              absolute 
              z-40 
              bottom-2 
              right-1/2 
              translate-x-1/2 
              flex 
              items-center 
              justify-center 
              text-slate-400 
              text-4xl
              "
          onClick={() => {
            fetchNextPage();
            //setMainContainer([])
            //setGalleryContainer([])
            //setThumbsContainer([])

            setSliderNext(true);

          }}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? (
              <>
                <SpinnerSmall />
              </>
            )
            : (data?.pages.length ?? 0) < totalProducts
              ? <span dangerouslySetInnerHTML={{ __html: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"></path></svg>' }}></span>
              : <span dangerouslySetInnerHTML={{ __html: '' }}></span>}
        </button>


      </div>

    </>
  )

}

function useSessionStorage(key: any, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const item = window.sessionStorage.getItem(key);
      return item && item !== 'undefined' ? JSON.parse(item) : initialValue;
    } else {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    setStoredValue(value);
    window.sessionStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}
