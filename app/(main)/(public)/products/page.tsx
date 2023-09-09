/* eslint-disable @next/next/no-img-element */
'use client';

import Loading from '@/app/components/Loading';
import ProductsShoes from '@/app/components/ProductsShoes';
import { useAllProductsShoes } from '@/app/data/useAllProductsShoes';
import { useEffect, useState } from 'react';

import './locals.css';

export default function Shoes() {

  const [hash, setHash] = useState('null');

  useEffect(() => {
    if (location.hash) setHash(location.hash.substring(1));
  }, []);

  const tOnSlideChange = (swiper: any) => {
  };

  const { data, isLoading, error } = useAllProductsShoes(2, hash);

  if (isLoading) return <Loading />;
  if (error) console.log(error);

  let products = data.flat();

  function sanitize(products: any) {
    
    products = products.filter((e: any) => e !== null);

    function removeDuplicates(arr: any): any {
      const uniqueIds = new Set(arr.map((e: any) => e.id));
      return arr.filter((e: any) => {
        if (uniqueIds.has(e.id)) {
          uniqueIds.delete(e.id);
          return true;
        }
        return false;
      });
    }

    return removeDuplicates(products);
  }

  products = sanitize(products);

  return (
    <ProductsShoes data={{products}} />
  )
}
