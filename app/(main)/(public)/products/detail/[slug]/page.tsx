/* eslint-disable @next/next/no-img-element */
'use client';

import Loading from '@/app/components/Loading';
import { redirect } from 'next/navigation';
import { useProductsShoesDetail } from '@/app/data/useProductsShoesDetail';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import './locals.css';
import { useProduct } from '@/app/data/useProduct';

export default function Detail({ params }: { params: { slug: string } }) {

  if (!params) redirect('/shoes/product');

  const [galleryContainer, setGalleryContainer] = useState<any>([]);
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
    direction: 'vertical',
    spaceBetween: 10,
    slidesPerView: 3,
    pagination: false,
    mousewheel: false,
    keyboard: false,
    freeMode: true,
    watchSlidesProgress: true,
  }

  const gOnSwiper = (swiper: any) => {
    setGalleryContainer((gallery: any) => [...gallery, swiper]);
    //swiper.disable();
  };

  const { data, isLoading, error } = useProduct(params.slug);

  useEffect(() => {


    if (galleryContainer[0]) {
      const gallerySwiper = galleryContainer[0];
      gallerySwiper.slideNext();
    }


  }, [thumbsContainer, galleryContainer]);

  if (isLoading) return <Loading />;
  if (error) console.log(error);

  console.log(data)

  if (!data) return <div className="w-screen h-screen flex flex-col justify-center items-center">Nada encontrado. <Link className="m-4 font-semibold text-sm" href="/products">Back</Link></div>

  let product = []
  product.push(data);

  return (
    <div className="pt-36 flex flex-col justify-center items-center">
      {product?.map((e, i) => {
        return (
          <>
            <div className="w-11/12 p-4 text-xs">{e.department} / {e.spirit} / {e.productCategory}</div>
            <div className="w-11/12 flex flex-col lg:flex-row-reverse" key={i}>

              <div className="w-full h-96 sm:h-[484px] gap-4 flex lg:w-7/12">
                <div className="w-10/12">

                  <div className="w-full h-full">
                    <Swiper className="gallery bg-white rounded-md" {...galleryOptions} onSwiper={gOnSwiper}>

                      {e?.images.map((e, i) => {
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
                  <Swiper className="thumbs" {...thumbsOptions} onSwiper={setThumbsContainer}>

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

              <div className="info w-full lg:w-5/12 flex flex-col">

                <div className="flex">
                  <div className="w-10/12 flex flex-col justify-between items-start sm:flex-row sm:items-center lg:items-start">
                    <h1 className="m-4 py-2">{e?.name}</h1>

                    <h2 className="m-4 mt-0 sm:mt-4 sm:py-2">{e?.price}</h2>
                  </div>

                  <div className="w-2/12">
                    <Link href="/products" className="more-button m-4 inline-block rounded-md px-3 py-2 text-sm font-semibold text-black shadow-sm bg-white hover:drop-shadow drop-shadow-2xl">Back</Link>
                  </div>
                </div>

                <div className="w-10/12 m-4" dangerouslySetInnerHTML={{ __html: e!.description.html }} />

                {e.productCategory === 'Books' ? (
                  <>
                    <div className="m-4 grid gap-2 grid-cols-2 grid-rows-2">
                      {/* @ts-ignore */}
                      <p>Autor : {e.productType.author}</p>
                      {/* @ts-ignore */}
                      <p>Tradutor : {e.productType.translator}</p>
                      {/* @ts-ignore */}
                      <p>Dimensão : {e.productType.dimension}</p>
                      {/* @ts-ignore */}
                      <p>Categoria : {e.productType.bookcategory}</p>
                    </div>
                    {/* @ts-ignore */}
                    <div className="w-10/12 m-4" dangerouslySetInnerHTML={{ __html: e.productType.why.html }} />
                  </>
                ) : (
                  <div className="m-4 grid gap-2 grid-cols-2 grid-rows-2">
                    {/* @ts-ignore */}
                    <p>Marca : {e.productType.brand}</p>
                    <ul className="flex">
                      <li>Tamanho :</li>
                      {/* @ts-ignore */}
                      {e.productType.sizes.map((size, index) => (
                        <li className="p-[2px] bg-black/10 mx-1" key={index}>{size}</li>
                      ))}
                    </ul>
                    <ul className="flex items-center">
                      <li>Cor :</li>
                      {/* @ts-ignore */}
                      {e.productType.colors.map((color, index) => (
                        <li className="block w-4 h-4 rounded-full mx-1" key={index} style={{ background: color.hex }}></li>
                      ))}
                    </ul>
                    {/* @ts-ignore */}
                    <p>Categoria : {e.productType.shoeCategory}</p>
                    {/* @ts-ignore */}
                    <p>Gênero : {e.productType.gender}</p>
                  </div>
                )}

                <Link href="#" className="more-button m-4 self-start rounded-md px-3 py-2 text-sm font-semibold text-black shadow-sm bg-white hover:drop-shadow drop-shadow-2xl">{e?.buttonLabel}</Link>
                <div className="m-4" dangerouslySetInnerHTML={{ __html: e!.highlights.html }} />

              </div>
            </div>
          </>
        )
      })}
    </div>
  )
}
