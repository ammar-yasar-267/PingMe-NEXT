const express = require('express');
const router = express.Router();
const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');
const User = require('../models/User');

// Get all available chat rooms
router.get('/chat-rooms', async (req, res) => {
    try {
        const chatRooms = await ChatRoom.find().populate('members', 'username');
        res.status(200).json(chatRooms);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving chat rooms' });
    }
});

// Send a message
router.post('/messages', async (req, res) => {
    const { chatRoomId, senderId, content } = req.body;

    try {
        const message = new Message({
            chatRoom: chatRoomId,
            sender: senderId,
            content,
        });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
});

// Get message history for a specific chat room
router.get('/chat-rooms/:chatRoomId/messages', async (req, res) => {
    const { chatRoomId } = req.params;

    try {
        const messages = await Message.find({ chatRoom: chatRoomId })
            .populate('sender', 'username avatar') // Populate sender details
            .sort({ timestamp: 1 }); // Sort by oldest to newest
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving messages' });
    }
});

// Get user profile details
router.get('/users/:userId/profile', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId, 'username avatar');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving profile' });
    }
});


// Update profile (username or avatar)
router.put('/users/:userId/profile', async (req, res) => {
    const { userId } = req.params;
    const { username, avatar } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, avatar },
            { new: true, runValidators: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error updating profile' });
    }
});

module.exports = router;