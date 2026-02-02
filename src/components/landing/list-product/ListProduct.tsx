'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts, Product, ApiResponse, ProductPagination } from '../../../services/product/product.service';

interface ListProductProps {
  initialProducts?: Product[];
}

const ListProduct = ({ initialProducts = [] }: ListProductProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);

  useEffect(() => {
    // If products already provided, no need to fetch
    if (initialProducts.length > 0) {
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const response: ApiResponse<ProductPagination> = await getProducts();
        setProducts(response.data.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [initialProducts]);

  const formatPrice = (price: number | null) => {
    if (!price) return 'N/A';
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const getImageUrl = (thumbnail: string) => {
    if (thumbnail.startsWith('/storage/')) {
      return `https://cms.medikost$.id/${thumbnail}`;
    }
    return thumbnail;
  };

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="listings">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Daftar Kos Tersedia</h2>
          <p className="text-gray-600">Memuat data kos...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="listings">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Daftar Kos Tersedia</h2>
        <p className="text-gray-600">{products.length} kos untuk mahasiswa kedokteran, koas, dan residen di sekitar RSUP Kariadi</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden bg-gray-200">
              <img
                src={getImageUrl(product.thumbnail)}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              {/* Placeholder for room count - since not in API, show distance or something */}
              <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-emerald-600 shadow-lg">
                {product.distance_to_kariadi} km
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  {/* Status Badge */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                      product.status === 'habis' || product.room_available === 0
                          ? 'bg-red-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}>
                      {product.status === 'habis' || product.room_available === 0 ? 'HABIS' : 'TERSEDIA'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-4 h-4 mr-1 flex-shrink-0">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span className="line-clamp-1">{product.address}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3 text-sm">
                {/* Placeholder for gender/type - not in API */}
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-3.5 h-3.5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Campur
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home w-3.5 h-3.5">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  {product.distance_to_kariadi} km ke Kariadi
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {product.facilities_preview.slice(0, 5).map((facility, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md">
                    {facility}
                  </span>
                ))}
                {product.facilities_preview.length > 5 && (
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md">
                    +{product.facilities_preview.length - 5} lainnya
                  </span>
                )}
              </div>
              <div className="border-t pt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Harga per bulan</p>
                  <p className="text-2xl font-bold text-emerald-600">{formatPrice(product.starting_price)}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`https://wa.me/${product.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle w-4 h-4">
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                    </svg>
                    <span>Hubungi</span>
                  </Link>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone w-3 h-3">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>Kontak: WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ListProduct;