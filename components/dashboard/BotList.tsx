"use client";

import { useEffect, useState } from 'react';
import { MessageSquare, Users } from 'lucide-react';
import Link from 'next/link';

interface Bot {
  _id: string;
  name: string;
  description: string;
  creator: {
    name: string;
    email: string;
  };
  chats: string[];
  createdAt: string;
}

export default function BotList() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch('/api/bots');
        if (!response.ok) throw new Error('Failed to fetch bots');
        const data = await response.json();
        setBots(data);
      } catch (error) {
        console.error('Error fetching bots:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBots();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (bots.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No bots available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bots.map((bot) => (
        <div
          key={bot._id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">{bot.name}</h3>
          <p className="text-gray-600 mb-4">{bot.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{bot.creator.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{bot.chats.length} chats</span>
            </div>
          </div>

          <Link
            href={`/chat/${bot._id}`}
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Chat with Bot
          </Link>
        </div>
      ))}
    </div>
  );
}