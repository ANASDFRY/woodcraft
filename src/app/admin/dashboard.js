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


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products'); // Default tab: products
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError('فشل تحميل المنتجات');
    }
  };

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError('فشل تحميل الطلبات');
    }
  };

  const handleSubmit = async (e) => {
    if(editingProduct) {
      handleEditProduct(editingProduct)
    }else {
      e.preventDefault();
      setLoading(true);
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
        setLoading(false);
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
      }
    
  };
  

  const handleDelete = async (id) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('فشل حذف المنتج');
        setSuccess('تم حذف المنتج بنجاح');
        await fetchProducts();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleOrderStatusChange = async (order, newStatus) => {
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
    }
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order); // Set the selected order for details
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null); // Clear the selected order
  };


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
    <div dir="rtl" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header with Gradient Tabs */}
        <header className="bg-white rounded-xl shadow-lg p-4 mb-8 border border-gray-100">
          <div className="flex justify-between space-x-4 items-center">
            {/* Left Section: Tab Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2
                  ${
                    activeTab === 'products'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                إدارة المنتجات
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2
                  ${
                    activeTab === 'orders'
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                إدارة الطلبات
              </button>
            </div>

            {/* Right Section: Sign Out Button */}
            <button
              onClick={handleSignOut} // Add your sign-out handler here
              className="px-6 py-3 rounded-xl font-semibold text-sm bg-red-500 text-white hover:bg-red-600 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              تسجيل الخروج
            </button>
          </div>
        </header>
  
        {/* Products Tab */}
        {activeTab === 'products' && (
          <section className="space-y-8">
            {/* Product Form Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  {editingProduct ? '🖊️ تعديل المنتج' : '✨ إضافة منتج جديد'}
                </h2>
                <div className="flex gap-4">
                  {editingProduct && (
                    <button
                      onClick={resetForm}
                      className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      إلغاء التعديل
                    </button>
                  )}
                </div>
              </div>
  
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Upload Section */}
                <div className="space-y-6 md:col-span-2">
                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      صورة المنتج
                    </label>
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => {
                        setImage(e.target.value);
                        setImagePreview(e.target.value);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                    <div className="relative w-full h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors flex items-center justify-center">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <div className="text-center space-y-2">
                          <svg className="mx-auto w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm text-gray-500">اسحب الصورة هنا أو انقر للرفع</p>
                        </div>
                      )}
                      {/* <input
                        type="url"
                        value={image}
                        onChange={(e) => {
                          setImage(e.target.value);
                          setImagePreview(e.target.value);
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        placeholder="أو أدخل رابط الصورة"
                      /> */}
                    </div>
                  </div>
  
                  
                </div>
  
                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">اسم المنتج</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">السعر (د.ج)</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500"
                        step="0.01"
                        required
                      />
                      <span className="absolute left-3 top-3 text-gray-500">د.ج</span>
                    </div>
                  </div>
                </div>
  
                {/* Additional Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الوصف التفصيلي</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                      required
                    />
                  </div>
  
                 
                </div>
  
                {/* Form Actions */}
                <div className="md:col-span-2 border-t pt-8">
                  <div className="flex gap-4 justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                          </svg>
                          جاري الحفظ...
                        </>
                      ) : editingProduct ? (
                        '💾 حفظ التعديلات'
                      ) : (
                        '➕ إضافة منتج جديد'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
  
            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-800">قائمة المنتجات ({products.length})</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="بحث في المنتجات..."
                    className="px-4 py-2 border border-gray-300 rounded-lg w-64"
                  />
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                </div>
              </div>
  
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {['الصورة', 'الاسم', 'السعر', 'الوصف',  'الإجراءات'].map((header) => (
                        <th key={header} className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            {product.image && (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700 font-medium">{product.name}</td>
                        <td className="px-6 py-4 text-blue-600 font-medium">{product.price} د.ج</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                            {product.description}
                          </span>
                        </td>
                        
                        <td className="px-6 py-4 space-x-4">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
  
        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <section className="space-y-8">
            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-800">قائمة الطلبات ({orders.length})</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="بحث في الطلبات..."
                    className="px-4 py-2 border border-gray-300 rounded-lg w-64"
                  />
                  <select className="px-4 py-2 border border-gray-300 text-gray-500 rounded-lg">
                    <option value="all" className='text-gray-500'>جميع الحالات</option>
                    <option value="pending" className='text-gray-500'>قيد الانتظار</option>
                    <option value="processing" className='text-gray-500'>قيد المعالجة</option>
                    <option value="shipped" className='text-gray-500'>تم الشحن</option>
                    <option value="delivered" className='text-gray-500'>تم التسليم</option>
                  </select>
                </div>
              </div>
  
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {['رقم الطلب', 'العميل', 'المبلغ', 'الحالة', 'رقم الهاتف', 'الإجراءات'].map((header) => (
                        <th key={header} className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-gray-600 font-mono">#{order.id}</td>
                        <td className="px-6 py-4 text-gray-700">{order.fullName}</td>
                        <td className="px-6 py-4 text-blue-600 font-medium">{order.totalMount} د.ج</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2  rounded-full   ${
                              order.status === 'delivered' ? 'bg-green-500' :
                              order.status === 'shipped' ? 'bg-blue-500' :
                              order.status === 'processing' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}></span>
                            <span className="capitalize text-gray-500">{order.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{order.phone}</td>
                        <td className="px-6 py-4 space-x-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleOrderStatusChange(order, e.target.value)}
                            className="px-3 py-1 border border-gray-300  text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="pending" className='text-gray-500'>قيد الانتظار</option>
                            <option value="processing" className='text-gray-500'>قيد المعالجة</option>
                            <option value="shipped" className='text-gray-500'>تم الشحن</option>
                            <option value="delivered" className='text-gray-500'>تم التسليم</option>
                            <option value="cancelled" className='text-gray-500'>ملغي</option>
                          </select>
                          <button
                            onClick={() => handleViewOrderDetails(order)}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            التفاصيل
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
  
        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">
                    تفاصيل الطلب #{selectedOrder.id}
                  </h3>
                  <button
                    onClick={handleCloseOrderDetails}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
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
                        ) : (<p>Loading...</p>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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

