const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  conversationId: string;
  timestamp: Date;
  intent?: string;
  confidence?: number;
}

export interface ConversationHistory {
  conversationId: string;
  messages: ChatMessage[];
  timestamp: Date;
}

export class ChatApiService {
  private static async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout = 10000
  ): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  static async sendMessage(
    message: string,
    conversationId?: string,
    userId?: string
  ): Promise<ChatResponse> {
    try {
      const response = await this.fetchWithTimeout(
        `${API_BASE_URL}/api/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message,
            conversationId,
            userId
          })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send message');
      }

      const data = await response.json();
      return {
        ...data,
        timestamp: new Date(data.timestamp)
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  static async getConversationHistory(
    conversationId: string
  ): Promise<ConversationHistory> {
    try {
      const response = await this.fetchWithTimeout(
        `${API_BASE_URL}/api/chat/history/${conversationId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch conversation history');
      }

      const data = await response.json();
      return {
        ...data,
        messages: data.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })),
        timestamp: new Date(data.timestamp)
      };
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      throw error;
    }
  }

  static async clearConversation(conversationId: string): Promise<void> {
    try {
      const response = await this.fetchWithTimeout(
        `${API_BASE_URL}/api/chat/${conversationId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to clear conversation');
      }
    } catch (error) {
      console.error('Error clearing conversation:', error);
      throw error;
    }
  }

  static async checkHealth(): Promise<boolean> {
    try {
      const response = await this.fetchWithTimeout(
        `${API_BASE_URL}/health`,
        {
          method: 'GET'
        },
        5000
      );

      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}
