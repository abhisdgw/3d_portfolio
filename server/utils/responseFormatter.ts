import { ChatResponse } from '../types';

export class ResponseFormatter {
  static formatResponse(
    message: string,
    conversationId: string,
    intent?: string,
    confidence?: number
  ): ChatResponse {
    return {
      message,
      conversationId,
      timestamp: new Date(),
      intent,
      confidence
    };
  }

  static formatError(error: string): { error: string; timestamp: Date } {
    return {
      error,
      timestamp: new Date()
    };
  }
}
