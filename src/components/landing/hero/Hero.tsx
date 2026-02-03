'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProducts, ProductPagination, ApiResponse } from '../../../services/product/product.service';
import { Search } from 'lucide-react';

interface HeroProps {
  productCount?: number;
  minPrice?: number | null;
}

interface SearchResult {
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
  data: SearchResult[];
  current_page: number;
  last_page: number;
  total: number;
}

interface RoomSearchResponse {
  rooms: RoomResult[];
  total: number;
}

const Hero = ({ productCount: initialCount = 0, minPrice: initialMinPrice = null }: HeroProps) => {
  const [productStats, setProductStats] = useState<{ count: number; minPrice: number | null }>({
    count: initialCount,
    minPrice: initialMinPrice,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [roomResults, setRoomResults] = useState<RoomResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchLoading(true);

    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());

    console.log('Search params:', params.toString());

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://cms.medikost.id/api/v1/'}search?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: { data: SearchResponse } = await response.json();
      console.log('Search response:', data);
      
      // Check if response has expected structure
      if (!data.data || !data.data.data || !Array.isArray(data.data.data)) {
        console.error('Unexpected response structure:', data);
        setRoomResults([]);
        setTotalResults(0);
        setSearchLoading(false);
        return;
      }
      
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
      
      console.log('Processed rooms:', rooms);
      setRoomResults(rooms);
      setTotalResults(rooms.length);
      setSearchLoading(false);
    } catch (error) {
      console.error('Search failed:', error);
      setRoomResults([]);
      setTotalResults(0);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    // If data already provided from server, no need to fetch again
    if (initialCount > 0 || initialMinPrice !== null) return;

    const fetchProducts = async () => {
      try {
        const response: ApiResponse<ProductPagination> = await getProducts();
        const products = response.data.data;
        // Count only products with status "kosong" (available)
        const availableProducts = products.filter(p => p.status === 'kosong');
        const count = availableProducts.reduce((sum, p) => sum + p.total_rooms, 0);
        const prices = availableProducts.map(p => p.starting_price).filter(p => p !== null) as number[];
        const minPrice = prices.length > 0 ? Math.min(...prices) : null;
        setProductStats({ count, minPrice });
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [initialCount, initialMinPrice]);

  return (
    <div id="hero" className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white">
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

        {/* Search Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-emerald-600 font-bold py-2 px-4 rounded-xl hover:bg-emerald-50 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3 mx-auto text-lg"
          >
            <Search className="w-6 h-6" />
            Cari Kos Sekarang
          </button>
        </div>
      </div>

      {/* Search Results Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-blur bg-opacity-10 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-8 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Cari Kos</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[75vh]">
              {/* Search Form */}
              <form onSubmit={handleSearch} className="mb-8">
                {/* Main Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-emerald-600" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nama kos atau alamat..."
                      className="w-full pl-12 pr-4 py-2 text-lg rounded-2xl border-2 border-emerald-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 focus:bg-white transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={searchLoading}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-2 px-4 rounded-xl hover:scale-105 disabled:hover:scale-100 transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center gap-2 mx-auto"
                  >
                    {searchLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Mencari...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Cari Kos
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Search Results */}
              {searchLoading ? (
                <div className="border-t border-gray-200 pt-8">
                  <div className="mb-6 text-sm text-gray-600">
                    Mencari kamar...
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex gap-3">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 animate-pulse"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3"></div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : roomResults.length > 0 ? (
                <>
                  <div className="border-t border-gray-200 pt-8">
                    <div className="mb-6 text-sm text-gray-600">
                      Menampilkan {roomResults.slice(0, 6).length} dari {totalResults} kamar
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {roomResults.slice(0, 6).map((room) => (
                        <div key={room.roomId} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex gap-3">
                            <img
                              src={room.kostThumbnail.startsWith('/storage/') ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://cms.medikost.id'}${room.kostThumbnail}` : room.kostThumbnail}
                              alt={room.kostName}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">{room.kostName} - {room.roomName}</h3>
                              <p className="text-sm text-gray-600 truncate">{room.kostAddress}</p>
                              <p className="text-sm text-emerald-600 font-medium">
                                Rp {parseFloat(room.price).toLocaleString('id-ID')}
                              </p>
                              <p className="text-xs text-gray-500">{room.kostDistance} km dari Kariadi</p>
                              <p className="text-xs text-gray-500">{room.availableRooms} kamar tersedia</p>
                            </div>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={() => {
                                setShowModal(false);
                                router.push(`/detail-room/${room.kostId}-${room.roomId}`);
                              }}
                              className="flex-1 bg-emerald-600 text-white text-sm py-2 px-3 rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                              Lihat Detail
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {totalResults > 6 && (
                      <div className="mt-6 text-center">
                        <button
                          onClick={() => {
                            setShowModal(false);
                            const params = new URLSearchParams();
                            if (searchQuery.trim()) params.set('q', searchQuery.trim());
                            router.push(`/search?${params.toString()}`);
                          }}
                          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        >
                          Lihat Semua Hasil ({totalResults})
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;