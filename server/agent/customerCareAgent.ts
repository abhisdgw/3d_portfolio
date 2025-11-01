import { Intent, IntentResult, Message, Conversation } from '../types';
import { Logger } from '../utils/logger';

export class CustomerCareAgent {
  private conversations: Map<string, Conversation> = new Map();
  private knowledgeBase: Map<string, string[]> = new Map();

  constructor() {
    this.initializeKnowledgeBase();
  }

  private initializeKnowledgeBase(): void {
    // Initialize knowledge base with common customer care responses
    this.knowledgeBase.set(Intent.GREETING, [
      "Hello! Welcome to our customer care service. How can I assist you today?",
      "Hi there! I'm here to help. What can I do for you?",
      "Greetings! How may I help you today?",
      "Welcome! I'm your customer care assistant. What brings you here today?"
    ]);

    this.knowledgeBase.set(Intent.SUPPORT, [
      "I'd be happy to help you with that. Could you please provide more details about the issue you're experiencing?",
      "I understand you need support. Let me assist you with that. Can you describe the problem in more detail?",
      "I'm here to help resolve your issue. Please share more information so I can provide the best solution.",
      "Thank you for reaching out. I'll do my best to help. What specific support do you need?"
    ]);

    this.knowledgeBase.set(Intent.BILLING, [
      "I can help you with billing inquiries. What specific billing question do you have?",
      "For billing matters, I'm here to assist. Could you please specify your billing concern?",
      "I understand you have a billing question. Let me help you with that. What would you like to know?",
      "Regarding billing, I can provide information about payments, invoices, and charges. What do you need help with?"
    ]);

    this.knowledgeBase.set(Intent.TECHNICAL, [
      "I can assist with technical issues. What technical problem are you experiencing?",
      "Let me help you troubleshoot this technical issue. Can you describe what's happening?",
      "I'm here to help with technical support. Please provide details about the technical difficulty you're facing.",
      "For technical assistance, I'll need some information. What seems to be the technical problem?"
    ]);

    this.knowledgeBase.set(Intent.PRODUCT_INFO, [
      "I'd be happy to provide information about our products and services. What would you like to know?",
      "I can help you learn more about our offerings. Which product or service are you interested in?",
      "Let me share information about our products. What specific details are you looking for?",
      "I'm here to answer your questions about our products and services. How can I help?"
    ]);

    this.knowledgeBase.set(Intent.COMPLAINT, [
      "I sincerely apologize for any inconvenience. Your feedback is important to us. Please tell me more about your concern.",
      "I'm sorry to hear about your experience. I want to help resolve this. Can you provide more details?",
      "Thank you for bringing this to our attention. I apologize for the issue. Let me see how I can help.",
      "I understand your frustration and I'm here to help. Please share more details so I can address your concern properly."
    ]);

    this.knowledgeBase.set(Intent.FEEDBACK, [
      "Thank you for your feedback! We truly appreciate your input. Is there anything specific you'd like to share?",
      "We value your feedback! Please tell me more about your experience.",
      "Your feedback helps us improve. Thank you for taking the time to share. What would you like to tell us?",
      "I appreciate you sharing your thoughts. Your feedback is important to us. Please continue."
    ]);

    this.knowledgeBase.set(Intent.FAREWELL, [
      "Thank you for contacting us! Have a great day!",
      "You're welcome! Feel free to reach out anytime. Take care!",
      "Glad I could help! Don't hesitate to contact us again if you need anything.",
      "Thank you for chatting with us. Have a wonderful day!"
    ]);

    this.knowledgeBase.set(Intent.UNKNOWN, [
      "I'm not quite sure I understand. Could you please rephrase or provide more details?",
      "I want to make sure I help you correctly. Could you elaborate on what you need?",
      "I'm here to help, but I need a bit more information. Can you explain what you're looking for?",
      "Let me make sure I understand your request. Could you provide more context?"
    ]);
  }

  private detectIntent(message: string): IntentResult {
    const lowerMessage = message.toLowerCase();
    
    // Greeting patterns
    const greetingPatterns = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
    if (greetingPatterns.some(pattern => lowerMessage.includes(pattern))) {
      return { intent: Intent.GREETING, confidence: 0.9 };
    }

    // Farewell patterns
    const farewellPatterns = ['bye', 'goodbye', 'see you', 'thanks', 'thank you', 'that\'s all'];
    if (farewellPatterns.some(pattern => lowerMessage.includes(pattern)) && lowerMessage.length < 50) {
      return { intent: Intent.FAREWELL, confidence: 0.85 };
    }

    // Billing patterns
    const billingPatterns = ['bill', 'invoice', 'payment', 'charge', 'refund', 'subscription', 'pricing', 'cost'];
    if (billingPatterns.some(pattern => lowerMessage.includes(pattern))) {
      return { intent: Intent.BILLING, confidence: 0.88 };
    }

    // Technical patterns
    const technicalPatterns = ['error', 'bug', 'not working', 'broken', 'crash', 'issue', 'problem', 'technical', 'fix'];
    if (technicalPatterns.some(pattern => lowerMessage.includes(pattern))) {
      return { intent: Intent.TECHNICAL, confidence: 0.87 };
    }

    // Complaint patterns
    const complaintPatterns = ['complaint', 'disappointed', 'unhappy', 'frustrated', 'angry', 'terrible', 'awful', 'worst'];
    if (complaintPatterns.some(pattern => lowerMessage.includes(pattern))) {
      return { intent: Intent.COMPLAINT, confidence: 0.9 };
    }

    // Feedback patterns
    const feedbackPatterns = ['feedback', 'suggestion', 'recommend', 'improve', 'feature request'];
    if (feedbackPatterns.some(pattern => lowerMessage.includes(pattern))) {
      return { intent: Intent.FEEDBACK, confidence: 0.86 };
    }

    // Product info patterns
    const productPatterns = ['product', 'service', 'feature', 'what is', 'tell me about', 'information', 'details'];
    if (productPatterns.some(pattern => lowerMessage.includes(pattern))) {
      return { intent: Intent.PRODUCT_INFO, confidence: 0.82 };
    }

    // Support patterns (general help)
    const supportPatterns = ['help', 'support', 'assist', 'need', 'how to', 'can you', 'question'];
    if (supportPatterns.some(pattern => lowerMessage.includes(pattern))) {
      return { intent: Intent.SUPPORT, confidence: 0.8 };
    }

    return { intent: Intent.UNKNOWN, confidence: 0.5 };
  }

  private generateResponse(intent: Intent, userMessage: string, conversationHistory: Message[]): string {
    const responses = this.knowledgeBase.get(intent) || this.knowledgeBase.get(Intent.UNKNOWN)!;
    
    // Select a random response from the knowledge base
    const baseResponse = responses[Math.floor(Math.random() * responses.length)];

    // Add context-aware enhancements
    if (conversationHistory.length > 2) {
      // For ongoing conversations, add continuity
      const contextualPrefixes = [
        "I see. ",
        "Understood. ",
        "Got it. ",
        ""
      ];
      const prefix = contextualPrefixes[Math.floor(Math.random() * contextualPrefixes.length)];
      return prefix + baseResponse;
    }

    return baseResponse;
  }

  public async processMessage(
    conversationId: string,
    userMessage: string,
    userId?: string
  ): Promise<{ response: string; intent: string; confidence: number }> {
    try {
      Logger.info(`Processing message for conversation: ${conversationId}`);

      // Get or create conversation
      let conversation = this.conversations.get(conversationId);
      if (!conversation) {
        conversation = {
          id: conversationId,
          userId,
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date()
        };
        this.conversations.set(conversationId, conversation);
      }

      // Add user message to conversation
      const userMsg: Message = {
        id: `msg_${Date.now()}_user`,
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      };
      conversation.messages.push(userMsg);

      // Detect intent
      const intentResult = this.detectIntent(userMessage);
      Logger.debug('Intent detected', { intent: intentResult.intent, confidence: intentResult.confidence });

      // Generate response
      const response = this.generateResponse(intentResult.intent, userMessage, conversation.messages);

      // Add assistant message to conversation
      const assistantMsg: Message = {
        id: `msg_${Date.now()}_assistant`,
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      conversation.messages.push(assistantMsg);

      // Update conversation timestamp
      conversation.updatedAt = new Date();

      return {
        response,
        intent: intentResult.intent,
        confidence: intentResult.confidence
      };
    } catch (error) {
      Logger.error('Error processing message', error);
      throw error;
    }
  }

  public getConversation(conversationId: string): Conversation | undefined {
    return this.conversations.get(conversationId);
  }

  public getConversationHistory(conversationId: string): Message[] {
    const conversation = this.conversations.get(conversationId);
    return conversation ? conversation.messages : [];
  }

  public clearConversation(conversationId: string): boolean {
    return this.conversations.delete(conversationId);
  }

  public getAllConversations(): Conversation[] {
    return Array.from(this.conversations.values());
  }
}
