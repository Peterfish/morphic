# Morphic - Custom Local AI Build

An AI-powered search engine with a generative UI - **Configured for Local AI Models**

![capture](/public/screenshot-2025-05-04.png)

## 🎯 About This Fork

This is a customized version of [Morphic](https://github.com/miurla/morphic) configured to work exclusively with local AI models through OpenAI-compatible endpoints (like KoboldCpp). All cloud AI providers have been removed for a fully self-hosted experience.

### Key Modifications
- ✅ All models configured to use local AI endpoint
- ✅ Interactive logo with eye-tracking mouse movement
- ✅ Docker deployment optimized for local model usage
- ✅ Removed dependency on cloud AI providers

## 🗂️ Overview

- 🛠 [Features](#-features)
- 🧱 [Stack](#-stack)
- 🚀 [Quickstart](#-quickstart)
- 🐳 [Docker Deployment](#-docker-deployment)
- 🔧 [Building Custom Image](#-building-custom-image)
- 🔎 [Search Engine](#-search-engine)
- 📄 [License](#-license)

## 🛠 Features

### Core Features

- AI-powered search with GenerativeUI using **local models**
- Natural language question understanding
- Multiple search providers support (Tavily, SearXNG)
- Interactive logo with eye-tracking animation
- Reasoning models with visible thought process

### Chat & History

- Chat history functionality
- Share search results
- Redis support (Local/Docker)

### Search Capabilities

- URL-specific search
- Video search support
- SearXNG integration with:
  - Customizable search depth (basic/advanced)
  - Configurable engines
  - Adjustable results limit
  - Safe search options
  - Custom time range filtering

## 🧱 Stack

### Core Framework

- [Next.js](https://nextjs.org/) - App Router, React Server Components
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vercel AI SDK](https://sdk.vercel.ai/docs) - Text streaming / Generative UI

### AI & Search

- **Local AI Model** via OpenAI-compatible endpoint
- [KoboldCpp](https://github.com/LostRuins/koboldcpp) - Recommended local AI server
- [Tavily AI](https://tavily.com/) - Default search provider
- [SearXNG](https://docs.searxng.org/) - Self-hosted search alternative

### Data Storage

- [Redis](https://redis.io/) - Caching and session storage

### UI & Styling

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons

## 🚀 Quickstart

### Prerequisites

- Docker and Docker Compose installed
- A local AI model server (KoboldCpp recommended)
- Node.js 18+ and Bun (for development)

### 1. Clone this repository

```bash
git clone https://github.com/Peterfish/morphic.git morphic-custom
cd morphic-custom
```

### 2. Set up KoboldCpp (Local AI Server)

```bash
# Clone and build KoboldCpp
git clone https://github.com/LostRuins/koboldcpp
cd koboldcpp
make

# Run with your preferred model
./koboldcpp --model path/to/your/model.gguf --port 5001
```

### 3. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```bash
# Local AI Configuration
OPENAI_COMPATIBLE_API_KEY=any-key-will-work
OPENAI_COMPATIBLE_API_BASE_URL=http://localhost:5001/v1

# Search Configuration
TAVILY_API_KEY=your-tavily-api-key  # Get from https://app.tavily.com

# Optional
BASE_URL=http://localhost:3000
```

### 4. Run with Docker Compose

```bash
# Start all services
docker compose up -d

# Or if using separate KoboldCpp container
docker compose up -d && docker compose -f docker-compose.kobold.yaml up -d
```

Visit http://localhost:3030 in your browser.

## 🐳 Docker Deployment

### Using Pre-built Image

```bash
docker pull ghcr.io/Peterfish/morphic-custom:latest

# Run with docker-compose
docker compose up -d
```

### docker-compose.yaml Configuration

```yaml
services:
  morphic:
    image: ghcr.io/Peterfish/morphic-custom:latest
    env_file: .env.local
    ports:
      - '3030:3000'
    depends_on:
      - redis
      - searxng
```

## 🔧 Building Custom Image

See [BUILD_CUSTOM_IMAGE.md](BUILD_CUSTOM_IMAGE.md) for detailed instructions on:

- Modifying the codebase for your needs
- Building your own Docker image
- Pushing to GitHub Container Registry
- Deploying your custom build

## 🔎 Search Engine

### Setting up Morphic as Default Search Engine

1. Open your browser settings
2. Navigate to search engine settings
3. Add new search engine:
   - **Name**: Morphic Local
   - **Keyword**: morphic
   - **URL**: `http://localhost:3030/search?q=%s`
4. Set as default search engine

## 🔍 Troubleshooting

### Common Issues

1. **Connection to AI model failed**
   - Ensure KoboldCpp is running on port 5001
   - Check `OPENAI_COMPATIBLE_API_BASE_URL` in `.env.local`

2. **Search not working**
   - Verify `TAVILY_API_KEY` is set correctly
   - Check SearXNG container is running

3. **Docker networking issues**
   - Use container names for inter-container communication
   - Example: `http://koboldcpp:5001/v1` instead of `localhost`

## 📝 Development

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun build
```

## 🙏 Credits

- Original [Morphic](https://github.com/miurla/morphic) by [@miurla](https://github.com/miurla)
- Built with [Vercel AI SDK](https://sdk.vercel.ai/)
- Interactive logo inspired by classic animated eyes

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.