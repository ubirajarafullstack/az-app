/* eslint-disable @next/next/no-img-element */
'use client';

import Loading from '@/app/components/Loading';
import { redirect } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs, Controller, Virtual } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { useCallback, useEffect, useState } from 'react';
import { useProduct } from '@/app/data/useProduct';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import '../../swiper.css';
import '../../products.css';

export default function Detail({ params }: { params: { slug: string } }) {

  const router = useRouter()

  if (!params) router.back();

  const [detailGalleryContainer, setDetailGalleryContainer] = useState<any>([]);
  const [detailThumbsContainer, setDetailThumbsContainer] = useState<any>([]);

  const getGallerySwiper = useCallback(
    (i: number) => {
      return detailGalleryContainer[i];
    },
    [detailGalleryContainer]
  );

  const getThumbsSwiper = useCallback(
    (i: number) => {
      return detailThumbsContainer[i];
    },
    [detailThumbsContainer]
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

  const galleryOptions: (i: number) => SwiperOptions = (i: number) => ({
    ...commonOptions,
    pagination: false,
    //watchSlidesProgress: true,
    keyboard: { enabled: true },
    mousewheel: false,
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

  const gOnSwiper = (swiper: any) => {
    setDetailGalleryContainer((gallery: any) => [...gallery, swiper]);
    //swiper.disable();
  };

  const tOnSwiper = (swiper: any) => {
    setDetailThumbsContainer((thumbs: any) => [...thumbs, swiper]);
    //swiper.disable();
  };

  const { data, isLoading, error } = useProduct(params.slug);

  useEffect(() => {

    if (detailGalleryContainer[0]) {
      const gallerySwiper = detailGalleryContainer[0];
      gallerySwiper.slideNext();
    }

  }, [detailThumbsContainer, detailGalleryContainer]);


  useEffect(() => {
    const detailPage = document.querySelector('.detail-page');
    detailPage?.classList.add('swiper-slide-active');
  }, [data]);


  if (isLoading) return <Loading />;
  if (error) console.log(error);

  //console.log(data)

  if (!data) return <div className="w-screen h-screen flex flex-col justify-center items-center">Nada encontrado. <Link className="m-4 font-semibold" href="/products">Back</Link></div>

  let product = []
  product.push(data);

  return (
    <div className="detail-page">
      <div className="slide-effect">
        {product?.map((item, index) => (
          <div className="pt-36 flex flex-col justify-center items-center" key={index}>

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

              <div className="w-full h-80 sm:h-[484px] gap-4 flex lg:w-7/12">
                <div className="w-10/12">

                  <div className="w-full h-full">
                    <Swiper className="gallery bg-white rounded-md" {...galleryOptions(index)} onSwiper={gOnSwiper}>

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
                  <Swiper className="thumbs" {...thumbsOptions(index)} onSwiper={tOnSwiper}>

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
                      <h1 className="m-4 mt-6 text-xl">{item.name}</h1>

                      <h2 className="mx-4 sm:m-4 sm:mt-6 text-xl">{item.price}</h2>
                    </div>
                  </div>

                  <h2 className="m-4 mb-0 font-bold">Descrição</h2>
                  <div className="paragraphs m-4 mt-0" dangerouslySetInnerHTML={{ __html: item.description.html }} />

                  <Link
                    href="#"
                    className="
                    more-button 
                    m-4 self-start 
                    rounded-full 
                    px-5 
                    py-3 
                    bg-black 
                    font-semibold 
                    text-white 
                    text-sm 
                    shadow-sm 
                    "
                  >
                    {item.buttonLabel}
                  </Link>

                  <h2 className="m-4 mb-0 font-bold">Produto</h2>
                  <div className="highlights m-8 mt-0" dangerouslySetInnerHTML={{ __html: item.highlights.html }} />

                  {item.productCategory === 'Books' ? (
                    <>
                      <h2 className="m-4 mb-0 font-bold">Motivos para ler</h2>
                      {/* @ts-ignore */}
                      <div className="paragraphs m-4 mt-0" dangerouslySetInnerHTML={{ __html: item.productType.why.html }} />

                      <h2 className="m-4 mb-0 font-bold">Sobre</h2>
                      <div className="m-4 grid gap-2 grid-cols-2 grid-rows-2">
                        {/* @ts-ignore */}
                        <p>Autor: {item.productType.author}</p>
                        {/* @ts-ignore */}
                        <p>Tradutor: {item.productType.translator}</p>
                        {/* @ts-ignore */}
                        <p>Categoria: {item.productType.bookCategory}</p>
                        {/* @ts-ignore */}
                        <p>Dimensões: {item.productType.dimension}</p>
                        <p>Nota : {item.rating} <svg className="inline-block text-lg" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg></p>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="m-4 mb-0 font-bold">Sobre</h2>
                      <div className="m-4 grid gap-2 grid-cols-2 grid-rows-2">
                        {/* @ts-ignore */}
                        <p>Marca: {item.productType.brand}</p>

                        {/* @ts-ignore */}
                        <p>Gênero: {item.productType.gender}</p>

                        <p>Cores:
                          {/* @ts-ignore */}
                          {item.productType.colors.map((color, index) => (
                            <span className="inline-block w-4 h-4 rounded-full mx-1" key={index} style={{ background: color.hex }}></span>
                          ))}
                        </p>

                        <p>Tamanhos:
                          {/* @ts-ignore */}
                          {item.productType.sizes.map((size, index) => (
                            <span className="px-1" key={index}>{size}</span>
                          ))}
                        </p>

                        {/* @ts-ignore */}
                        <p>Categoria: {item.productType.shoeCategory}</p>
                        <p>Nota : {item.rating} <svg className="inline-block text-lg" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg></p>
                      </div>
                    </>
                  )}


                  <button
                    //onClick={() => router.back()}
                    onClick={() => router.push(`/products#${item.slug}`)}
                    className="
                    more-button 
                    m-4 
                    p-[2px] 
                    inline-block
                    text-5xl 
                    text-slate-400
                    "
                  >
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"></path>
                    </svg>

                  </button>
                </div>

                <div className="w-2/12">
                  <button
                    //onClick={() => router.back()}
                    onClick={() => router.push(`/products#${item.slug}`)}
                    className="
                    more-button 
                    m-3 
                    p-[2px] 
                    inline-block
                    text-5xl 
                    text-slate-400
                    "
                  >
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"></path>
                    </svg>

                  </button>
                </div>

              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
