"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import CreateBotModal from './CreateBotModal';

export default function CreateBotButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Plus className="h-5 w-5" />
        Create New Bot
      </button>
      <CreateBotModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}