import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo dan Deskripsi */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/images/medikost_logo.png" alt="Medikost Logo" width={40} height={40} className="h-10 w-auto" />
              <div>
                <h2 className="text-xl font-bold">Medikost.id</h2>
                <p className="text-sm text-gray-400">Feel yourself home</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Platform terpercaya untuk menemukan kos-kosan ideal bagi mahasiswa, koas, dan residen di sekitar RSUP Kariadi, Semarang.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Beranda</Link></li>
              <li><Link href="#listings" className="text-gray-300 hover:text-emerald-400 transition-colors">Daftar Kos</Link></li>
              <li><Link href="#about" className="text-gray-300 hover:text-emerald-400 transition-colors">Tentang</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: info@medikost.id</li>
              <li>Telepon: +62 123 456 7890</li>
              <li>Alamat: Semarang, Indonesia</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Medikost.id. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;