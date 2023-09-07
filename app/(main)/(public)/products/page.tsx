/* eslint-disable @next/next/no-img-element */
'use client';

import Loading from '@/app/components/Loading';
import { useAllProductsShoes } from '@/app/data/useAllProductsShoes';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs, Controller } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import './locals.css';

export default function Shoes() {

  let hash = useRef('null');
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const [gSwiperRef, setGswiperRef] = useState<any>(null);
  const [tSwiperRef, setTswiperRef] = useState<any>(null);
  const [galleryContainer, setGalleryContainer] = useState<any>([]);
  const [thumbsContainer, setThumbsContainer] = useState<any>([]);

  useEffect(() => {
    if (location.hash) hash.current = location.hash.substring(1);
    //console.log('oi');
  }, []);

  //console.log(hash.current);

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
    thumbs: { swiper: thumbsContainer[0] },
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


  //console.log(products);

  //begin teste
  function teste() {
    const picture = document.querySelectorAll('.gallery');
    const thumb = document.querySelectorAll('.thumbs');

    console.log(picture.length);

    // Use map to iterate over the thumbsContainer array and return a new array of swipers
    //const thumbs = thumbsContainer.map((e: any, i:number) => {
    for (let i = 0; i < picture.length; i++) {

      thumb[i].classList.add('thumbs-' + i);
      picture[i].classList.add('gallery-' + i);

      let thumbs = (Swiper as any)('.thumbs-' + i, {
        loop: true,
        spaceBetween: 8,
        slidesPerView: 3.2,
        freeMode: true,
        watchSlidesProgress: true,
      });

      let pictures = (Swiper as any)('.gallery-' + i, {
        loop: true,
        autoHeight: false,
        mousewheel: true,
        keyboard: true,
        nested: true,
        spaceBetween: 1,
        thumbs: {
          swiper: thumbs,
        },
      });

    }

    //});

    // Use map to iterate over the picture array and return a new array of swipers
    //const pictures = picture.map(() => {

    //});

  }
  //end teste

  //const onSlideChangeMain = (swiper: any) => teste();

  useEffect(() => {
    //console.log(thumbsContainer);
    //console.log(galleryContainer);

    const totalGallery = document.querySelectorAll('.gallery');
    const totalThumbs = document.querySelectorAll('.thumbs');

    //console.log(totalGallery, totalThumbs);

    for (let i = 0; i < totalGallery.length; i++) {
      // @ts-ignore
      ////let gallery = document.querySelector('.gallery-' + i).swiper;
      // @ts-ignore
      ////let thumbs = document.querySelector('.thumbs-' + i).swiper;
      
      /* gallery.enable();
      thumbs.enable();

      gallery.update({
        thumbs: { swiper: thumbs },
      });
 */

    }

  }, [thumbsContainer, galleryContainer]);


  const onSwiper = (swiper: any) => {
    //swiperRef.current = swiper;
    // @ts-ignore
    //console.log(swiperRef.current?.activeIndex)
  };

  const gOnSwiper = (swiper: any) => {
    ////setGalleryContainer(swiper);
    setGalleryContainer((prev: any) => [...prev, swiper]);
    swiper.disable();
    ////console.log(swiper);

    //console.log(thumbsContainer);

    ////let slides = swiper.slides;
    // Get the current active slide
    ////let activeSlide = slides[swiper.activeIndex];

    // Get the data-swiper-slide-index attribute of the active slide
    ////let index = activeSlide.getAttribute('data-swiper-slide-index');
    ////console.log(index);
    // Get the corresponding thumbs swiper from the thumbsContainer array
    ////let tSwiper = thumbsContainer?.[index];
    //console.log(tSwiper);
    // Update the gallery swiper options with the corresponding thumbs swiper
    ////swiper.update({
    ////  thumbs: { swiper: thumbsContainer?.[index] },
    ////});

    /* swiper.__swiper__.extendDefaults({
      thumbs: { swiper: tSwiperRef },
    }); */
    //gSwiperRef.current = swiper;
    // @ts-ignore
    //console.log(gSwiperRef.current?.activeIndex);

    /* let activeIndex = swiper.activeIndex;

    swiper.extendDefaults({
      initialSlide: activeIndex,
      thumbs: { swiper: tSwiperRef },
    }); */
  };

  const tOnSwiper = (swiper: any) => {
    ////setThumbsContainer(swiper);
    setThumbsContainer((prev: any) => [...prev, swiper]);
    swiper.disable();
    /* useEffect(() => {
      // Fetch some data from an API or a local source
      // Update the thumbsContainer state with the data
      setThumbsContainer(data);
    }, []); */



    //console.log(thumbsContainer);
    //setTswiperRef(swiper);
    //tSwiperRef.current = swiper;
    // @ts-ignore
    //console.log(tSwiperRef.current?.activeIndex);

    /* let gSwiper = gSwiperRef.current;
    let tSwiper = tSwiperRef.current;

    // @ts-ignore
    gSwiper?.update({
      initialSlide: 0,
      loop: true,
      autoHeight: false,
      mousewheel: true,
      keyboard: true,
      nested: true,
      spaceBetween: 1,
      thumbs: {
        swiper: tSwiper
      },
    }); */
  };

  const onSlideChange = (swiper: any) => {

  };

  const gOnSlideChange = (swiper: any) => {
    //let activeIndex = swiper.activeIndex;
    // Get the thumbs swiper instance from the ref object
    //let tSwiper = ;
    // Update the thumbs swiper options with the new active index

    // @ts-ignore
    /* tSwiper?.update({
      initialSlide: activeIndex,
      loop: true,
      spaceBetween: 8,
      slidesPerView: 3.2,
      freeMode: true,
      watchSlidesProgress: true,
      thumbs: { swiper: tSwiperRef },
    }); */

    /* let activeIndex = swiper.activeIndex;

    swiper.update({
      initialSlide: activeIndex,
      thumbs: { swiper: tSwiperRef },
    }); */
  };

  const tOnSlideChange = (swiper: any) => {
    //let activeIndex = swiper.activeIndex;
    // Get the gallery swiper instance from the ref object
    //let gSwiper = ;
    // Update the gallery swiper options with the new active index

    /* gSwiper?.update({
      initialSlide: activeIndex,
      loop: true,
      autoHeight: false,
      mousewheel: true,
      keyboard: true,
      nested: true,
      spaceBetween: 1,
      thumbs: {
        swiper: tSwiperRef.current
      },
    }); */
  };

  const { data, isLoading, error } = useAllProductsShoes(2, hash.current);

  if (isLoading) return <Loading />;
  if (error) console.log(error);

  let products = data.flat();

  if (hash.current === 'null') products.shift();

  return (
    <div className="h-screen flex justify-center items-center">
      <Swiper {...mainOptions} className="main" onSlideChange={onSlideChange} onSwiper={onSwiper}>
        {products.map((e, i) => {
          return (
            <SwiperSlide className="flex flex-col justify-center items-center" key={i} data-hash={e?.slug}>

              <div className="w-11/12 flex flex-col lg:flex-row-reverse">

                <div className="w-full h-96 gap-4 flex lg:w-7/12">
                  <div className="relative w-10/12">
                    <div className="w-full h-full">
                      <Swiper className={`gallery gallery-${i} bg-white rounded-md`} {...galleryOptions} onSlideChange={gOnSlideChange} onSwiper={gOnSwiper}>

                        {e?.images.map((e, i) => {
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
                    <Swiper className={`thumbs thumbs-${i}`} {...thumbsOptions} onSlideChange={tOnSlideChange} onSwiper={tOnSwiper}>

                      {e?.images.map((e, i) => {
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
        })}
      </Swiper>
    </div>
  )
}
