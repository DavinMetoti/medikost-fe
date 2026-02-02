'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Skeleton } from '../../components/ui/skeleton';

interface Product {
  id: number;
  name: string;
  address: string;
  starting_price: number | null;
  total_rooms: number;
  distance_to_kariadi: number;
  thumbnail: string;
  category: string;
  product_details: Array<{
    id: number;
    room_name: string;
    price: string;
    status: string;
    available_rooms: number;
  }>;
}

interface RoomResult {
  kostId: number;
  kostName: string;
  kostAddress: string;
  kostThumbnail: string;
  kostDistance: number;
  roomId: number;
  roomName: string;
  price: string;
  status: string;
  availableRooms: number;
}

interface SearchResponse {
  data: Product[];
  current_page: number;
  last_page: number;
  total: number;
}

interface ApiResponse {
  data: SearchResponse;
  message: string;
  success: boolean;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [roomResults, setRoomResults] = useState<RoomResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams(searchParams.toString());
      const queryString = params.toString();

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://cms.medikost.id/api/v1/'}search?${queryString}`);
        if (!response.ok) {
          throw new Error('Search failed');
        }
        const data: ApiResponse = await response.json();
        
        const kosts = data.data.data;
        const rooms: RoomResult[] = [];
        kosts.forEach(kost => {
          kost.product_details.forEach(room => {
            rooms.push({
              kostId: kost.id,
              kostName: kost.name,
              kostAddress: kost.address,
              kostThumbnail: kost.thumbnail,
              kostDistance: kost.distance_to_kariadi,
              roomId: room.id,
              roomName: room.room_name,
              price: room.price,
              status: room.status,
              availableRooms: room.available_rooms,
            });
          });
        });
        
        setRoomResults(rooms);
      } catch (err) {
        setError('Failed to search products');
        console.error(err);
        setRoomResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchParams]);

  const formatPrice = (price: number | null) => {
    if (!price) return 'N/A';
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const getImageUrl = (thumbnail: string) => {
    if (thumbnail.startsWith('/storage/')) {
      return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://cms.medikost.id'}${thumbnail}`;
    }
    return thumbnail;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <Skeleton className="w-full h-40" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-8 w-32 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/" className="text-emerald-600 hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Hasil Pencarian
          </h1>
          <p className="text-gray-600">
            Ditemukan {roomResults.length} kamar
          </p>
        </div>

        {roomResults.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Tidak ada kamar yang ditemukan</p>
            <Link href="/" className="text-emerald-600 hover:underline">
              Kembali ke Beranda
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomResults.map((room) => (
              <div key={room.roomId} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={getImageUrl(room.kostThumbnail)}
                    alt={room.kostName}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium shadow-lg">
                      <span>{room.availableRooms} Tersedia</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <div className="inline-flex items-center px-2 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold shadow-lg">
                      {room.status === 'kosong' ? 'Tersedia' : 'Terisi'}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                      {room.kostName} - {room.roomName}
                    </h3>
                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-1">Harga</p>
                      <p className="text-2xl font-bold text-emerald-600">
                        {formatPrice(parseFloat(room.price))}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {room.kostDistance} km dari RSUP Kariadi
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/detail-room/${room.kostId}-${room.roomId}`}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-center block"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Search() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}