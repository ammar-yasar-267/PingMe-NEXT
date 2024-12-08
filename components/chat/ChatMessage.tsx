interface MessageProps {
  message: {
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  };
}

export default function ChatMessage({ message }: MessageProps) {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isBot
            ? 'bg-white text-gray-800 shadow-sm'
            : 'bg-blue-500 text-white'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <span className="mt-1 block text-xs opacity-70">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}