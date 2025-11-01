# Customer Care API Agent

A sophisticated AI-powered customer care API agent built with Node.js, Express, and TypeScript.

## Features

- **Intent Recognition**: Automatically detects customer intent (greeting, support, billing, technical, complaints, feedback, etc.)
- **Context-Aware Responses**: Maintains conversation history and provides contextual responses
- **RESTful API**: Clean and well-documented API endpoints
- **TypeScript**: Fully typed for better development experience
- **Conversation Management**: Track and manage multiple conversations
- **Real-time Processing**: Fast response times with efficient message processing

## Architecture

```
server/
├── agent/
│   └── customerCareAgent.ts    # Core AI agent logic
├── routes/
│   └── chat.ts                 # API route handlers
├── types/
│   └── index.ts                # TypeScript interfaces
├── utils/
│   ├── logger.ts               # Logging utility
│   └── responseFormatter.ts    # Response formatting
└── index.ts                    # Express server setup
```

## API Endpoints

### 1. Send Message
**POST** `/api/chat`

Send a message and receive an AI-generated response.

**Request Body:**
```json
{
  "message": "Hello, I need help with billing",
  "conversationId": "optional-conversation-id",
  "userId": "optional-user-id"
}
```

**Response:**
```json
{
  "message": "I can help you with billing inquiries. What specific billing question do you have?",
  "conversationId": "uuid-v4",
  "timestamp": "2025-11-01T12:00:00.000Z",
  "intent": "billing",
  "confidence": 0.88
}
```

### 2. Get Conversation History
**GET** `/api/chat/history/:conversationId`

Retrieve the complete history of a conversation.

**Response:**
```json
{
  "conversationId": "uuid-v4",
  "messages": [
    {
      "id": "msg_123_user",
      "role": "user",
      "content": "Hello",
      "timestamp": "2025-11-01T12:00:00.000Z"
    },
    {
      "id": "msg_124_assistant",
      "role": "assistant",
      "content": "Hi there! How can I help you?",
      "timestamp": "2025-11-01T12:00:01.000Z"
    }
  ],
  "timestamp": "2025-11-01T12:00:00.000Z"
}
```

### 3. Clear Conversation
**DELETE** `/api/chat/:conversationId`

Clear a specific conversation from memory.

**Response:**
```json
{
  "message": "Conversation cleared successfully",
  "conversationId": "uuid-v4",
  "timestamp": "2025-11-01T12:00:00.000Z"
}
```

### 4. Get All Conversations (Admin)
**GET** `/api/chat/conversations`

Retrieve all active conversations.

**Response:**
```json
{
  "conversations": [...],
  "count": 5,
  "timestamp": "2025-11-01T12:00:00.000Z"
}
```

### 5. Health Check
**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-01T12:00:00.000Z",
  "service": "Customer Care API Agent"
}
```

## Intent Types

The agent can detect the following intents:

- **GREETING**: Welcome messages and greetings
- **SUPPORT**: General help and support requests
- **BILLING**: Payment, invoice, and billing inquiries
- **TECHNICAL**: Technical issues and troubleshooting
- **PRODUCT_INFO**: Product and service information
- **COMPLAINT**: Customer complaints and issues
- **FEEDBACK**: Customer feedback and suggestions
- **FAREWELL**: Goodbye messages
- **UNKNOWN**: Unrecognized intents

## Running the Server

### Development Mode
```bash
npm run server
```

### Watch Mode (Auto-restart on changes)
```bash
npm run server:watch
```

The server will start on `http://localhost:3001` by default.

## Configuration

Set the following environment variables:

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)

## Testing the API

### Using curl

```bash
# Send a message
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, I need help"}'

# Get conversation history
curl http://localhost:3001/api/chat/history/YOUR_CONVERSATION_ID

# Health check
curl http://localhost:3001/health
```

### Using the Frontend

The chat widget is automatically integrated into the React application. Simply click the chat button in the bottom-right corner to start a conversation.

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid or missing parameters
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

All errors return a JSON response with an error message and timestamp.

## Logging

The server includes built-in logging for:
- Request/response tracking
- Error monitoring
- Debug information (development mode only)

## Future Enhancements

- Integration with external AI services (OpenAI, Anthropic)
- Database persistence for conversations
- User authentication and authorization
- Analytics and reporting
- Multi-language support
- Sentiment analysis
- Escalation to human agents
- Email/SMS notifications

## License

MIT
