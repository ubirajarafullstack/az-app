import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from './hygraph';
import { productBySlug } from '../graphql/products.graphql';

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

interface Product {
  product: ProductData;
};

type Variables = {
  slug: string;
}


export function useProduct(slug: string) {

  const variables: Variables = {
    slug
  }

  async function product() {
    const data = await graphqlClient.request<Product>(
      productBySlug, 
      variables
    );
    
    return data.product;
  }

  return useQuery({
    queryFn: product, 
    queryKey: ['product', variables]
  });
}
