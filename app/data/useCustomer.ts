'use client';

import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from './hygraph';

import { customer as customerQuery } from '../graphql/customer.graphql';

interface CustomerData {
  id: string
  email: string
  image: string
  name: string
}

type Customer = {
  customer: CustomerData
}

type Variables = {
  email: string
}

export function useCustomer(email: string) {

  const variables: Variables = {
    email
  }

  async function customer() {
    const data = await graphqlClient.request<Customer>(
      customerQuery, 
      variables
    );
    
    return data.customer;
  }

  return useQuery({
    queryFn: customer, 
    queryKey: ['customer', variables]
  });
}
