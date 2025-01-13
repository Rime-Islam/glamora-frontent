import Trust from '@/components/design/aboutpage/Trust';
import { Banner } from '@/components/design/Banner';
import Categories from '@/components/design/Categories';
import FlashSale from '@/components/design/FlashSale';
import ScrollToTop from '@/components/design/ScrollToTop';
import VendorProducts from '@/components/design/VendorProducts';
import React from 'react';


export default function Home() {
    return (
        <div>
           <div className=' mt-[16vh]'>
           <Banner />

           </div>
           <Trust />
            <FlashSale />
            <Categories />
            
            <VendorProducts />
            
         
            <ScrollToTop />
        </div>
    );
}