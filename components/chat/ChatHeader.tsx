"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Bot {
  _id: string;
  name: string;
  description: string;
}

export default function ChatHeader({ botId }: { botId: string }) {
  const [bot, setBot] = useState<Bot | null>(null);

  useEffect(() => {
    const fetchBot = async () => {
      try {
        const response = await fetch(`/api/bots/${botId}`);
        if (!response.ok) throw new Error('Failed to fetch bot');
        const data = await response.json();
        setBot(data);
      } catch (error) {
        console.error('Error fetching bot:', error);
      }
    };

    fetchBot();
  }, [botId]);

  return (
    <div className="border-b bg-white p-4">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="rounded-full p-2 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h2 className="font-semibold">{bot?.name || 'Loading...'}</h2>
          <p className="text-sm text-gray-500">{bot?.description}</p>
        </div>
      </div>
    </div>
  );
}