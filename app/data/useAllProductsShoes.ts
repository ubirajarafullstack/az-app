'use client';

import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from './hygraph';

import { productsShoes, productShoesBySlug } from '../graphql/productsShoes.graphql';

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

type Product = {
  product: ProductData[];
};

type First = {
  first: number;
}

type Slug = {
  slug: string;
}


export function useAllProductsShoes(first: number, slug: string) {

  const bySize: First = {
    first
  }

  async function products() {
    const data = await graphqlClient.request<Products>(
      productsShoes,
      bySize
    );

    return data.products;
  }

  const bySlug: Slug = {
    slug
  }

  async function product() {
    const data = await graphqlClient.request<Product>(
      productShoesBySlug,
      bySlug
    );

    return data.product;
  }

  const { data: pN, isLoading: pNisLoading, error: pNError } = useQuery({
    queryFn: products,
    queryKey: ['products', bySize]
  });


  const { data: p1, isLoading: p1isLoading, error: p1Error } = useQuery({
    queryFn: product,
    queryKey: ['product', bySlug]
  });


  const data = [p1, pN];
  const isLoading = p1isLoading || pNisLoading;
  const error = p1Error || pNError;


  return { data , isLoading, error};
}
