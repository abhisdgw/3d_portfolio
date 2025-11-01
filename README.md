# My Portfolio Website - Overview 🚀

This repository contains the open source version of my 3D portfolio website with an integrated AI-powered Customer Care API Agent. Do check it out!

## 🆕 New Feature: Customer Care API Agent

This project now includes a complete customer care API agent with:
- 🤖 AI-powered intent recognition (9 intent types)
- 💬 Beautiful floating chat widget
- 🚀 RESTful API with real-time responses
- 📊 Conversation management and history
- 🎨 Modern, responsive UI

**Quick Start:**
```bash
# Start the API server
npm run server

# Start the frontend (in a new terminal)
npm run dev
```

📚 **Documentation:**
- [Quick Start Guide](QUICKSTART.md) - Get started in 3 steps
- [Complete Guide](CUSTOMER_CARE_API.md) - Full documentation
- [Project Summary](PROJECT_SUMMARY.md) - What was built

## Instructions 🛠️

I have modified the GSAP club plugins with the trial plugins, but with the trial plugin, you cannot host it⛔️. For Club plugins, check out here: [GSAP Installation](https://gsap.com/docs/v3/Installation/).

**Techstack** - React, TypeScript, GSAP, ThreeJS, WebGL, Node.js, Express, HTML, CSS, JavaScript

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

3. Install React:

   ```bash
   npm i react
   ```

4. Install GSAP for React:

   You can choose to install GSAP specifically for React or the general GSAP package:

   For React:
   ```bash
   npm i gsap/react
   ```

   Or the general GSAP package:
   ```bash
   npm i gsap
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

Open your browser and navigate to `http://localhost:3000` to view the website.

## Features

### Portfolio Website
- 3D interactive UI built with ThreeJS and WebGL
- Smooth animations using GSAP
- Responsive design for various screen sizes

### Customer Care API Agent
- AI-powered intent recognition (greeting, billing, technical, support, etc.)
- Real-time chat interface with typing indicators
- Conversation history and management
- RESTful API with 5 endpoints
- Beautiful floating chat widget
- Context-aware responses
- Connection status monitoring

## Available Scripts

```bash
# Frontend
npm run dev          # Start Vite development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend API
npm run server:build # Build TypeScript server
npm run server       # Start API server
npm run server:dev   # Start API with auto-reload

# Testing
./test-api.sh        # Run API test suite
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
 

