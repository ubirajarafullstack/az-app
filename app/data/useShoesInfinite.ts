'use client';

import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { graphqlClient } from './hygraph';
import { productsShoesWithPagination } from '../graphql/productsShoes.graphql';
import { useShoesFirstProduct } from './useShoesFirstProduct';

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

export function useShoesInfinite(first: number) {
  const skip = 0;
  const bySize: Variables = {
    first,
    skip
  }

  async function products() {
    const data = await graphqlClient.request<Products>(
      productsShoesWithPagination,
      bySize
    );

    return data;

    /* return {
      data, // this is required
      nextCursor: data.data.productsConnection.edges[data.data.productsConnection.edges.length - 1].cursor // this is optional
    }; */
  }

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
    queryKey: ['productsInfinite'],
    queryFn: products,
    //queryFn: async ({ pageParam = 1 }) => products,
    getNextPageParam: (_, pages) => { return pages.length + 1},
    //getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
    //initialData: firstProduct?.data.productsConnection.edges.map((e,i) => e.node)
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
}
