import Trust from '@/components/design/aboutpage/Trust';
import { Banner } from '@/components/design/Banner';
import Categories from '@/components/design/Categories';
import Choose from '@/components/design/Choose';
import FlashSale from '@/components/design/FlashSale';
import News from '@/components/design/News';
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
            <Choose />
         <News />
            <ScrollToTop />
        </div>
    );
}