import Link from 'next/link';
import { Button } from './components/ui/Button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl text-center">
        <h1 className="mb-6 text-6xl font-bold">
          Welcome to <span className="text-blue-600">PingMe</span>
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          Chat with AI-powered bots and explore endless possibilities of
          conversation
        </p>
        <div className="space-x-4">
          <Link href="/login">
            <Button size="lg">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="lg">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}