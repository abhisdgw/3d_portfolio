# Quick Start Guide - Customer Care API Agent

## 🚀 Get Started in 3 Steps

### Step 1: Build the API Server
```bash
npm run server:build
```

### Step 2: Start the API Server
```bash
npm run server
```

You should see:
```
[2025-11-01T12:00:00.000Z] INFO: Customer Care API Agent running on port 3001
[2025-11-01T12:00:00.000Z] INFO: Health check: http://localhost:3001/health
[2025-11-01T12:00:00.000Z] INFO: Chat endpoint: http://localhost:3001/api/chat
```

### Step 3: Start the Frontend (in a new terminal)
```bash
npm run dev
```

## ✅ Verify Installation

### Test the API
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-01T12:00:00.000Z",
  "service": "Customer Care API Agent"
}
```

### Test a Chat Message
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, I need help"}'
```

Expected response:
```json
{
  "message": "Hello! Welcome to our customer care service. How can I assist you today?",
  "conversationId": "uuid-here",
  "timestamp": "2025-11-01T12:00:00.000Z",
  "intent": "greeting",
  "confidence": 0.9
}
```

## 🎯 Using the Chat Widget

1. Open your browser to `http://localhost:5173`
2. Look for the floating chat button (💬) in the bottom-right corner
3. Click the button to open the chat widget
4. Type a message and press Enter or click Send
5. Watch the AI respond in real-time!

## 📝 Example Conversations

### Billing Inquiry
**You:** "I have a question about my invoice"  
**Agent:** "I can help you with billing inquiries. What specific billing question do you have?"  
**Intent:** billing (confidence: 0.88)

### Technical Support
**You:** "The app keeps crashing"  
**Agent:** "I can assist with technical issues. What technical problem are you experiencing?"  
**Intent:** technical (confidence: 0.87)

### General Support
**You:** "I need help with my account"  
**Agent:** "I'd be happy to help you with that. Could you please provide more details about the issue you're experiencing?"  
**Intent:** support (confidence: 0.8)

## 🛠️ Development Mode

For development with auto-reload:

```bash
# Terminal 1 - API Server with auto-reload
npm run server:dev

# Terminal 2 - Frontend with hot reload
npm run dev
```

## 📊 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run server:build` | Compile TypeScript to JavaScript |
| `npm run server` | Build and start the API server |
| `npm run server:dev` | Start server with auto-reload |
| `npm run dev` | Start frontend development server |
| `npm run build` | Build frontend for production |

## 🔧 Configuration

### Change API Port

Edit `.env` file:
```env
PORT=3001  # Change to your preferred port
```

### Change API URL (Frontend)

Edit `.env` file:
```env
VITE_API_URL=http://localhost:3001  # Change to your API URL
```

## 🐛 Common Issues

### Port Already in Use
```bash
# Find process using port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>
```

### API Not Responding
1. Check if the server is running
2. Verify the port in `.env` matches the server port
3. Check for error messages in the terminal

### Frontend Can't Connect
1. Ensure API server is running
2. Check `VITE_API_URL` in `.env`
3. Look for CORS errors in browser console

## 📚 Next Steps

- Read the full documentation: `CUSTOMER_CARE_API.md`
- Explore the API endpoints: `server/README.md`
- Customize the chat widget: `src/components/ChatWidget.tsx`
- Add more intents: `server/agent/customerCareAgent.ts`

## 🎉 You're All Set!

Your customer care API agent is now running. Start chatting and explore the features!

For detailed documentation, see `CUSTOMER_CARE_API.md`
