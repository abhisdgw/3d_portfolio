export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
  userId?: string;
}

export interface ChatResponse {
  message: string;
  conversationId: string;
  timestamp: Date;
  intent?: string;
  confidence?: number;
}

export interface Conversation {
  id: string;
  userId?: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export enum Intent {
  GREETING = 'greeting',
  SUPPORT = 'support',
  BILLING = 'billing',
  TECHNICAL = 'technical',
  PRODUCT_INFO = 'product_info',
  COMPLAINT = 'complaint',
  FEEDBACK = 'feedback',
  FAREWELL = 'farewell',
  UNKNOWN = 'unknown'
}

export interface IntentResult {
  intent: Intent;
  confidence: number;
  entities?: Record<string, any>;
}
