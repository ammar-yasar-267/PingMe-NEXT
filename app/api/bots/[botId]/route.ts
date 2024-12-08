import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Bot from '@/models/bot.model';

export async function GET(
  request: Request,
  { params }: { params: { botId: string } }
) {
  try {
    await connectDB();
    const bot = await Bot.findById(params.botId).populate('creator', 'name email');
    
    if (!bot) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }

    return NextResponse.json(bot);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bot' }, { status: 500 });
  }
}