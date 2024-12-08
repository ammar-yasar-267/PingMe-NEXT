'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChatRooms() {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchChatRooms = async () => {
    try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        if (!token) throw new Error("User is not authenticated");

        const res = await fetch("http://localhost:5000/api/chatter/chat-rooms", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw new Error("Failed to fetch chat rooms");
        
        const data = await res.json();
        setRooms(data);
        setError(null);
    } catch (error) {
        console.error("Error fetching chat rooms:", error);
        setError("Unable to load chat rooms");
        setRooms([]);
    } finally {
        setIsLoadingRooms(false);
    }
};


  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Unable to load users");
      setUsers([]);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchChatRooms();
    fetchUsers();
  }, []);

  const handleRoomClick = (roomId) => {
    router.push(`/chat/${roomId}`);
  };

  const handleAddRoom = async () => {
    if (!roomName.trim()) {
      setError("Room name cannot be empty");
      return;
    }

    if (selectedParticipants.length === 0) {
      setError("Please select at least one participant");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/chatter/chat-rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: roomName,
          participants: selectedParticipants,
        }),
      });

      if (!response.ok) {
        throw new Error("Error creating chat room");
      }

      const newRoom = await response.json();
      setRooms((prevRooms) =>
        Array.isArray(prevRooms) ? [...prevRooms, newRoom] : [newRoom]
      );
      setRoomName("");
      setSelectedParticipants([]);
      setError(null);
    } catch (error) {
      console.error("Error creating chat room:", error);
      setError("Failed to create chat room");
    }
  };

  const handleParticipantChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedIds = selectedOptions.map((option) => option.value);
    setSelectedParticipants(selectedIds);
  };

  if (isLoadingRooms && isLoadingUsers) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-pulse">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01B12 12h.01M12 12v4.01M12 12h.01" />
            </svg>
          </div>
          <p className="mt-4 text-gray-400">Loading chat rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="border-b border-gray-700 pb-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Chat Rooms</h1>
          {error && (
            <div className="bg-red-600 text-white p-3 rounded mt-4">
              {error}
            </div>
          )}
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <section className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-200">Create a New Chat Room</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Room Name"
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <select
                  multiple
                  value={selectedParticipants}
                  onChange={handleParticipantChange}
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  size={5}
                >
                  {isLoadingUsers ? (
                    <option disabled>Loading users...</option>
                  ) : Array.isArray(users) && users.length > 0 ? (
                    users.map((user) => (
                      <option 
                        key={user._id} 
                        value={user._id}
                        className="hover:bg-gray-600"
                      >
                        {user.name} ({user.email})
                      </option>
                    ))
                  ) : (
                    <option disabled>No users available</option>
                  )}
                </select>
                <button
                  onClick={handleAddRoom}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded transition-colors"
                >
                  Create Chat Room
                </button>
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-200">Your Chat Rooms</h2>
              {rooms.length > 0 ? (
                <div className="space-y-4">
                  {rooms.map((room) => (
                    <div
                      key={room._id}
                      onClick={() => handleRoomClick(room._id)}
                      className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-gray-100">{room.name}</h3>
                          <p className="text-gray-400 text-sm">
                            Participants: {room.participants?.length || 0}
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
        </div>
      </div>
    </div>
  );
}