// 'use client';
// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// export default function AdminProducts() {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [products, setProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [imagePreview, setImagePreview] = useState('');

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');
  
//     if (!name || !price || !description) {
//       setError('الرجاء ملء جميع الحقول');
//       setLoading(false);
//       return;
//     }

//     // Basic URL validation
//     if (image && !isValidUrl(image)) {
//       setError('الرجاء إدخال رابط صحيح للصورة');
//       setLoading(false);
//       return;
//     }
  
//     try {
//       const res = await fetch('/api/products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           name, 
//           price: parseFloat(price) || 0, 
//           description,
//           image 
//         }),
//       });
  
//       if (!res.ok) throw new Error('فشل إضافة المنتج');
  
//       setSuccess('تم إضافة المنتج بنجاح');
//       resetForm();
//       await fetchProducts();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isValidUrl = (url) => {
//     try {
//       new URL(url);
//       return true;
//     } catch (_) {
//       return false;
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setName(product.name);
//     setPrice(product.price);
//     setImagePreview(product.image || '');
//     setDescription(product.description)
//   };

//   const handleDelete = async (id) => {
//     if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
//       try {
//         const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
//         if (!res.ok) throw new Error('فشل حذف المنتج');
//         setSuccess('تم حذف المنتج بنجاح');
//         await fetchProducts();
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   const resetForm = () => {
//     setName('');
//     setPrice('');
//     setImage('');
//     setImagePreview('');
//     setDescription('')
//     setEditingProduct(null);
//   };


//   return (
//     <div dir="rtl" className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">إدارة المنتجات</h1>

//         {/* Product Form */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">
//             {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
//           </h2>
          
//           {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
//           {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{success}</div>}

//           <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 mb-2">رابط صورة المنتج</label>
//           <input
//             type="url"
//             value={image}
//             onChange={(e) => {
//               setImage(e.target.value);
//               setImagePreview(e.target.value);
//             }}
//             className="w-full p-3 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500"
//             placeholder="https://example.com/image.jpg"
//             pattern="https?://.*"
//           />
//           {imagePreview && (
//             <div className="mt-2">
//               <img 
//                 src={imagePreview} 
//                 alt="Preview" 
//                 className="w-32 h-32 object-cover rounded-lg"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   setError('رابط الصورة غير صالح');
                  
//                 }}
                
//               />
//             </div>
//           )}
//         </div>

//             <div>
//               <label className="block text-gray-700 mb-2">اسم المنتج</label>
//               <input
//                 type="text"
//                 value={name ?? ""}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full p-3 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2">السعر (د.ج)</label>
//               <input
//                 type="number"
//                 value={price ?? ""}
//                 onChange={(e) => setPrice(e.target.value || "")}
//                 className="w-full p-3 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 step="0.01"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2">الوصف</label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="w-full p-3 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>


//             <div className="flex gap-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
//               >
//                 {loading ? 'جاري الحفظ...' : (editingProduct ? 'تحديث المنتج' : 'إضافة المنتج')}
//               </button>
//               {editingProduct && (
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
//                 >
//                   إلغاء
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>

//         {/* Products List */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">قائمة المنتجات</h2>
          
//           <div className="overflow-x-auto">
//             <table className="w-full">
            
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="px-4 py-3 text-right text-gray-600">الصورة</th>
//                 <th className="px-4 py-3 text-right text-gray-600">الاسم</th>
//                 <th className="px-4 py-3 text-right text-gray-600">السعر</th>
//                 <th className="px-4 py-3 text-right text-gray-600">الوصف</th>
//                 <th className="px-4 py-3 text-right text-gray-600">الإجراءات</th>
//               </tr>
//             </thead>

//             <tbody>
//               {products.map((product) => (
//                 <tr key={product.id} className="border-t border-gray-100">
//                   <td className="px-4 py-3">
//                     {product.image && (
//                       <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
//                     )}
//                   </td>
//                   <td className="px-4 py-3 text-gray-500">{product.name}</td>
//                   <td className="px-4 py-3 text-gray-500">{product.price} د.ج</td>
//                   <td className="px-4 py-3 text-gray-500">{product.description?.trim() || 'لا يوجد وصف'}</td>
//                   <td className="px-4 py-3 space-x-2">
//                     <button 
//                       onClick={() => handleEdit(product)}
//                       className="text-blue-600 hover:text-blue-700"
//                     >
//                       تعديل
//                     </button>
//                     <button 
//                       onClick={() => handleDelete(product.id)}
//                       className="text-red-600 hover:text-red-700"
//                     >
//                       حذف
//                     </button>
//                   </td>
//                 </tr> 
//               ))}
//             </tbody>



//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Import useRouter
import Image from 'next/image';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products'); // Default tab: products
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);
  const [loadingDeleteOrderId, setLoadingDeleteOrderId] = useState(null);
  const [loadingOrderStatus, setLoadingOrderStatus] = useState({});
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [success, setSuccess] = useState('');
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [stock, setStock] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [status, setStatus] = useState('pending');
  const [product, setProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // Orders State
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (activeTab === 'products') fetchProducts();
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError('فشل تحميل المنتجات');
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError('فشل تحميل الطلبات');
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleSubmit = async (e) => {
    if(editingProduct) {
      handleEditProduct(editingProduct);
    } else {
      e.preventDefault();
      setLoadingSubmit(true);
      setError('');
      setSuccess('');

      if (!name || !price || !description) {
        setError('الرجاء ملء جميع الحقول');
        setLoading(false);
        return;
      }

      if (image && !isValidUrl(image)) {
        setError('الرجاء إدخال رابط صحيح للصورة');
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            price: parseFloat(price) || 0,
            description,
            image,
          }),
        });

        if (!res.ok) throw new Error('فشل إضافة المنتج');

        setSuccess('تم إضافة المنتج بنجاح');
        resetForm();
        await fetchProducts();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingSubmit(false);
      }
    }
    
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image || '');
    setImagePreview(product.image || '')
    setDescription(product.description);
  };


  const handleEditProduct = async (product) => {
      setLoadingSubmit(true);
      try {
        const res = await fetch(`/api/products/${product.id}`, { 
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            price: parseFloat(price) || 0,
            description,
            image,
          }),
        });
  
        if (!res.ok) throw new Error('فشل تعديل المنتج');
  
        setSuccess('تم تعديل المنتج بنجاح');
        await fetchProducts();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingSubmit(false);
      }
    
  };
  

  const handleDelete = async (id) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setLoadingDeleteId(id);
      try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('فشل حذف المنتج');
        setSuccess('تم حذف المنتج بنجاح');
        await fetchProducts();
      } catch (err) {
        setError(err.message);
      }finally {
        setLoadingDeleteId(null)
      }
    }
  };

  const handleDeleteOrder = async (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      setLoadingDeleteOrderId(id);
      try {
        const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('فشل حذف الطلب');
        setSuccess('تم حذف الطلب بنجاح');
        await fetchOrders();
      } catch (err) {
        setError(err.message);
      }finally {
        setLoadingDeleteOrderId(null)
      }
    }
  };

  const handleOrderStatusChange = async (order, newStatus) => {
    setLoadingOrderStatus(prev => ({ ...prev, [order.id]: true }));
    try {
      // Update the status locally before sending it to the server
      setStatus(newStatus);
  
      // Send the updated status to the server
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: order.productId,
          fullName: order.fullName,
          phone: order.phone,
          wilaya: order.wilaya,
          address: order.address,
          status: newStatus, // Use the new status here
        }),
      });
  
      if (!res.ok) throw new Error('فشل تحديث حالة الطلب');
  
      // Refresh the orders list after successful update
      setSuccess('تم تحديث حالة الطلب بنجاح');
      await fetchOrders();
    } catch (err) {
      setError(err.message);
    }finally {
      setLoadingOrderStatus(prev => ({ ...prev, [order.id]: false }));
    }
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order); // Set the selected order for details
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null); // Clear the selected order
  };
  const handleTabClick = (tab) => setActiveTab(tab);

  const resetForm = () => {
    setName('');
    setPrice('');
    setImage('');
    setImagePreview('');
    setDescription('');
    setEditingProduct(null);
  };
  const router = useRouter();
  const handleSignOut = async () => {
    setLoadingLogout(true);
    try {
      // Call the logout API to clear the session cookie
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to log out');
      }

      // Redirect to the login page
      router.push('/login'); // Use the initialized router here
    } catch (error) {
      console.error('Error during logout:', error.message); // Log the error
      alert('Failed to log out. Please try again.'); // Notify the user
    } finally {
      setLoadingLogout(false);
    }
  };

  // Fetch product when selectedOrder changes
  useEffect(() => {
    if (selectedOrder?.productId) {
      getProductById(selectedOrder.productId).then(setProduct);
    } else {
      setProduct(null);
    }
  }, [selectedOrder?.productId]);

  return (
    <div dir="rtl" className="min-h-screen bg-wood-pattern">
      {/* Wood Texture Header */}
      <header className="bg-wood-dark text-beige-100 py-6 shadow-xl relative overflow-hidden border-b-4 border-wood-medium">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
              <div className="group relative transform transition-all duration-300 hover:scale-[1.02]">
              <Image
                  src={'/logoWhite.png'}
                  alt="Carpentry Logo"
                  width={50} // Further reduced size for smaller screens
                  height={50}
                  className="rounded-full border-2 border-beige-200 shadow-sm"
                />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold font-[Cairo] tracking-tight text-beige-100">
                لوحة تحكم الإدارة
              </h1>
            </div>

            <button
              onClick={handleSignOut}
              disabled={loadingLogout}
              className="px-6 py-3 bg-wood-medium text-beige-100 rounded-lg hover:bg-wood-dark transition-colors flex items-center gap-2"
            >
              {loadingLogout ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-beige-100" viewBox="0 0 24 24">
                    {/* spinner */}
                  </svg>
                  جاري تسجيل الخروج...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* icon */}
                  </svg>
                  تسجيل الخروج
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Tabs Navigation */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all ${
              activeTab === 'products'
                ? 'bg-wood-dark text-beige-100 shadow-lg'
                : 'bg-wood-medium text-beige-100 hover:bg-wood-dark'
            }`}
          >
            إدارة المنتجات
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all ${
              activeTab === 'orders'
                ? 'bg-wood-dark text-beige-100 shadow-lg'
                : 'bg-wood-medium text-beige-100 hover:bg-wood-dark'
            }`}
          >
            إدارة الطلبات
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="max-w-4xl mx-auto bg-beige-50 rounded-xl shadow-lg overflow-hidden border-4 border-wood-medium">
            {/* Product Form */}
            <div className="p-8 bg-wood-light">
              <h2 className="text-2xl font-bold text-wood-dark mb-6 border-b-2 border-wood-medium pb-2">
                {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Input */}
                  <div className="md:col-span-2">
                    <label className="block text-lg font-medium text-wood-dark mb-2">صورة المنتج</label>
                    <div className="relative w-full h-64 bg-beige-100 rounded-xl border-2 border-dashed border-wood-medium flex items-center justify-center">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <div className="text-center space-y-2">
                          <svg className="mx-auto w-12 h-12 text-wood-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm text-wood-medium">رابط الصورة</p>
                        </div>
                      )}
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => {
                          setImage(e.target.value);
                          setImagePreview(e.target.value);
                        }}
                        className="w-full px-4 py-3 border border-wood-medium text-wood-dark rounded-lg mt-2"
                        placeholder="أدخل رابط الصورة"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div>
                    <label className="block text-lg font-medium text-wood-dark mb-2">اسم المنتج</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-wood-medium text-wood-dark rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-wood-dark mb-2">السعر (د.ج)</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-3 border border-wood-medium text-wood-dark rounded-lg"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-lg font-medium text-wood-dark mb-2">الوصف</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 border border-wood-medium text-wood-dark rounded-lg h-32"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loadingSubmit}
                  className="w-full bg-wood-dark hover:bg-wood-medium text-beige-100 py-3 px-6 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loadingSubmit ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-beige-100" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      جاري الحفظ...
                    </>
                  ) : editingProduct ? 'حفظ التعديلات' : 'إضافة منتج'}
                </button>
              </form>
            </div>

            {/* Products Table */}
            {loadingProducts ? (
            <div className="p-8 text-center">جاري تحميل المنتجات...</div>
          ) :(
            <div className="p-8">
              <h3 className="text-2xl font-bold text-wood-dark mb-6 border-b-2 border-wood-medium pb-2">
                قائمة المنتجات ({products.length})
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-wood-medium text-beige-100">
                    <tr>
                      {['الصورة', 'الاسم', 'السعر', 'الوصف', 'الإجراءات'].map((header) => (
                        <th key={header} className="px-6 py-4 text-right text-lg font-semibold">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-wood-medium">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-beige-100 transition-colors">
                        <td className="px-6 py-4">
                          <div className="w-16 h-16 bg-beige-100 rounded-lg overflow-hidden">
                            {product.image && (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-lg text-wood-dark font-medium">{product.name}</td>
                        <td className="px-6 py-4 text-lg text-wood-dark">{product.price} د.ج</td>
                        <td className="px-6 py-4 text-wood-medium max-w-xs truncate">{product.description}</td>
                        <td className="px-6 py-4 space-x-4">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-wood-dark hover:text-wood-medium transition-colors"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                             {loadingDeleteId === product.id ? 'جاري الحذف...' : 'حذف'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="max-w-4xl mx-auto bg-beige-50 rounded-xl shadow-lg overflow-hidden border-4 border-wood-medium">
            {loadingOrders ? (
            <div className="p-8 text-center text-gray-600">جاري تحميل الطلبات...</div>
          ) : (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-wood-dark mb-6 border-b-2 border-wood-medium pb-2">
                قائمة الطلبات ({orders.length})
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-wood-medium text-beige-100">
                    <tr>
                      {['رقم الطلب', 'العميل', 'المبلغ', 'الحالة', 'الإجراءات'].map((header) => (
                        <th key={header} className="px-6 py-4 text-right text-lg font-semibold">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-wood-medium">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-beige-100 transition-colors">
                        <td className="px-6 py-4 text-lg text-wood-dark">#{order.id}</td>
                        <td className="px-6 py-4 text-lg text-wood-dark">{order.fullName}</td>
                        <td className="px-6 py-4 text-lg text-wood-dark">{order.totalMount} د.ج</td>
                        <td className="px-6 py-4">
                        <select
                          value={order.status}
                          disabled={loadingOrderStatus[order.id]}
                          onChange={(e) => handleOrderStatusChange(order, e.target.value)}
                          className="px-3 py-2 border border-wood-medium text-wood-dark rounded-lg bg-beige-100"
                        >
                          {loadingOrderStatus[order.id] ? (
                            <option>جاري التحديث...</option>
                          ) : (
                            ['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                              <option key={status} value={status} className="capitalize">
                                {status}
                              </option>
                            ))
                          )}
                        </select>

                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewOrderDetails(order)}
                            className="text-wood-dark hover:text-wood-medium transition-colors"
                          >
                            التفاصيل
                          </button>
                        </td>
                        <td className="px-6 py-4">
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              {loadingDeleteOrderId === order.id ? 'جاري الحذف...' : 'حذف'}
                            </button>
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-beige-100 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-4 border-wood-medium">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-wood-dark">
                    تفاصيل الطلب #{selectedOrder.id}
                  </h3>
                  <button
                    onClick={handleCloseOrderDetails}
                    className="text-wood-dark hover:text-wood-medium p-2 rounded-full"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-700">الاسم الكامل:</label>
                      <p className="font-medium text-gray-500">{selectedOrder.fullName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-700">رقم الهاتف:</label>
                      <p className="font-medium text-gray-500">{selectedOrder.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-700">الولاية:</label>
                      <p className="font-medium text-gray-500">{selectedOrder.wilaya}</p>
                    </div>
                  </div>
  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-700">العنوان:</label>
                      <p className="font-medium text-gray-500">{selectedOrder.address}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-700">طريقة الدفع:</label>
                      <p className="font-medium text-gray-500">{selectedOrder.paymentMethod}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-700">حالة الطلب:</label>
                      <p className="font-medium capitalize text-gray-500">{selectedOrder.status}</p>
                    </div>
                  </div>
  
                  <div className="md:col-span-2">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="text-lg font-semibold mb-4 text-gray-700">المنتجات المطلوبة</h4>
                      <div className="space-y-4">
                        { product ? (
                          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                            <div className="flex items-center gap-4">
                              <img
                                src={product?.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-medium text-gray-500">{product.name}</p>
                                <p className="text-sm text-gray-500">الكمية: {selectedOrder.quantity}</p>
                              </div>
                            </div>
                            <p className="text-blue-600">{selectedOrder.totalMount} د.ج</p>
                          </div>
                        ) : (<p className='text-gray-500'>تحميل...</p>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

async function getProductById(productId) {
  try {
    const response = await fetch(`/api/products/getproduct/${productId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch product");
    }

    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }
}

