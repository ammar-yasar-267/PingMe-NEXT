'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem("userId", data.user.id); // Save userId in localStorage
      localStorage.setItem("token", data.token);   // Save token in localStorage
      router.push("/dashboard"); // Replace with your desired page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 bg-gray-700 rounded" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full p-2 bg-gray-700 rounded" />
        <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 p-2 rounded">Login</button>
        <p className="text-center">Don&apos;t have an account? <a href="/register" className="text-cyan-400 hover:underline">Register</a></p>
      </form>
    </div>
  );
}
