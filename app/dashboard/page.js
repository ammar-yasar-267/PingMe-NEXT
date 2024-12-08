'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch("http://localhost:5000/api/auth/user", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const { user, chatRooms } = await response.json();
        setUser(user);
        setChatRooms(chatRooms);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include", // Keep this for cookie-based sessions
      });
  
      if (response.ok) {
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        // More detailed error logging
        const errorText = await response.text();
        console.error("Logout failed:", response.status, errorText);
        // Optionally show an error to the user
      }
    } catch (error) {
      console.error("Error logging out:", error);
      // Optionally show an error to the user
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-pulse">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01B12 12h-4.01M12 12v4.01M12 12h.01" />
            </svg>
          </div>
          <p className="mt-4 text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl text-red-500 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-400">{error}</p>
          <button 
            onClick={() => router.push("/login")}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center border-b border-gray-700 pb-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user?.name}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition-colors"
          >
            Logout
          </button>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <section className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-200">Your Profile</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="font-semibold">{user?.email}</p>
                </div>
                <div>
                  <p className="text-gray-400">Role</p>
                  <p className="font-semibold">{user?.role}</p>
                </div>
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-200">Your Chat Rooms</h2>
              {chatRooms.length > 0 ? (
                <div className="space-y-4">
                  {chatRooms.map((room) => (
                    <div
                      key={room._id}
                      onClick={() => router.push(`/chat/${room._id}`)}
                      className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-gray-100">{room.name}</h3>
                          <p className="text-gray-400 text-sm">
                            Participants: {room.participants.map((p) => p.name).join(", ")}
                          </p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-gray-400">No chat rooms available</p>
                </div>
              )}
            </section>
          </div>

          <div>
            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-200">Quick Actions</h2>
              <div className="space-y-4">
                <Link href="/chat">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors">
                  Create New Chat Room
                </button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}