'use client';

import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from './hygraph';

import { productsShoes as productShoesQuery } from '../graphql/productsShoes.graphql';

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

type Products = {
  products: ProductData[]; 
};


type Variables = {
  first: number
}

export function useProductsShoes(first: number) {

  const variables: Variables = {
    first
  }

  async function productsShoes() {
    const data = await graphqlClient.request<Products>(
      productShoesQuery, 
      variables
    );
    
    return data.products;
  }

  return useQuery({
    queryFn: productsShoes, 
    queryKey: ['productsShoes', variables]
  });
}
