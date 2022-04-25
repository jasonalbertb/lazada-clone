import React from 'react'
import {AddStoreForm} from "./AddStoreForm";
import {AddProducts} from "./AddProducts";
import {AddCategory } from "./AddCategory";
import {AddBrands} from "./AddBrands";
import { AddLazMall } from "./AddLazMall";
import {AddVouchers} from "./AddVouchers";
const Seed = () => {
  return (
    <div className='p-4'>
      <AddBrands />
      <AddCategory />
      <AddStoreForm />
      <AddProducts />
      <AddLazMall />
      <AddVouchers />
      <div className='h-screen'></div>
    </div>
  )
}

export default Seed