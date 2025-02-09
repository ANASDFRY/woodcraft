// app/thankyou/page.js
"use client"
export default function ThankYouPage() {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <h1 className="text-3xl font-bold text-green-600 mb-4">شكراً لطلبك!</h1>
          <p className="text-gray-700 mb-6">
            سنقوم بالتواصل معك قريباً لتأكيد تفاصيل الطلب.
          </p>
          <button
            onClick={() => window.location.href = '/'} // Redirect back to home
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </div>
      </div>
    );
  }

  