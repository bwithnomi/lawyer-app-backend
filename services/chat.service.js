import ChatRequest from '../models/chat-requests.js';
import Message from '../models/message.js';
import Conversation from './../models/conversation.js'
import { ObjectId } from 'mongoose';

class ChatService {
  async createConversation(user, body) {
    try {

      let checkChat = await Conversation.findOne({
        $or: [
          {
            sender: user._id,
            receiver: body.receiver_id,
          },
          {
            sender: body.receiver_id,
            receiver: user._id,
          },
        ]
      }).populate('sender', '-password').populate('receiver', '-password').lean();
      if (checkChat) {
        return { success: true, data: checkChat };
      }

      let newConversation = new Conversation({
        sender: user._id,
        receiver: body.receiver_id,
      })
      const result = await newConversation.save();
      return { success: true, data: result.toObject() };
    } catch (error) {
      throw new Error(error)
    }
  }

  async getChat(user, body) {
    try {
      if (body.pagination_id) {
        var query = await Message.find({
          conversation: body.conversation_id,
          _id: { $lt: body.pagination_id },
        }).populate('sender').sort({ createdAt: -1 }).setOptions({ lean: true }).limit(3).exec();
      } else {
        var query = await Message.find({
          conversation: body.conversation_id,
        }).populate('sender').sort({ createdAt: -1 }).setOptions({ lean: true }).limit(3).exec();
      }
      return { success: true, data: query };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getConversations(user) {
    try {

      let getChat = await Conversation.find({
        $or: [
          {
            sender: user._id,
          },
          {
            receiver: user._id,
          },
        ]
      }).populate({ path: 'sender', match: { _id: { $ne: user._id } }, select: '-password' }).populate({ path: 'receiver', match: { _id: { $ne: user._id } }, select: '-password' }).sort({ createdAt: -1 }).lean();
      return { success: true, data: getChat };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRequests(user) {
    try {

      let getChat = await ChatRequest.find({
        status: "pending",
        $or: [
          {
            receiver: user._id,
          },
        ]
      }).populate({ path: 'sender', match: { _id: { $ne: user._id } }, select: '-password' }).populate({ path: 'receiver', match: { _id: { $ne: user._id } }, select: '-password' }).sort({ createdAt: -1 }).lean();
      return { success: true, data: getChat };
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveNewMessage(user, body) {
    try {

      let checkChat = await Conversation.findOne({
        $or: [
          {
            sender: user._id,
            receiver: body.receiver_id,
          },
          {
            sender: body.receiver_id,
            receiver: user._id,
          },
        ]
      }).lean();
      if (!checkChat) {
        let newConversation = new Conversation({
          sender: user._id,
          receiver: body.receiver_id,
        })
        checkChat = await newConversation.save();
      }

      const message = new Message({
        sender: user._id,
        conversation: checkChat._id,
        message: body.message,
      })
      const newMessage = await message.save();
      const result = await Message.findOne({ _id: newMessage._id }).populate('sender').lean();
      return { success: true, data: result };
    } catch (error) {
      throw new Error(error)
    }
  }

  async createChatRequest(user, body) {
    try {

      let checkChat = await ChatRequest.findOneAndUpdate({
        $or: [
          {
            sender: user._id,
            receiver: body.receiver_id,
          },
          {
            sender: body.receiver_id,
            receiver: user._id,
          },
        ]
      }, { $set: { status: "pending" } }).populate('sender', '-password').populate('receiver', '-password').lean();
      if (checkChat) {
        return { success: true, data: checkChat };
      }

      let newRequest = new ChatRequest({
        sender: user._id,
        receiver: body.receiver_id,
      })
      const result = await newRequest.save();
      return { success: true, data: result.toObject() };
    } catch (error) {
      throw new Error(error)
    }
  }

  async setRequestStatus(user, body) {
    try {
      let checkRequest = await ChatRequest.findOneAndUpdate({
        _id: body.request_id,
        receiver: user._id,
      }, { $set: { status: body.status } });
      if (body.status == 'accepted') {
        let checkChat = await Conversation.findOne({
          $or: [
            {
              sender: checkRequest.sender,
              receiver: checkRequest.receiver,
            },
            {
              sender: checkRequest.receiver,
              receiver: checkRequest.sender,
            },
          ]
        }).lean();
        if (!checkChat) {
          let newConversation = new Conversation({
            sender: checkRequest.sender,
            receiver: checkRequest.receiver,
          })
          await newConversation.save();
        }
      } else {
        await Conversation.deleteOne({
          $or: [
            {
              sender: checkRequest.sender,
              receiver: checkRequest.receiver,
            },
            {
              sender: checkRequest.receiver,
              receiver: checkRequest.sender,
            },
          ]
        }).lean();
      }
      return { success: true, data: checkRequest };
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default ChatService;