# KenyaLaw AI - Your AI-Powered Guide to Kenya's Constitution

KenyaLaw AI is an interactive platform that helps users understand and explore Kenya's Constitution using artificial intelligence. The application provides easy access to constitutional information, smart search capabilities, and AI-powered assistance for constitutional queries.

## Features

- 📚 **Constitution Explorer**: Browse through chapters of Kenya's Constitution with detailed explanations
- 🔍 **Smart Search**: Search specific articles and interpretations with AI-powered results
- 💬 **AI Assistant**: Get instant, context-aware answers to your constitutional questions
- 📱 **Responsive Design**: Fully responsive interface that works on all devices
- 🌐 **PWA Support**: Install as a Progressive Web App for offline access

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- shadcn/ui for UI components
- Google's Gemini AI API for intelligent responses
- React Router for navigation
- React Query for data management

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/wenslauce/kenya-law-ai.git
cd kenya-law-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
constitution-navigator-ai/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── lib/           # Utility functions and services
│   ├── hooks/         # Custom React hooks
│   └── App.tsx        # Main application component
├── public/            # Static assets
└── index.html         # Entry HTML file
```

## Features in Detail

### Constitution Explorer
- Chapter-by-chapter navigation
- Interactive chat interface for each chapter
- Detailed summaries and content display

### Smart Search
- AI-powered search functionality
- Context-aware results
- Formatted responses with relevant articles

### AI Assistant
- Natural language understanding
- Constitutional context awareness
- HTML-formatted responses for better readability

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/)
- Powered by [Google's Gemini AI](https://deepmind.google/technologies/gemini/)
- Constitution content from the Kenya Law website

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
