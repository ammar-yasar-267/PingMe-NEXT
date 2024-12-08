'use client';

import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert("Registration successful!");
        // Redirect to login page after registration
        router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded space-y-4">
        <h1 className="text-2xl font-bold">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 bg-gray-700 rounded" />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 bg-gray-700 rounded" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full p-2 bg-gray-700 rounded" />
        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full p-2 bg-gray-700 rounded" />
        <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 p-2 rounded">Register</button>
      </form>
    </div>
  );
}
