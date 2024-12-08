import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Chat from '@/models/chat.model';
import Bot from '@/models/bot.model';
import { getServerSession } from 'next-auth';
import { createChatBot, generateBotResponse } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { botId, message } = await req.json();
    
    await connectDB();
    
    const bot = await Bot.findById(botId);
    if (!bot) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }

    let chat = await Chat.findOne({
      user: session.user.id,
      bot: botId,
    });

    if (!chat) {
      chat = await Chat.create({
        user: session.user.id,
        bot: botId,
        messages: [],
      });
    }

    const botInstance = await createChatBot(bot.context);
    const botResponse = await generateBotResponse(botInstance, message);

    chat.messages.push(
      { content: message, sender: 'user' },
      { content: botResponse, sender: 'bot' }
    );
    await chat.save();

    return NextResponse.json({
      message: botResponse,
      chatId: chat._id,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 });
  }
}