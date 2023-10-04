import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { graphqlClient } from './hygraph';
import { productsByDesc } from '../graphql/products.graphql';
import { useState} from 'react';

export type ProductType = Book | Shoe;

export interface Book {
  id: string;
  publisher: string;
  author: string;
  translator: string;
  dimension: string;
  bookCategory: string;
  why: Why;
}

export interface Shoe {
  id: string;
  brand: string;
  sizes: number[];
  colors: Color[];
  shoeCategory: string;
  gender: string;
}

export interface Color {
  hex: string;
}

export interface Why {
  html: string;
}

export interface Description {
  html: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface ProductData {
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

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
  pageSize: number;
}

export interface ProductsConnection {
  edges: {
    cursor: string;
    node: ProductData;
  }[];
  pageInfo: PageInfo;
}

export interface Data {
  productsConnection: ProductsConnection;
}

export type Products = {
  data: Data;
};

export interface Edge {
  cursor: string;
  node: ProductData;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
  pageSize: number;
}

export interface ProductsConnection {
  edges: Edge[];
  pageInfo: PageInfo;
}

export interface Page {
  productsConnection: ProductsConnection;
}

export interface Data {
  pages: Page[];
  pageParams: number[];
}

type Variables = {
  limit: number;
}

export function useProducts(limit: number) {

  const [totalProducts, setTotalProducts] = useState<number>(0);
  
  async function products(page: number) {

    console.log('page from hook', page)
    
    let variables: Variables = {
      limit
    }
    
    const data = await graphqlClient.request<Data>(
      productsByDesc,
      variables
    );

    setTotalProducts(data.productsConnection.edges.length);
    
    return data.productsConnection.edges.slice((page - 1) * 1, page * 1);
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
    queryKey: ['products'],
    queryFn: ({pageParam = 1}) => products(pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return pages.length + 1;
    },
    refetchOnWindowFocus: false,
  });
  
  return {
    data,
    totalProducts,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
    // @ts-ignore
    hasNextPage: hasNextPage && data?.pages[data?.pages.length - 1].length > 0,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  };
}
