export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'botMaker';
  createdAt: string;
}

export interface Bot {
  _id: string;
  name: string;
  description: string;
  creator: User;
  trainingData: string;
  category: string;
  isActive: boolean;
  createdAt: string;
}

export interface Chat {
  _id: string;
  user: User;
  bot: Bot;
  messages: Message[];
  startedAt: string;
  endedAt?: string;
}

export interface Message {
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
}