// "use client";
// import { signIn } from "../lib/auth";

// export default function LoginPage() {
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     await signIn("credentials", {
//       email: formData.get("email"),
//       password: formData.get("password"),
//       redirect: false
//     });
//   };

//   return (
//     <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
//         <h2 className="text-3xl font-bold text-center">تسجيل الدخول</h2>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
//             <input
//               name="email"
//               type="email"
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2">كلمة المرور</label>
//             <input
//               name="password"
//               type="password"
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
//           >
//             تسجيل الدخول
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// app/login/page.js

// import { getServerSession } from 'next-auth';
// import { authOptions } from '../api/auth/[...nextauth]/route';

// export default async function LoginPage() {
//   const session = await getServerSession(authOptions);

//   if (session) {
//     return <div>You are already logged in.</div>;
//   }

//   return (
//     <form action="/api/auth/signin/credentials" method="POST">
//       <input name="username" type="text" placeholder="Username" />
//       <input name="password" type="password" placeholder="Password" />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// app/login/page.js
'use client'
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      window.location.href = '/admin'; // Redirect to admin dashboard on success
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">تسجيل الدخول</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
            <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
            <input
                name="email"
                type="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
                className="w-full p-3 border text-gray-500 border-gray-300 rounded-lg"
            />
            </div>
            <div>
            <label className="block text-gray-700 mb-2">كلمة المرور</label>
            <input
                name="password"
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                className="w-full p-3 border text-gray-500 border-gray-300 rounded-lg"
            />
            </div>
            <button
            type="submit"
            className="w-full bg-blue-600 text-white  py-3 px-6 rounded-lg hover:bg-blue-700"
            >
            تسجيل الدخول
            </button>
        </form>
        </div>
    </div>
  );
}