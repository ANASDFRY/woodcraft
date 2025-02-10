// "use client"
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';


// export default  function Home() {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch('/api/products');
//       const data = await res.json();
//       setProducts(data);
//     } catch (err) {
//       setError('فشل تحميل المنتجات');
//     }
//   };

  

//   return (
//     <div dir="rtl" className="min-h-screen bg-gray-50">
//       <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white py-6 shadow-xl relative overflow-hidden">
//         {/* Shine effect overlay */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine transform -skew-x-12" />
//         </div>

//         <div className="container mx-auto px-4 relative z-10">
//           <div className="flex items-center justify-between">
//             {/* Main Content */}
//             <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
//               {/* Logo Container */}
//               <div className="group relative transform transition-all duration-300 hover:scale-[1.02]">
//                 <div className="absolute -inset-1 rounded-full bg-white/15 blur-sm" />
//                 <Image
//                   src={'/logoWhite.png'}
//                   alt="App Logo"
//                   width={60}
//                   height={60}
//                   className="rounded-lg border-2 border-white/15 shadow-md"
//                   priority
//                 />
//               </div>

//               {/* Title */}
//               <div className="text-center">
//                 <h1 className="text-2xl md:text-4xl font-bold font-[Cairo] tracking-tight">
//                   Wood Craft
//                 </h1>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           { products? products.map((product) => (
//             <Link 
//               key={product.id} 
//               href={`/delivery/${product.id}`}
//               className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
//             >
//               <div className="relative h-60">
//                 <Image
//                   src={product.image ?? "oops.png"}
//                   alt={product.name}
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 />
//               </div>
//               <div className="p-6">
//                 <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
//                 <p className="text-gray-800 text-sm mb-4">{product.description}</p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-blue-600 font-bold text-lg">{product.price}</span>
//                 </div>
//               </div>
//             </Link>
//           )): (<p>No product found</p>)}
//         </div>
//       </main>
//     </div>
//   );
// }
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
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
      console.error('Failed to load products:', err);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white-coffee"> {/* Use custom color */}
      {/* Updated Wood-themed Header */}
      <header className="bg-wood-dark text-beige-100 py-3 sm:py-4 shadow-md relative overflow-hidden border-b-2 border-wood-medium">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex lex-row-reverse flex-col md:flex-row items-center gap-2 md:gap-3">
              <div className="group relative transform transition-all duration-300 hover:scale-[1.02]">
                <Image
                  src={'/logoWhite.png'}
                  alt="Carpentry Logo"
                  width={50} // Further reduced size for smaller screens
                  height={50}
                  className="rounded-full border-2 border-beige-200 shadow-sm"
                />
              </div>
              <h1 className="text-lg md:text-xl font-bold font-[Cairo] tracking-tight text-beige-100">
                WoodCraft
              </h1>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? products.map((product) => (
            <Link 
              key={product.id} 
              href={`/delivery/${product.id}`}
              className="group bg-beige-50 rounded-xl shadow-lg overflow-hidden border-4 border-wood-medium transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative h-72 w-full bg-wood-pattern bg-cover bg-center"> {/* Wood texture background */}
                {/* Semi-transparent overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-wood-dark/10 to-transparent"></div>
                
                <Image
                  src={product.image ?? "/placeholder-wood.jpg"}
                  alt={product.name}
                  fill
                  className="object-contain transform transition duration-500 group-hover:scale-105" // Reduced hover scale
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  unoptimized={true}
                  style={{
                    padding: '1rem', // Creates space between image and wood background
                    objectPosition: 'center center'
                  }}
                />
              </div>
              {/* Product Details */}
              <div className="p-6 bg-wood-light">
                <h2 className="text-xl font-bold text-wood-dark font-[Tajawal] mb-3">
                  {product.name}
                </h2>
                <p className="text-wood-medium text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="bg-wood-medium px-4 py-2 rounded-lg">
                    <span className="text-beige-100 font-bold text-lg">
                      {product.price.toLocaleString()} د.ج
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )) : (
            <div className="col-span-full text-center py-12">
              <p className="text-wood-dark text-xl font-[Cairo]">جاري تحميل المنتجات...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}