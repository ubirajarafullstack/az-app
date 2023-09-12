import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from './hygraph';
import { productsShoes } from '../graphql/productsShoes.graphql';

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

type First = {
  first: number;
}

export function useShoes(first: number) {
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

  const { data, isLoading, error } = useQuery({
    queryFn: products,
    queryKey: ['products', bySize]
  });

  return { data , isLoading, error};
}
