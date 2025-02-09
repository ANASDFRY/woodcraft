"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';


export default  function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError('فشل تحميل المنتجات');
    }
  };

  

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white py-6 shadow-xl relative overflow-hidden">
        {/* Shine effect overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine transform -skew-x-12" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Main Content */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
              {/* Logo Container */}
              <div className="group relative transform transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute -inset-1 rounded-full bg-white/15 blur-sm" />
                <Image
                  src={'/logoWhite.png'}
                  alt="App Logo"
                  width={60}
                  height={60}
                  className="rounded-lg border-2 border-white/15 shadow-md"
                  priority
                />
              </div>

              {/* Title */}
              <div className="text-center">
                <h1 className="text-2xl md:text-4xl font-bold font-[Cairo] tracking-tight">
                  Wood Craft
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          { products? products.map((product) => (
            <Link 
              key={product.id} 
              href={`/delivery/${product.id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-60">
                <Image
                  src={product.image ?? "oops.png"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-gray-800 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold text-lg">{product.price}</span>
                </div>
              </div>
            </Link>
          )): (<p>No product found</p>)}
        </div>
      </main>
    </div>
  );
}




