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

//import './locals.css';
import { useShoesInfiniteWithInitialData } from '@/app/data/useShoesInfiniteWithInitialData';
import { useProducts } from '@/app/data/useProducts';
import { InfiniteData } from '@tanstack/react-query';

export default function Products() {

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
    <div className="pt-36">
      {data?.pages.map((page, i) => (
        <ul key={i}>
          {/* @ts-expect-error */}
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
}
