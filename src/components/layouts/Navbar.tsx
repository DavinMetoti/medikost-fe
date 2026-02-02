import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Image src="/images/medikost_logo.png" alt="Medikost Logo" width={48} height={48} className="h-12 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Medikost.id</h1>
              <p className="text-xs text-gray-500 italic">Feel yourself home</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">Home</Link>
            <Link href="#hero" className="text-gray-700 hover:text-emerald-600 transition-colors">Beranda</Link>
            <Link href="#listings" className="text-gray-700 hover:text-emerald-600 transition-colors">Daftar Kos</Link>
            <Link href="#about" className="text-gray-700 hover:text-emerald-600 transition-colors">Tentang</Link>
          </nav>
          <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart w-5 h-5">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
            <span className="hidden sm:inline">Favorit</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;