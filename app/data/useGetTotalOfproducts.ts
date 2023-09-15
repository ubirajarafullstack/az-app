import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from './hygraph';
import { getTotalOfproducts } from '../graphql/products.graphql';

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

interface Products {
  products: ProductData;
};

type Variables = {
  limit: number;
}


export function useGetTotalOfproducts(limit: number) {

  const variables: Variables = {
    limit
  }

  async function product() {
    const data = await graphqlClient.request<Products>(
      getTotalOfproducts,
      variables
    );

    //console.log('total products', data.products.length)

    // @ts-ignore
    return data.products.length;
  }

  return useQuery({
    queryFn: product,
    queryKey: ['getTotalOfproducts', variables]
  });
}
