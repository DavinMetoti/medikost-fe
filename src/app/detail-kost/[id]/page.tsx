'use client';

import { getProductById, ApiResponse, ProductDetail } from '../../../services/product/product.service';
import { useState, useEffect, use } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Wifi, Car, Camera, Home, Users, Shield, Clock, FileText, Bike, Snowflake, Bed, Armchair, Table, Shirt, Fan } from 'lucide-react';

interface DetailKostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function DetailKostPage({ params }: DetailKostPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = use(params);
  const productId = parseInt(id);

  useEffect(() => {
    if (isNaN(productId)) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response: ApiResponse<ProductDetail> = await getProductById(productId);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Header Skeleton */}
          <div className="mb-6">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          {/* Images Skeleton */}
          <div className="mb-6">
            {/* Main Image Skeleton */}
            <Skeleton className="w-full h-80 md:h-96 rounded-lg mb-4" />
            {/* Thumbnail Strip Skeleton */}
            <div className="flex gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="w-20 h-20 md:w-24 md:h-24 rounded flex-shrink-0" />
              ))}
            </div>
          </div>

          {/* Description and Facilities Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            {/* Description Skeleton */}
            <div className="md:col-span-8">
              <Skeleton className="h-6 w-32 mb-3" />
              <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Room Details Skeleton */}
              <div className="mt-6">
                <Skeleton className="h-6 w-40 mb-3" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                      {/* Image Skeleton */}
                      <Skeleton className="w-full h-40" />
                      <div className="p-6">
                        {/* Room Name */}
                        <Skeleton className="h-6 w-3/4 mb-3" />
                        {/* Badges */}
                        <div className="flex gap-2 mb-4">
                          <Skeleton className="h-6 w-20 rounded-lg" />
                          <Skeleton className="h-6 w-24 rounded-lg" />
                        </div>
                        {/* Price */}
                        <Skeleton className="h-8 w-32 mb-4" />
                        {/* Description */}
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                        {/* Button */}
                        <Skeleton className="h-10 w-full mt-4 rounded-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Facilities Skeleton */}
            <div className="md:col-span-4">
              <Skeleton className="h-6 w-24 mb-3" />
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-white border rounded-lg p-3">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isNaN(productId)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Invalid product ID</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const getIcon = (item: string) => {
    const lowerItem = item.toLowerCase();
    if (lowerItem.includes('wifi')) return <Wifi className="w-4 h-4" />;
    if (lowerItem.includes('mobil')) return <Car className="w-4 h-4" />;
    if (lowerItem.includes('motor') || lowerItem.includes('sepeda')) return <Bike className="w-4 h-4" />;
    if (lowerItem.includes('parkir')) return <Car className="w-4 h-4" />; // Default parkir
    if (lowerItem.includes('cctv') || lowerItem.includes('camera')) return <Camera className="w-4 h-4" />;
    if (lowerItem.includes('kost') || lowerItem.includes('rumah')) return <Home className="w-4 h-4" />;
    if (lowerItem.includes('tamu') || lowerItem.includes('pasutri')) return <Users className="w-4 h-4" />;
    if (lowerItem.includes('aman') || lowerItem.includes('keamanan')) return <Shield className="w-4 h-4" />;
    if (lowerItem.includes('waktu') || lowerItem.includes('jam') || lowerItem.includes('bulan')) return <Clock className="w-4 h-4" />;
    if (lowerItem.includes('ktp') || lowerItem.includes('sertakan')) return <FileText className="w-4 h-4" />;
    // AC and cooling
    if (lowerItem.includes('ac') || lowerItem.includes('air conditioner') || lowerItem.includes('pendingin')) return <Snowflake className="w-4 h-4" />;
    // Fan
    if (lowerItem.includes('kipas') || lowerItem.includes('fan') || lowerItem.includes('angin')) return <Fan className="w-4 h-4" />;
    // Bed and mattress
    if (lowerItem.includes('kasur') || lowerItem.includes('bed') || lowerItem.includes('mattress') || lowerItem.includes('tempat tidur')) return <Bed className="w-4 h-4" />;
    // Wardrobe and closet
    if (lowerItem.includes('lemari') || lowerItem.includes('wardrobe') || lowerItem.includes('closet') || lowerItem.includes('almari')) return <Shirt className="w-4 h-4" />;
    // Table
    if (lowerItem.includes('meja') || lowerItem.includes('table') || lowerItem.includes('desk')) return <Table className="w-4 h-4" />;
    // Chair and seating
    if (lowerItem.includes('kursi') || lowerItem.includes('chair') || lowerItem.includes('bangku') || lowerItem.includes('stool')) return <Armchair className="w-4 h-4" />;
    return <div className="w-4 h-4 bg-gray-300 rounded-full"></div>; // Default
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>
          <p className="text-sm text-gray-600">{product.address}</p>
        </div>

        {/* Images */}
        <div className="mb-6">
          {/* Main Image */}
          <div className="w-full mb-4">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://cms.medikost.id'}/storage/products/${product.images[selectedImage]}`}
              alt={`${product.name} main`}
              className="w-full h-80 md:h-120 object-cover rounded-lg border"
            />
          </div>
          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://cms.medikost.id'}/storage/products/${image}`}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded cursor-pointer border-2 flex-shrink-0 ${selectedImage === index ? 'border-emerald-500' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Description and Facilities */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          {/* Description */}
          <div className="md:col-span-8">
            <div className="">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">Deskripsi</h2>
              <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>

            {/* Detail Kamar */}
            {product.product_details && product.product_details.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">Daftar Kamar</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.product_details.map((detail, index) => (
                    <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                      {/* Image Section */}
                      {detail.images && detail.images.length > 0 && (
                        <div className="relative overflow-hidden">
                          <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://cms.medikost.id'}/storage/product-details/${detail.images[0]}`}
                            alt={`${detail.room_name}`}
                            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Status Badge Overlay */}
                          <div className="absolute top-3 right-3">
                            <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                              detail.status === 'habis' || detail.available_rooms === 0
                                ? 'bg-red-500 text-white'
                                : 'bg-emerald-500 text-white'
                            }`}>
                              {detail.status === 'habis' || detail.available_rooms === 0 ? 'HABIS' : 'TERSEDIA'}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="p-6">
                        {/* Room Name */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                          {detail.room_name}
                        </h3>

                        {/* Room Info Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                            <Users className="w-4 h-4" />
                            {detail.available_rooms} Kamar
                          </span>
                        </div>

                        {/* Facilities */}
                        {detail.facilities && detail.facilities.filter((facility: { header: string; items: string[] }) => facility.items.length > 0).slice(0, 3).length > 0 && (
                          <div className="mt-2">
                            <div className="flex flex-wrap gap-2">
                              {detail.facilities
                                .filter((facility: { header: string; items: string[] }) => facility.items.length > 0)
                                .slice(0, 3)
                                .flatMap((facility: { header: string; items: string[] }) => facility.items)
                                .map((item: string, i: number) => (
                                  <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-md text-xs text-gray-600">
                                    {getIcon(item)}
                                    <span>{item}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {/* Price Section */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-600 mb-1 font-medium">Harga per bulan</p>
                              <p className="text-2xl font-bold text-emerald-600">
                                Rp {parseInt(detail.price).toLocaleString('id-ID')}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="text-sm text-gray-600 leading-relaxed">
                          {truncateText(stripHtml(detail.description), 120)}
                        </div>

                        {/* Action Button */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                            Lihat Detail
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Facilities */}
          <div className="md:col-span-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Fasilitas</h2>
            <div className="grid grid-cols-1 gap-3">
              {product.facilities.map((facility, index) => (
                <div key={index} className="bg-white border rounded-lg p-3">
                  <h3 className="text-sm font-medium mb-2 text-gray-700">{facility.header}</h3>
                  <ul className="space-y-1">
                    {facility.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        {getIcon(item)}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating WhatsApp Button */}
        <a
          href={`https://wa.me/${product.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group"
          aria-label="Hubungi via WhatsApp"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Hubungi Pemilik
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </a>

      </div>
    </div>
  );
}