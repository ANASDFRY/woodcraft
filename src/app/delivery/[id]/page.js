'use client';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import WilayaSelect from '@/components/WilayaSelect';
import { useState, useEffect } from 'react';
import Link from 'next/link';


export default function DeliveryPage() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const params = useParams();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState(null);
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const product = products.find(p => p.id === Number(params.id));

  // Shipping prices data
  const shippingPrices = [
    {"Wilaya": "Alger", "Prix_HT": 400.0},
    {"Wilaya": "Alger Express", "Prix_HT": 600.0},
    {"Wilaya": "Blida", "Prix_HT": 600.0},
    {"Wilaya": "Tipaza", "Prix_HT": 600.0},
    {"Wilaya": "Boumerdes", "Prix_HT": 600.0},
    {"Wilaya": "Bouira", "Prix_HT": 650.0},
    {"Wilaya": "Ain Defla", "Prix_HT": 800.0},
    {"Wilaya": "Medea", "Prix_HT": 750.0},
    {"Wilaya": "Chlef", "Prix_HT": 750.0},
    {"Wilaya": "Tissemsilt", "Prix_HT": 750.0},
    {"Wilaya": "Tiaret", "Prix_HT": 800.0},
    {"Wilaya": "Relizane", "Prix_HT": 800.0},
    {"Wilaya": "Mostaganem", "Prix_HT": 800.0},
    {"Wilaya": "Oran", "Prix_HT": 750.0},
    {"Wilaya": "Mascara", "Prix_HT": 800.0},
    {"Wilaya": "Ain Temouchent", "Prix_HT": 800.0},
    {"Wilaya": "Tlemcen", "Prix_HT": 800.0},
    {"Wilaya": "Tamanrasset", "Prix_HT": 1200.0},
    {"Wilaya": "Sidi Bel Abbes", "Prix_HT": 800.0},
    {"Wilaya": "Saida", "Prix_HT": 800.0},
    {"Wilaya": "El Oued", "Prix_HT": 900.0},
    {"Wilaya": "Biskra", "Prix_HT": 900.0},
    {"Wilaya": "Ouargla", "Prix_HT": 900.0},
    {"Wilaya": "El Mghaier", "Prix_HT": 900.0},
    {"Wilaya": "Ouled Djellal", "Prix_HT": 900.0},
    {"Wilaya": "El Meniaa", "Prix_HT": 950.0},
    {"Wilaya": "Timimoun", "Prix_HT": 1200.0},
    {"Wilaya": "Tizi Ouzou", "Prix_HT": 750.0},
    {"Wilaya": "Béjaïa", "Prix_HT": 750.0},
    {"Wilaya": "Jijel", "Prix_HT": 750.0},
    {"Wilaya": "Bordj Bou Arreridj", "Prix_HT": 750.0},
    {"Wilaya": "Sétif", "Prix_HT": 750.0},
    {"Wilaya": "Batna", "Prix_HT": 750.0},
    {"Wilaya": "Constantine", "Prix_HT": 800.0},
    {"Wilaya": "Guelma", "Prix_HT": 800.0},
    {"Wilaya": "M'Sila", "Prix_HT": 850.0},
    {"Wilaya": "Khenchela", "Prix_HT": 900.0},
    {"Wilaya": "Tbessa", "Prix_HT": 900.0},
    {"Wilaya": "Oum El Bouaghi", "Prix_HT": 800.0},
    {"Wilaya": "Mila", "Prix_HT": 750.0},
    {"Wilaya": "Skikda", "Prix_HT": 750.0},
    {"Wilaya": "Annaba", "Prix_HT": 800.0},
    {"Wilaya": "El Tarf", "Prix_HT": 800.0},
    {"Wilaya": "Souk Ahras", "Prix_HT": 800.0},
    {"Wilaya": "Laghouat", "Prix_HT": 900.0},
    {"Wilaya": "Ghardaia", "Prix_HT": 900.0},
    {"Wilaya": "Djelfa", "Prix_HT": 900.0},
    {"Wilaya": "Touggourt", "Prix_HT": 900.0},
    {"Wilaya": "Bechar", "Prix_HT": 1000.0},
    {"Wilaya": "El-Bayadh", "Prix_HT": 1000.0},
    {"Wilaya": "Naama", "Prix_HT": 1000.0},
    {"Wilaya": "Béni Abbes", "Prix_HT": 1100.0},
    {"Wilaya": "Adrar", "Prix_HT": 1200.0}
  ];

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

  const handleQuantity = (operation) => {
    setQuantity((prev) => (operation === 'increment' ? prev + 1 : prev > 1 ? prev - 1 : prev));
  };

  const handleOrder = async () => {
    if (!fullName || !phone || !selectedWilaya || !address) {
      setError('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          fullName,
          phone,
          wilaya: selectedWilaya.ar_name,
          address,
          totalMount: product.price * quantity + getShippingPrice(),
        }),
      });

      if (!res.ok) throw new Error('فشل في إتمام الطلب');

      router.push('/thankyou');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getShippingPrice = () => {
    if (!selectedWilaya) return 0;

    const shipping = shippingPrices.find(
      (item) =>
        item.Wilaya === selectedWilaya.name 
    );

    return shipping ? shipping.Prix_HT : 0;
  };

  if (!product) {
    return <div className="text-center py-8 text-xl text-gray-600">المنتج غير موجود</div>;
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white py-6 shadow-xl relative overflow-hidden">
        {/* Shine effect overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine transform -skew-x-12" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Home Button */}
            <Link 
              href="/" 
              className="flex items-center gap-2 group transition-transform hover:scale-105"
            >
              <svg 
                className="w-6 h-6 text-white/90 group-hover:text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
              <span className="text-sm font-medium hidden md:block opacity-90 group-hover:opacity-100">
                الصفحة الرئيسية
              </span>
            </Link>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
              {/* Logo Container */}
              <div className="group relative transform transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute -inset-1 rounded-full bg-white/15 blur-sm" />
                <Image
                  src={'/logoWhite.png'}
                  alt="App Icon"
                  width={60}
                  height={60}
                  className="rounded-lg border-2 border-white/15 shadow-md"
                  priority
                />
              </div>

              {/* Title */}
              <div className="text-center">
                <h1 className="text-2xl md:text-4xl font-bold font-[Cairo] tracking-tight">
                  إتمام عملية الشراء
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Product Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transform transition duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
              </div>

              <div className="flex-1 text-center md:text-right space-y-4">
                <h2 className="text-3xl font-bold text-gray-800 font-[Tajawal]">{product.name}</h2>
                <p className="text-blue-600 text-2xl font-bold mb-4">
                  {product.price.toLocaleString()} د.ج
                </p>
                
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <button 
                    onClick={() => handleQuantity('decrement')}
                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-2xl text-gray-500 font-medium w-8">{quantity}</span>
                  <button 
                    onClick={() => handleQuantity('increment')}
                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          

          {/* Shipping Form */}
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-8">معلومات التوصيل</h3>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="06/05XXXXXXXX"
                  pattern="[0]{1}[5-7]{1}[0-9]{8}"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">الولاية</label>
                <WilayaSelect
                  selectedWilaya={selectedWilaya}
                  setSelectedWilaya={setSelectedWilaya}
                  className="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">العنوان التفصيلي</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                  placeholder="الشارع، الحي، رقم المنزل"
                />
              </div>
            </div>

            {/* Enhanced Order Summary */}
            <div className="p-8 bg-blue-50/30 border-2 border-blue-100 rounded-xl mx-6 my-8">
              <div className="mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/>
                </svg>
                <h3 className="text-xl font-bold text-blue-700">ملخص الطلب</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-blue-50 shadow-sm">
                  <span className="text-gray-600">سعر المنتجات</span>
                  <span className="font-medium text-blue-600">{(product.price * quantity).toLocaleString()} د.ج</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-blue-50 shadow-sm">
                  <span className="text-gray-600">تكاليف الشحن</span>
                  <span className="font-medium text-blue-600">{getShippingPrice().toLocaleString()} د.ج</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-600 rounded-xl border border-blue-700 shadow-lg">
                  <span className="font-bold text-white">المجموع الكلي</span>
                  <span className="text-xl font-bold text-white">
                    {((product.price * quantity) + getShippingPrice()).toLocaleString()} د.ج
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOrder}
              disabled={isLoading}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  جاري تأكيد الطلب...
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  تأكيد الطلب الآن
                </span>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );

}