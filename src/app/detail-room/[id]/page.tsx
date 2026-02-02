'use client';

import { useState, useEffect, use } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Wifi, Car, Camera, Home, Users, Shield, Clock, FileText, Bike, Snowflake, Bed, Armchair, Table, Shirt, Fan, ChefHat, Utensils, Archive, Droplets, Wind, CheckCircle, Ban, Toilet } from 'lucide-react';
import Link from 'next/link';

interface DetailRoomPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface RoomDetailResponse {
  success: boolean;
  data: {
    product: {
      id: number;
      name: string;
      address: string;
      distance_to_kariadi: string;
      whatsapp: string;
      description: string;
      facilities: string;
      google_maps_link: string;
      images: string;
      category: string;
    };
    detail: {
      id: number;
      product_id: number;
      room_name: string;
      price: string;
      status: string;
      available_rooms: number;
      facilities: Array<{
        header: string;
        items: string[];
      }>;
      description: string;
      images: string;
      is_active: number;
      created_at: string;
      updated_at: string;
    };
    list_another_rooms: Array<{
      id: number;
      product_id: number;
      room_name: string;
      price: string;
      status: string;
      available_rooms: number;
      facilities: Array<{
        header: string;
        items: string[];
      }>;
      description: string;
      images: string;
      is_active: number;
      created_at: string;
      updated_at: string;
    }>;
  };
  message: string;
  meta: any;
}

export default function DetailRoomPage({ params }: DetailRoomPageProps) {
  const [roomData, setRoomData] = useState<RoomDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  const { id } = use(params);
  const [kostId, roomId] = id.split('-').map(Number);

  useEffect(() => {
    if (isNaN(kostId) || isNaN(roomId)) {
      setLoading(false);
      return;
    }

    const fetchRoomDetail = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://cms.medikost.id/api/v1/'}products/${kostId}/details/${roomId}`);
        const data: RoomDetailResponse = await response.json();
        console.log('Room Detail Response:', data);
        setRoomData(data);
      } catch (error) {
        console.error('Failed to fetch room detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetail();
  }, [kostId, roomId]);

  const getIcon = (item: string) => {
    const lowerItem = item.toLowerCase();
    if (lowerItem.includes('wifi')) return <Wifi className="w-4 h-4" />;
    if (lowerItem.includes('mobil')) return <Car className="w-4 h-4" />;
    if (lowerItem.includes('motor') || lowerItem.includes('sepeda')) return <Bike className="w-4 h-4" />;
    if (lowerItem.includes('parkir')) return <Car className="w-4 h-4" />;
    if (lowerItem.includes('cctv') || lowerItem.includes('camera')) return <Camera className="w-4 h-4" />;
    if (lowerItem.includes('kost') || lowerItem.includes('rumah')) return <Home className="w-4 h-4" />;
    if (lowerItem.includes('tamu') || lowerItem.includes('pasutri')) return <Users className="w-4 h-4" />;
    if (lowerItem.includes('aman') || lowerItem.includes('keamanan')) return <Shield className="w-4 h-4" />;
    if (lowerItem.includes('waktu') || lowerItem.includes('jam') || lowerItem.includes('bulan')) return <Clock className="w-4 h-4" />;
    if (lowerItem.includes('ktp') || lowerItem.includes('sertakan')) return <FileText className="w-4 h-4" />;
    if (lowerItem.includes('ac') || lowerItem.includes('air conditioner') || lowerItem.includes('pendingin')) return <Snowflake className="w-4 h-4" />;
    if (lowerItem.includes('kipas') || lowerItem.includes('fan') || lowerItem.includes('angin')) return <Fan className="w-4 h-4" />;
    if (lowerItem.includes('kasur') || lowerItem.includes('bed') || lowerItem.includes('mattress') || lowerItem.includes('tempat tidur')) return <Bed className="w-4 h-4" />;
    if (lowerItem.includes('lemari') || lowerItem.includes('wardrobe') || lowerItem.includes('closet') || lowerItem.includes('almari')) return <Shirt className="w-4 h-4" />;
    if (lowerItem.includes('meja') || lowerItem.includes('table') || lowerItem.includes('desk')) return <Table className="w-4 h-4" />;
    if (lowerItem.includes('kursi') || lowerItem.includes('chair') || lowerItem.includes('bangku') || lowerItem.includes('stool')) return <Armchair className="w-4 h-4" />;
    if (lowerItem.includes('ruang makan') || lowerItem.includes('r. makan')) return <Utensils className="w-4 h-4" />;
    if (lowerItem.includes('dapur')) return <ChefHat className="w-4 h-4" />;
    if (lowerItem.includes('jemuran') || lowerItem.includes('jemur') || lowerItem.includes('r. jemur')) return <Wind className="w-4 h-4" />;
    if (lowerItem.includes('kulkas') || lowerItem.includes('refrigerator')) return <Archive className="w-4 h-4" />;
    if (lowerItem.includes('dispenser')) return <Droplets className="w-4 h-4" />;
    if (lowerItem.includes('maks') || lowerItem.includes('maximum') || lowerItem.includes('2 orang')) return <Users className="w-4 h-4" />;
    if (lowerItem.includes('piket') || lowerItem.includes('wajib')) return <CheckCircle className="w-4 h-4" />;
    if (lowerItem.includes('hewan') || lowerItem.includes('dilarang bawa')) return <Ban className="w-4 h-4" />;
    if (lowerItem.includes('kamar mandi dalam') || lowerItem.includes('bathroom')) return <Droplets className="w-4 h-4" />;
    if (lowerItem.includes('shower')) return <Droplets className="w-4 h-4" />;
    if (lowerItem.includes('kloset duduk') || lowerItem.includes('toilet')) return <Toilet className="w-4 h-4" />;
    if (lowerItem.includes('wastafel') || lowerItem.includes('cermin') || lowerItem.includes('sink')) return <Droplets className="w-4 h-4" />;
    if (lowerItem.includes('gantungan handuk') || lowerItem.includes('towel')) return <Shirt className="w-4 h-4" />;
    if (lowerItem.includes('ember') || lowerItem.includes('gayung') || lowerItem.includes('bucket')) return <Archive className="w-4 h-4" />;
    if (lowerItem.includes('dilarang merokok') || lowerItem.includes('no smoking')) return <Ban className="w-4 h-4" />;
    if (lowerItem.includes('menjaga kebersihan') || lowerItem.includes('kebersihan')) return <CheckCircle className="w-4 h-4" />;
    if (lowerItem.includes('kerusakan fasilitas') || lowerItem.includes('tanggung jawab')) return <Shield className="w-4 h-4" />;
    if (lowerItem.includes('lampu utama') || lowerItem.includes('lampu belajar') || lowerItem.includes('lampu')) return <Snowflake className="w-4 h-4" />;
    if (lowerItem.includes('tempat sampah') || lowerItem.includes('sampah')) return <Archive className="w-4 h-4" />;
    if (lowerItem.includes('rak sepatu') || lowerItem.includes('sepatu')) return <Shirt className="w-4 h-4" />;
    if (lowerItem.includes('luas kamar') || lowerItem.includes('meter')) return <Home className="w-4 h-4" />;
    if (lowerItem.includes('lantai keramik') || lowerItem.includes('lantai')) return <Table className="w-4 h-4" />;
    if (lowerItem.includes('jendela') || lowerItem.includes('ventilasi udara') || lowerItem.includes('ventilasi')) return <Wind className="w-4 h-4" />;
    if (lowerItem.includes('pintu') || lowerItem.includes('kunci pribadi') || lowerItem.includes('kunci')) return <Shield className="w-4 h-4" />;
    return <div className="w-4 h-4 bg-gray-300 rounded-full"></div>;
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

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
            <Skeleton className="w-full h-80 md:h-96 rounded-lg mb-4" />
            <div className="flex gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="w-20 h-20 md:w-24 md:h-24 rounded flex-shrink-0" />
              ))}
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <Skeleton className="h-6 w-32 mb-3" />
              <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <div className="md:col-span-4">
              <Skeleton className="h-6 w-24 mb-3" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isNaN(roomId) || !roomData?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Invalid room ID or data not found</p>
      </div>
    );
  }

  const { product, detail } = roomData.data;
  const roomImages = JSON.parse(detail.images || '[]');
  const productFacilities = JSON.parse(product.facilities || '[]');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{detail.room_name}</h1>
          <p className="text-lg text-gray-700 mb-1">{product.name}</p>
          <p className="text-base text-gray-600">{product.address}</p>
        </div>

        {/* Images Section */}
        <div className="mb-6">
          {roomImages.length > 0 && (
            <>
              {/* Main Image */}
              <div className="w-full mb-6">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://cms.medikost.id'}/storage/product-details/${roomImages[selectedImage]}`}
                  alt={`${detail.room_name} ${selectedImage + 1}`}
                  className="w-full h-80 md:h-96 object-cover rounded-lg border border-gray-200"
                />
              </div>
              {/* Thumbnail Strip */}
              {roomImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {roomImages.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://cms.medikost.id'}/storage/product-details/${image}`}
                      alt={`${detail.room_name} ${index + 1}`}
                      className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 flex-shrink-0 transition-all duration-200 ${selectedImage === index ? 'border-emerald-500 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description and Room Facilities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Deskripsi Kamar</h2>
              <div className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: detail.description }} />
            </div>

            {/* Room Facilities */}
            {detail.facilities && detail.facilities.length > 0 && (
              <div className="">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Fasilitas Kamar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detail.facilities.map((facility, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-4">
                      <h3 className="text-base font-medium mb-3 text-gray-700">{facility.header}</h3>
                      {facility.items.length > 0 ? (
                        <ul className="space-y-2">
                          {facility.items.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                              {getIcon(item)}
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">Tidak ada fasilitas</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Price, Status, and Product Facilities */}
          <div className="space-y-6">
            {/* Location and Distance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Lokasi & Jarak</h2>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-5 h-5 text-emerald-600">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="font-medium">{product.distance_to_kariadi} km dari RSUP Kariadi</span>
              </div>
            </div>

            {/* Room Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Informasi Kamar</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide">Harga per bulan</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    Rp {parseInt(detail.price).toLocaleString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide">Status</p>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                    detail.status === 'kosong' || detail.available_rooms > 0
                      ? 'bg-emerald-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {detail.status === 'kosong' || detail.available_rooms > 0 ? 'TERSEDIA' : 'HABIS'}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide">Kamar Tersedia</p>
                  <p className="text-lg font-medium text-gray-900">{detail.available_rooms} kamar</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Another Rooms Section */}
        {roomData.data.list_another_rooms && roomData.data.list_another_rooms.length > 0 && (
          <div className="mt-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tipe Kamar Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roomData.data.list_another_rooms.map((room, index) => (
                <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden flex flex-col">
                  {/* Image Section */}
                  {room.images && JSON.parse(room.images || '[]').length > 0 && (
                    <div className="relative overflow-hidden">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://cms.medikost.id'}/storage/product-details/${JSON.parse(room.images)[0]}`}
                        alt={`${room.room_name}`}
                        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Status Badge Overlay */}
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                        <div className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold shadow-lg ${
                          room.status === 'habis' || room.available_rooms === 0
                            ? 'bg-red-500 text-white'
                            : 'bg-emerald-500 text-white'
                        }`}>
                          {room.status === 'habis' || room.available_rooms === 0 ? 'HABIS' : 'TERSEDIA'}
                        </div>
                      </div>
                      {/* Available Rooms Badge */}
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                        <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium shadow-lg">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                          {room.available_rooms} Kamar
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-4 sm:p-6 flex flex-col flex-1">
                    <div className="flex-1">
                      {/* Room Name */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                        {room.room_name}
                      </h3>

                      {/* Facilities */}
                      {room.facilities && room.facilities.filter((facility: { header: string; items: string[] }) => facility.items.length > 0).flatMap((facility: { header: string; items: string[] }) => facility.items).slice(0, 3).length > 0 && (
                        <div className="mt-2 mb-4">
                          <div className="flex flex-wrap gap-2">
                            {room.facilities
                              .filter((facility: { header: string; items: string[] }) => facility.items.length > 0)
                              .flatMap((facility: { header: string; items: string[] }) => facility.items)
                              .slice(0, 3)
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
                              Rp {parseInt(room.price).toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="text-sm text-gray-600 leading-relaxed">
                        {(() => { const text = stripHtml(room.description); return text.length > 120 ? text.substring(0,120) + '...' : text; })()}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link 
                        href={`/detail-room/${room.id}`}
                        className="block w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-center"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Floating WhatsApp Button */}
        <a
          href={`https://wa.me/${product.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 group"
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