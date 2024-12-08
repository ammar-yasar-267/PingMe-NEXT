import mongoose from 'mongoose';

const botSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a bot name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a bot description'],
  },
  context: {
    type: String,
    required: [true, 'Please provide bot context information'],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Bot || mongoose.model('Bot', botSchema);