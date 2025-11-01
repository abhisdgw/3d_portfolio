# Customer Care API Agent - Complete Guide

## Overview

A sophisticated AI-powered customer care API agent built with Node.js, Express, TypeScript, and React. This system provides intelligent customer support with intent recognition, context-aware responses, and a beautiful chat interface.

## 🎯 Features

### Backend (API)
- ✅ **Intent Recognition**: Automatically detects customer intent (greeting, support, billing, technical, complaints, feedback)
- ✅ **Context-Aware Responses**: Maintains conversation history for contextual replies
- ✅ **RESTful API**: Clean, well-documented endpoints
- ✅ **TypeScript**: Fully typed for better development experience
- ✅ **Conversation Management**: Track and manage multiple conversations
- ✅ **Real-time Processing**: Fast response times
- ✅ **Error Handling**: Comprehensive error handling and logging

### Frontend (Chat Widget)
- ✅ **Beautiful UI**: Modern, responsive chat interface
- ✅ **Floating Widget**: Non-intrusive chat button
- ✅ **Real-time Updates**: Instant message delivery
- ✅ **Typing Indicators**: Visual feedback during processing
- ✅ **Conversation History**: Persistent chat history
- ✅ **Connection Status**: Shows API availability
- ✅ **Smooth Animations**: Polished user experience

## 📁 Project Structure

```
/vercel/sandbox/
├── server/                          # Backend API
│   ├── agent/
│   │   └── customerCareAgent.ts    # Core AI agent logic
│   ├── routes/
│   │   └── chat.ts                 # API route handlers
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── utils/
│   │   ├── logger.ts               # Logging utility
│   │   └── responseFormatter.ts    # Response formatting
│   ├── index.ts                    # Express server setup
│   ├── tsconfig.json               # TypeScript config
│   ├── package.json                # Server package config
│   └── README.md                   # Server documentation
│
├── src/                            # Frontend
│   ├── components/
│   │   ├── ChatWidget.tsx          # Main chat interface
│   │   └── ChatMessage.tsx         # Message component
│   ├── services/
│   │   └── chatApi.ts              # API communication layer
│   └── App.tsx                     # Updated with chat widget
│
├── package.json                    # Main package config
└── .env.example                    # Environment variables template
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build the Server**
   ```bash
   npm run server:build
   ```

3. **Start the API Server**
   ```bash
   npm run server
   ```
   The API will be available at `http://localhost:3001`

4. **Start the Frontend (in a separate terminal)**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

### Quick Start (Development)

For development with auto-reload:
```bash
# Terminal 1 - API Server
npm run server:dev

# Terminal 2 - Frontend
npm run dev
```

## 📡 API Endpoints

### 1. Health Check
```bash
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-01T12:00:00.000Z",
  "service": "Customer Care API Agent"
}
```

### 2. Send Message
```bash
POST /api/chat
Content-Type: application/json

{
  "message": "Hello, I need help with billing",
  "conversationId": "optional-uuid",
  "userId": "optional-user-id"
}
```

**Response:**
```json
{
  "message": "I can help you with billing inquiries. What specific billing question do you have?",
  "conversationId": "daf37a90-4b1b-40e9-820e-bb5d694738ff",
  "timestamp": "2025-11-01T12:00:00.000Z",
  "intent": "billing",
  "confidence": 0.88
}
```

### 3. Get Conversation History
```bash
GET /api/chat/history/:conversationId
```

**Response:**
```json
{
  "conversationId": "test-conv-123",
  "messages": [
    {
      "id": "msg_123_user",
      "role": "user",
      "content": "I have a problem with my invoice",
      "timestamp": "2025-11-01T12:00:00.000Z"
    },
    {
      "id": "msg_124_assistant",
      "role": "assistant",
      "content": "I can help you with billing inquiries...",
      "timestamp": "2025-11-01T12:00:01.000Z"
    }
  ],
  "timestamp": "2025-11-01T12:00:00.000Z"
}
```

### 4. Clear Conversation
```bash
DELETE /api/chat/:conversationId
```

### 5. Get All Conversations (Admin)
```bash
GET /api/chat/conversations
```

## 🧠 Intent Recognition

The agent automatically detects the following intents:

| Intent | Keywords | Example |
|--------|----------|---------|
| **GREETING** | hello, hi, hey, good morning | "Hello, how are you?" |
| **BILLING** | bill, invoice, payment, charge, refund | "I have a question about my invoice" |
| **TECHNICAL** | error, bug, not working, broken, crash | "The app keeps crashing" |
| **SUPPORT** | help, support, assist, need, how to | "I need help with my account" |
| **COMPLAINT** | complaint, disappointed, frustrated | "I'm unhappy with the service" |
| **FEEDBACK** | feedback, suggestion, recommend | "I have a suggestion for improvement" |
| **PRODUCT_INFO** | product, service, feature, what is | "Tell me about your products" |
| **FAREWELL** | bye, goodbye, thanks, thank you | "Thanks for your help!" |

## 🧪 Testing

### Test API Endpoints

```bash
# Health check
curl http://localhost:3001/health

# Send a message
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, I need help"}'

# Get conversation history
curl http://localhost:3001/api/chat/history/YOUR_CONVERSATION_ID

# Test billing intent
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "I have a problem with my invoice"}'

# Test technical intent
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "The app is not working"}'
```

### Test Results

✅ **Health Check**: API responds with healthy status  
✅ **Greeting Intent**: Correctly detects greetings (confidence: 0.9)  
✅ **Billing Intent**: Correctly detects billing queries (confidence: 0.88)  
✅ **Technical Intent**: Correctly detects technical issues (confidence: 0.87)  
✅ **Conversation History**: Successfully retrieves message history  
✅ **Frontend Integration**: Chat widget displays and functions correctly  

## 🎨 Frontend Usage

The chat widget is automatically integrated into your React application. Users can:

1. Click the floating chat button (💬) in the bottom-right corner
2. Type messages in the input field
3. Receive instant AI-generated responses
4. View conversation history
5. Clear the chat or close the widget

### Customization

To customize the chat widget, edit `/src/components/ChatWidget.tsx`:

```typescript
// Change colors
backgroundColor: '#007bff'  // Primary color
color: '#ffffff'            // Text color

// Change position
bottom: '20px'
right: '20px'

// Change size
width: '380px'
height: '600px'
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3001

# Server Configuration
PORT=3001
NODE_ENV=development
```

### Server Configuration

Edit `/server/index.ts` to configure:
- CORS settings
- Port number
- Middleware options
- Error handling

## 📊 API Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "message": "Response message",
  "conversationId": "uuid",
  "timestamp": "ISO 8601 date",
  "intent": "detected_intent",
  "confidence": 0.85
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "timestamp": "ISO 8601 date"
}
```

## 🔐 Security Considerations

- **CORS**: Currently set to allow all origins (`*`). In production, specify your frontend URL.
- **Rate Limiting**: Consider adding rate limiting for production use.
- **Authentication**: Add user authentication for production deployments.
- **Input Validation**: All inputs are validated before processing.
- **Error Handling**: Sensitive error details are not exposed to clients.

## 🚀 Deployment

### Backend Deployment

1. Build the server:
   ```bash
   npm run server:build
   ```

2. Deploy the `server/dist` folder to your hosting service (Heroku, AWS, DigitalOcean, etc.)

3. Set environment variables on your hosting platform

4. Start the server:
   ```bash
   node server/dist/index.js
   ```

### Frontend Deployment

1. Update `VITE_API_URL` in `.env` to point to your deployed API

2. Build the frontend:
   ```bash
   npm run build
   ```

3. Deploy the `dist` folder to Vercel, Netlify, or your preferred hosting service

## 🔮 Future Enhancements

- [ ] Integration with OpenAI/Anthropic for advanced AI responses
- [ ] Database persistence (MongoDB, PostgreSQL)
- [ ] User authentication and authorization
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Sentiment analysis
- [ ] File upload support
- [ ] Voice input/output
- [ ] Email/SMS notifications
- [ ] Escalation to human agents
- [ ] Chat history export
- [ ] Custom branding options

## 🐛 Troubleshooting

### API Server Won't Start

1. Check if port 3001 is already in use:
   ```bash
   lsof -i :3001
   ```

2. Kill the process or change the port in `.env`

3. Rebuild the server:
   ```bash
   npm run server:build
   ```

### Frontend Can't Connect to API

1. Verify the API is running:
   ```bash
   curl http://localhost:3001/health
   ```

2. Check `VITE_API_URL` in your environment

3. Check browser console for CORS errors

### TypeScript Errors

1. Rebuild the server:
   ```bash
   cd server && npx tsc
   ```

2. Check for type errors in the output

## 📝 Scripts Reference

```json
{
  "server:build": "Build TypeScript server to JavaScript",
  "server": "Build and start the API server",
  "server:dev": "Start server with auto-reload",
  "dev": "Start Vite development server",
  "build": "Build frontend for production",
  "lint": "Run ESLint",
  "preview": "Preview production build"
}
```

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review the API documentation in `/server/README.md`
- Open an issue on GitHub

---

**Built with ❤️ using Node.js, Express, TypeScript, and React**
