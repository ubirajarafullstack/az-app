/* eslint-disable @next/next/no-img-element */
'use client';

import { useProductsShoes } from '@/app/data/useProductsShoes';

export default function Shoes() {

  const { data, isLoading, error } = useProductsShoes(1);

  if (isLoading) return <div>Loading...</div>
  if (error) console.log(error);

  console.log(data);

  return (
    <div>
      {data?.map((e, i) => {
        return (
          <ul key={i}>
            <li>{e.id}</li>
            <li>{e.department}</li>
            <li>{e.spirit}</li>
            <li>{e.productCategory}</li>
            <li>
              <ul>
                <li>{e.productType.id}</li>
                <li>{e.productType.brand}</li>
                <li>{e.productType.sizes.map((e, i) => {
                  return (
                    <span key={i}>{e}</span>
                  )
                })}
                </li>
                <li>{e.productType.colors.map((e, i) => {
                  return (
                    <span key={i} className='h-4 w-4 block'
                      style={{ background: e.hex }}></span>
                  )
                })}
                </li>
                <li>{e.productType.shoeCategory}</li>
                <li>{e.productType.gender}</li>
              </ul>
            </li>
            <li>{e.name}</li>
            <li>{e.slug}</li>
            <li>{e.rating}</li>
            <li>{e.name}</li>
            <li>{e.price}</li>
            <li>{e.description.html}</li>
            <li>{e.buttonType}</li>
            <li>{e.buttonLabel}</li>
            <li>{e.buttonLink}</li>
            <li>
              <ul>
                <li>{e.images.map((e, i) => {
                  return (
                    <img key={i} src={e.url} alt="" />
                  )
                })}
                </li>
                
              </ul>
            </li>
            <li>{e.highlights.html}</li>
            
          </ul>
        )
      })}
    </div>
  )
}
