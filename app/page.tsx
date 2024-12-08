import Link from 'next/link';
import { Bot } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Bot className="mx-auto h-16 w-16 text-blue-500" />
          <h1 className="mt-6 text-4xl font-bold sm:text-6xl">
            Bot Maker Platform
          </h1>
          <p className="mt-6 text-xl text-gray-300">
            Create and interact with AI-powered chatbots tailored to your needs
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/auth/signin"
              className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/bots"
              className="rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white hover:bg-gray-600 transition-colors"
            >
              Explore Bots
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}