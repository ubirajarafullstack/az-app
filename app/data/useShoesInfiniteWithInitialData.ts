'use client';

import { QueryKey, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { graphqlClient } from './hygraph';
import { productsShoesWithPagination } from '../graphql/productsShoes.graphql';
import { useShoesFirstProduct } from './useShoesFirstProduct';
import { useState, useEffect } from 'react';
import { skip } from 'node:test';

type ProductType = Shoe;

interface Shoe {
  id: string;
  brand: string;
  sizes: number[];
  colors: Color[];
  shoeCategory: string;
  gender: string;
}

interface Color {
  hex: string;
}

interface Description {
  html: string;
}

interface Image {
  id: string;
  url: string;
}

interface ProductData {
  id: string;
  department: string;
  spirit: string;
  productCategory: string;
  productType: ProductType;
  name: string;
  slug: string;
  rating: number;
  price: number;
  description: Description;
  buttonType: string;
  buttonLabel: string;
  buttonLink: string;
  images: Image[];
  highlights: Description;
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
  pageSize: number;
}

interface ProductsConnection {
  edges: {
    cursor: string;
    node: ProductData;
  }[];
  pageInfo: PageInfo;
}

interface Data {
  productsConnection: ProductsConnection;
}

type Products = {
  data: Data;
};

type Variables = {
  first: number;
  skip: number;
}

export function useShoesInfiniteWithInitialData(first: number, skipper: number) {
  async function products(skip = skipper) {
    console.log(`Fetching page: ${skip}`); // Log the page number
    let limit: Variables = {
      first,
      skip
    }
    const data = await graphqlClient.request<Products>(
      productsShoesWithPagination,
      limit
    );
    console.log(data); // Log the API response
    return data;
  }

  const product = useShoesFirstProduct(1);

  const {
    data,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: () => products(skipper),
    getNextPageParam: (lastPage, pages) => pages.length,
    refetchOnWindowFocus: false,
    initialData: () => product.data, // Use product.data instead of product
  });
  
  return {
    data,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  };
}



/* const skip = 0;
  const bySize: Variables = {
    first,
    skip
  }

  async function products({pageParam = skip}) {
    const res = await graphqlClient.request<Products>(
      productsShoesWithPagination,
      //{ ...bySize, skip: pageParam ? pageParam : 0 }
      bySize
    );
    const data = res.data;
  
    return {
      data, // this is required
      nextCursor: data.productsConnection.edges[data.productsConnection.edges.length - 1].cursor // this is optional
    };
  }
  

  //const { data: firstProduct } = useShoesFirstProduct(1);

  //console.log('firstProduct', firstProduct)

  
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryFn: products,
    queryKey: ['products'],
    getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
    //initialData: firstProduct
  });
  
  console.log('data from hook', data?.pages.map(page => page))

  return {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  }; */

