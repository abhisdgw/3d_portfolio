import { Router, Request, Response } from 'express';
import { CustomerCareAgent } from '../agent/customerCareAgent';
import { ChatRequest } from '../types';
import { ResponseFormatter } from '../utils/responseFormatter';
import { Logger } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const agent = new CustomerCareAgent();

// POST /api/chat - Send a message and get a response
router.post('/', async (req: Request, res: Response) => {
  try {
    const { message, conversationId, userId }: ChatRequest = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json(
        ResponseFormatter.formatError('Message is required')
      );
    }

    // Generate conversation ID if not provided
    const convId = conversationId || uuidv4();

    Logger.info(`Received chat message`, { conversationId: convId, userId });

    // Process message with agent
    const result = await agent.processMessage(convId, message, userId);

    // Format and send response
    const response = ResponseFormatter.formatResponse(
      result.response,
      convId,
      result.intent,
      result.confidence
    );

    res.json(response);
  } catch (error) {
    Logger.error('Error in chat endpoint', error);
    res.status(500).json(
      ResponseFormatter.formatError('An error occurred while processing your message')
    );
  }
});

// GET /api/chat/history/:conversationId - Get conversation history
router.get('/history/:conversationId', (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(400).json(
        ResponseFormatter.formatError('Conversation ID is required')
      );
    }

    const history = agent.getConversationHistory(conversationId);

    res.json({
      conversationId,
      messages: history,
      timestamp: new Date()
    });
  } catch (error) {
    Logger.error('Error fetching conversation history', error);
    res.status(500).json(
      ResponseFormatter.formatError('An error occurred while fetching conversation history')
    );
  }
});

// DELETE /api/chat/:conversationId - Clear a conversation
router.delete('/:conversationId', (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(400).json(
        ResponseFormatter.formatError('Conversation ID is required')
      );
    }

    const deleted = agent.clearConversation(conversationId);

    if (deleted) {
      res.json({
        message: 'Conversation cleared successfully',
        conversationId,
        timestamp: new Date()
      });
    } else {
      res.status(404).json(
        ResponseFormatter.formatError('Conversation not found')
      );
    }
  } catch (error) {
    Logger.error('Error clearing conversation', error);
    res.status(500).json(
      ResponseFormatter.formatError('An error occurred while clearing the conversation')
    );
  }
});

// GET /api/chat/conversations - Get all conversations (admin endpoint)
router.get('/conversations', (req: Request, res: Response) => {
  try {
    const conversations = agent.getAllConversations();

    res.json({
      conversations,
      count: conversations.length,
      timestamp: new Date()
    });
  } catch (error) {
    Logger.error('Error fetching all conversations', error);
    res.status(500).json(
      ResponseFormatter.formatError('An error occurred while fetching conversations')
    );
  }
});

export default router;
