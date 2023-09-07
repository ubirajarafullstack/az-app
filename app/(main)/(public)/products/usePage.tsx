/* eslint-disable @next/next/no-img-element */
'use client';

import Loading from '@/app/components/Loading';
import { useAllProductsShoes } from '@/app/data/useAllProductsShoes';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import { Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs, Controller } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import React, { FC, lazy, Suspense } from 'react';
import { useSwiper } from 'swiper/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import './locals.css';

SwiperCore.use([Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs, Controller]);

interface ShoesProps {
  product: any; // você pode substituir o any pelo tipo correto do produto
}

const Shoes: FC<ShoesProps> = (props) => {

  const router = useRouter();
  const pathname = usePathname()

  const hash = pathname.split('#')[1] || 'null';
  const galleryContainer = useRef<any>({});
  const thumbsContainer = useRef<any>({});

  const getGallerySwiper = useCallback(
    (id: string) => {
      return galleryContainer.current[id]; // usa a propriedade current para acessar o objeto
    },
    [galleryContainer]
  );

  const getThumbsSwiper = useCallback(
    (id: string) => {
      return thumbsContainer.current[id]; // usa a propriedade current para acessar o objeto
    },
    [thumbsContainer]
  );

  const mainOptions: SwiperOptions = {
    direction: 'vertical',
    hashNavigation: { watchState: true },
    watchSlidesProgress: true,
  }

  const galleryOptions: (product: any) => SwiperOptions = (product: any) => ({
    pagination: false,
    watchSlidesProgress: true,
    nested: true,
    controller: { control: getThumbsSwiper(product.id) }, // passa a referência do swiper dos thumbs correspondente ao produto
    virtual: true, // habilita a renderização virtual
  });

  const thumbsOptions: (product: any) => SwiperOptions = (product: any) => ({
    direction: 'vertical',
    spaceBetween: 10,
    slidesPerView: 3,
    pagination: false,
    mousewheel: false,
    keyboard: false,
    freeMode: true,
    watchSlidesProgress: true,
    controller: { control: getGallerySwiper(product.id), by: "container" }, // passa a referência do swiper da galeria correspondente ao produto e define o modo de controle por container
  });

  //console.log(products);

  useEffect(() => {
    //console.log(thumbsContainer);

    // @ts-ignore
    let totalGallery = galleryContainer.length;

    if (totalGallery > 0) {
      thumbsContainer.current.map((e: any, i: number) => {
        e.enable();
      });
    }


    if (totalGallery > 0) {
      galleryContainer.current.map((e: any, i: number) => {
        e.enable();
        e.update({
          thumbs: { swiper: thumbsContainer.current[i] },
        });
      });
    }

  }, [thumbsContainer, galleryContainer]);


  const onSwiper = (swiper: any) => {

  };

  const gOnSwiper = (swiper: any) => {
    galleryContainer.current[swiper.id] = swiper; // atribui a referência diretamente ao objeto
    swiper.disable();
  };

  const tOnSwiper = (swiper: any) => {
    thumbsContainer.current[swiper.id] = swiper; // atribui a referência diretamente ao objeto
    swiper.disable();
  };

  const onSlideChange = (swiper: any) => {

  };

  const gOnSlideChange = (swiper: any) => {

  };

  const tOnSlideChange = (swiper: any) => {

  };

  // usa o useSwiper para obter a referência do swiper principal
  const swiperInstance = useRef<SwiperCore>(null);

  // usa o useSwiper para obter a referência do swiper da galeria
  const galleryInstance = useRef<SwiperCore>(null);

  // usa o useSwiper para obter a referência do swiper dos thumbs
  const thumbsInstance = useRef<SwiperCore>(null);

  //const Swiper = lazy( async () => import('swiper/react')) as any;
  //const Swiper = lazy ( async () => await import ('swiper/react')) as any;
  //const SwiperSlide = (async () => await import('swiper/react')) as any;

  // remove o async/await e usa apenas o import
  // @ts-ignore
  //const Swiper = lazy(() => import('swiper/react')) as any;
  // @ts-ignore
  //const SwiperSlide = lazy(() => import('swiper/react')) as any;

  // usa a propriedade default do módulo para acessar o componente Swiper
  //const Swiper = lazy(() => import('swiper/react').then((m) => ({ default: m.default }))) as any;

  // usa a propriedade SwiperSlide do módulo para acessar o componente SwiperSlide
  const SwiperSlide = lazy(() => import('swiper/react').then((m) => ({ default: m.SwiperSlide }))) as any;

  const { data, isLoading, error } = useAllProductsShoes(2, hash);

  if (isLoading) return <Loading />;
  if (error) console.log(error);

  let products = data.flat();

  if (hash === 'null') products.shift();

  // não precisa usar o onSwiper prop nos componentes Swiper
  return (
    // usa o Suspense para mostrar um fallback enquanto os componentes do swiper estão sendo carregados
    <Suspense fallback={<Loading />}>
      <div className="h-screen flex justify-center items-center">
        <Swiper {...mainOptions} className="main" onSlideChange={onSlideChange}>
          {products.map((e, i) => {
            return (
              <SwiperSlide className="flex flex-col justify-center items-center" key={e?.id} data-hash={e?.slug}>

                <div className="w-11/12 flex flex-col lg:flex-row-reverse">

                  <div className="w-full h-96 gap-4 flex lg:w-7/12">
                    <div className="relative w-10/12">
                      <div className="w-full h-full">
                        <Swiper className={`gallery gallery-${i} bg-white rounded-md`} {...galleryOptions(e)} onSlideChange={gOnSlideChange}>

                          {e?.images.map((e, i) => {
                            return (
                              <SwiperSlide lazy={true} className="bg-white p-6 rounded-md flex flex-row justify-center items-center" key={e?.id}>
                                <img src={e?.url} alt={e?.url} />
                              </SwiperSlide>
                            )
                          })}
                        </Swiper>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 w-2/12 h-full">
                      <div className="w-full h-full">
                        <Swiper className={`thumbs thumbs-${i}`} {...thumbsOptions(e)} onSlideChange={tOnSlideChange}>

                          {e?.images.map((e, i) => {
                            return (
                              <SwiperSlide lazy={true} className="bg-white p-2 rounded-md flex flex-row justify-center items-center" key={e?.id}>
                                <img src={e?.url} alt={e?.url} />
                              </SwiperSlide>
                            )
                          })}

                        </Swiper>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-5/12 flex flex-col justify-center items-center gap-4">
                    <h1 className="text-4xl font-bold">{e?.name}</h1>
                    <p className="text-xl">{e?.description?.html}</p>
                    <p className="text-2xl font-bold">R$ {e?.price}</p>
                    <Link className="bg-black text-white px-8 py-4 rounded-md" href={`/product/${e?.slug}`}>{e?.buttonLabel}</Link>
                  </div>

                </div>

              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </Suspense>
  );
}


export default React.memo(Shoes); // exporta o componente memorizado