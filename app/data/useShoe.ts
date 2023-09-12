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

type Slug = {
  slug: string;
}

export function useShoe(slug: string) {
  const bySlug: Slug = {
    slug
  }

  async function product() {
    const data = await graphqlClient.request<Product>(
      productShoesBySlug,
      bySlug
    );

    return [data.product];
  }

  const { data, isLoading, error } = useQuery({
    queryFn: product,
    queryKey: ['product', bySlug]
  });

  return { data , isLoading, error};
}
