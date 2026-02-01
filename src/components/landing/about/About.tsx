import { MapPin, ShieldCheck, DollarSign } from 'lucide-react';

const About = () => {
  return (
    <section className="bg-white py-16 mt-12" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tentang Medikost.id</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Medikost.id adalah platform pencarian kos-kosan yang didedikasikan khusus untuk mahasiswa kedokteran, koas, dan residen di sekitar RSUP Kariadi, Semarang. Kami memahami kebutuhan spesifik Anda akan tempat tinggal yang nyaman, aman, dan strategis.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Lokasi Strategis</h3>
            <p className="text-gray-600">Semua kos berada dekat dengan RSUP Kariadi untuk memudahkan mobilitas Anda</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Terverifikasi</h3>
            <p className="text-gray-600">Setiap listing telah diverifikasi untuk memastikan kualitas dan keamanan</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Harga Terjangkau</h3>
            <p className="text-gray-600">Berbagai pilihan harga yang sesuai dengan budget mahasiswa dan tenaga kesehatan</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;