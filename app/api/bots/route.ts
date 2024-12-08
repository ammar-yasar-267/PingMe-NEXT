import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Bot from '@/models/bot.model';
import { getServerSession } from 'next-auth';

export async function GET() {
  try {
    await connectDB();
    const bots = await Bot.find().populate('creator', 'name email');
    return NextResponse.json(bots);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bots' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user || session.user.role !== 'bot_maker') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, context } = await req.json();
    
    await connectDB();
    
    const bot = await Bot.create({
      name,
      description,
      context,
      creator: session.user.id,
    });

    return NextResponse.json(bot);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create bot' }, { status: 500 });
  }
}