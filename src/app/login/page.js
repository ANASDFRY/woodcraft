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
"use client";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        window.location.href = "/admin"; // Redirect to admin dashboard on success
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    } finally {
      setLoading(false); // Reset loading to false after the process completes
    }
  };

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-wood-light">
      {/* Header Section */}
      <header className="w-full bg-wood-dark text-beige-100 py-4 shadow-md fixed top-0 left-0 z-50 border-b-2 border-wood-medium">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="group relative transform transition-all duration-300 hover:scale-[1.02]">
              <Image
                src={"/logoWhite.png"} // Update with your carpentry logo
                alt="Carpentry Logo"
                width={60}
                height={60}
                className="rounded-full border-2 border-beige-200 shadow-sm"
              />
            </div>
            <h1 className="text-lg md:text-xl font-bold font-[Cairo] tracking-tight text-beige-100">
              Wood Craft
            </h1>
          </div>
        </div>
      </header>

      {/* Login Form Section */}
      <div className="max-w-md w-full space-y-8 p-8 bg-beige-50 rounded-lg shadow-lg mt-24">
        <h2 className="text-3xl font-bold text-center text-wood-dark">تسجيل الدخول</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2 text-wood-dark">
              البريد الإلكتروني
            </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border text-gray-500 border-wood-medium rounded-lg bg-beige-100"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 text-wood-dark">
              كلمة المرور
            </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border text-gray-500 border-wood-medium rounded-lg bg-beige-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full py-3 px-6 rounded-lg transition-colors ${
              loading
                ? "bg-gray-300 cursor-not-allowed" // Grayed out when loading
                : "bg-wood-dark text-beige-100 hover:bg-wood-medium" // Normal state
            }`}
          >
            {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"} {/* Show loading text */}
          </button>
        </form>
      </div>
    </div>
  );
}