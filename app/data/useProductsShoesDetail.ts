'use client';

import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from './hygraph';

import { productShoesBySlug } from '../graphql/productsShoes.graphql';

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

type Product = {
  product: ProductData; 
};


type Variables = {
  slug: string
}

export function useProductsShoesDetail(slug: string) {

  const variables: Variables = {
    slug
  }

  async function productsShoesDetailBySlug() {
    const data = await graphqlClient.request<Product>(
      productShoesBySlug, 
      variables
    );
    
    return data.product;
  }

  return useQuery({
    queryFn: productsShoesDetailBySlug, 
    queryKey: ['productsShoesDetailBySlug', variables]
  });
}
