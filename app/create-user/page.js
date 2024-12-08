'use client';

import { useState } from "react";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("chatter"); // Default role
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/users/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create user");
      }

      const data = await response.json();
      setMessage(`User ${data.name} created successfully!`);
      setName("");
      setEmail("");
      setRole("chatter");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Create a New User</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
            className="w-full p-2 bg-gray-700 rounded text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email"
            className="w-full p-2 bg-gray-700 rounded text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-white"
            required
          >
            <option value="chatter">Chatter</option>
            <option value="developer">Developer</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded"
        >
          Create User
        </button>
      </form>

      {message && (
        <p className="mt-4 p-2 bg-gray-700 rounded text-cyan-400">{message}</p>
      )}
    </div>
  );
}
