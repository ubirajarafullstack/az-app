import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { graphqlClient } from './hygraph';
import { productsByDesc } from '../graphql/products.graphql';

type ProductType = Book | Shoe;

interface Book {
  id: string;
  publisher: string;
  author: string;
  translator: string;
  dimension: string;
  bookcategory: string;
  why: Description;
}

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

interface Edge {
  cursor: string;
  node: ProductData;
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
  pageSize: number;
}

interface ProductsConnection {
  edges: Edge[];
  pageInfo: PageInfo;
}

interface Page {
  productsConnection: ProductsConnection;
}

interface Data {
  pages: Page[];
  pageParams: number[];
}

type Variables = {
  limit: number;
}

export function useProducts(limit: number) {
  
  async function products(page: number) {
    console.log('page from hook', page)
    let variables: Variables = {
      limit
    }
    
    const data = await graphqlClient.request<Data>(
      productsByDesc,
      variables
    );

    console.log('data from hook ', data)
    //console.log('pages from hoook', data.productsConnection.edges.slice((page - 1) * 2, page * 2));
    
    
    return data.productsConnection.edges.slice((page - 1) * 1, page * 1);
    //return data;
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

/*
export function useProducts(limit: number) {
  
  async function products(page: number) {
    console.log('page from hook', page)
    let variables: Variables = {
      limit
    }
    
    const data = await graphqlClient.request<Data>(
      productsWithPagination,
      variables
    );
    
    //console.log('pages from hoook', data.productsConnection.edges.slice((page - 1) * 2, page * 2));
    
    return data.productsConnection.edges.slice((page - 1) * 1, page * 1);
    
    //return data;
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
    getNextPageParam: (lastPage, pages) => pages.length + 1,
    refetchOnWindowFocus: false,
    //initialData: {
    //  pages: [data2?.pages.slice(0, 2)],
    //  pageParams: [1]
    //} 
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
*/