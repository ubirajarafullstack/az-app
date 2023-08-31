'use client';

import { useCustomer } from '@/app/data/useCustomer';

export default function Customer() {
  
  const { data, isLoading, error } = useCustomer('email@email.com');

  if (isLoading) return <div>Loading...</div>
  if (error) console.log(error);

  console.log(data);

  return (
    <div>
      <h1>Customer Details</h1>
      <p>ID: {data?.id}</p>
      <p>Email: {data?.email}</p>
      <p>Image: {data?.image}</p>
      <p>Name: {data?.name}</p>
    </div>
  )
}
