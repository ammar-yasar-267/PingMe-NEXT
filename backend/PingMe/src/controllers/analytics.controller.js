const Chat = require('../models/chat.model');

exports.getBotAnalytics = async (req, res) => {
  try {
    const { botId } = req.params;
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

    const dailyChats = await Chat.aggregate([
      {
        $match: {
          bot: mongoose.Types.ObjectId(botId),
          startedAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$startedAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json(dailyChats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserAnalytics = async (req, res) => {
  try {
    const chats = await Chat.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(req.user._id)
        }
      },
      {
        $group: {
          _id: "$bot",
          totalChats: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "bots",
          localField: "_id",
          foreignField: "_id",
          as: "botInfo"
        }
      }
    ]);

    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};