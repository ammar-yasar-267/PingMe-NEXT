import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import BotList from '@/components/dashboard/BotList';
import CreateBotButton from '@/components/dashboard/CreateBotButton';

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Bot Maker Dashboard</h1>
        {session.user.role === 'bot_maker' && <CreateBotButton />}
      </div>
      <BotList />
    </div>
  );
}