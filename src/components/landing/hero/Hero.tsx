'use client';

import { useEffect, useState } from 'react';
import { getProducts, ProductPagination, ApiResponse } from '../../../services/product/product.service';

interface HeroProps {
  productCount?: number;
  minPrice?: number | null;
}

const Hero = ({ productCount: initialCount = 0, minPrice: initialMinPrice = null }: HeroProps) => {
  const [productStats, setProductStats] = useState<{ count: number; minPrice: number | null }>({
    count: initialCount,
    minPrice: initialMinPrice,
  });

  useEffect(() => {
    // If data already provided from server, no need to fetch again
    if (initialCount > 0 || initialMinPrice !== null) return;

    const fetchProducts = async () => {
      try {
        const response: ApiResponse<ProductPagination> = await getProducts();
        const products = response.data.data;
        const count = products.length;
        const prices = products.map(p => p.starting_price).filter(p => p !== null) as number[];
        const minPrice = prices.length > 0 ? Math.min(...prices) : null;
        setProductStats({ count, minPrice });
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [initialCount, initialMinPrice]);

  return (
    <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-4 h-4">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-sm font-medium">Sekitar RSUP Kariadi, Semarang</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Kos Ideal Untuk<br />
            <span className="text-emerald-100">Mahasiswa/Koas/Residen</span><br />
            <span className="text-white">Sekitar Kariadi</span>
          </h1>
          <p className="text-lg sm:text-xl text-emerald-50 max-w-2xl mx-auto">
            Pilihan kos-kosan terbaik dengan lokasi strategis dekat RSUP Kariadi untuk mendukung pendidikan dan karir Anda
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="font-semibold">{productStats.count}</span> Kos Tersedia
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="font-semibold">Mulai dari</span> Rp {productStats.minPrice ? productStats.minPrice.toLocaleString('id-ID') : 'N/A'}/bulan
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;