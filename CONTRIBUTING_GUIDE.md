# Contributing Guide

## 🚀 Development Setup

### Prerequisites
- Node.js 18+
- Bun package manager
- Git
- KoboldCpp or compatible local AI server

### Quick Start
```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/morphic.git
cd morphic

# 2. Install dependencies
bun install

# 3. Copy environment config
cp .env.development .env.local
# Edit .env.local with your settings

# 4. Start development
./dev-start.sh
```

## 📝 Git Workflow

### Branch Strategy
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or bugfix branch
git checkout -b fix/bug-description
```

### Commit Guidelines
```bash
# Use conventional commits
git commit -m "feat: add new search feature"
git commit -m "fix: resolve API connection issue"
git commit -m "docs: update README"
git commit -m "style: format code"
git commit -m "refactor: optimize search function"
```

### Before Pushing
1. **Test your changes**
   ```bash
   bun dev  # Test in development
   ```

2. **Check for TypeScript errors**
   ```bash
   bun run type-check
   ```

3. **Format code**
   ```bash
   bun run format
   ```

## 🔄 Syncing with Upstream

```bash
# Add upstream remote (first time only)
git remote add upstream https://github.com/miurla/morphic.git

# Sync your fork
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## 📦 What to Include/Exclude

### ✅ Include in commits:
- Source code changes
- Documentation updates
- Configuration templates
- Development scripts

### ❌ Don't commit:
- `.env.local` (personal settings)
- `node_modules/`
- `.next/` (build output)
- `*.gguf` (AI models)
- `dump.rdb` (Redis data)
- Personal API keys

## 🏗️ Project Structure

```
morphic/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Core libraries
│   ├── tools/       # AI tools (search, etc.)
│   └── utils/       # Utilities
├── public/          # Static assets
│   └── config/      # Model configurations
└── scripts/         # Development scripts
```

## 💡 Development Tips

1. **Keep changes focused** - One feature per PR
2. **Write clear commit messages** - Help others understand
3. **Test edge cases** - Ensure robustness
4. **Document new features** - Update relevant docs
5. **Ask questions** - Open issues for discussion

## 🐛 Reporting Issues

When reporting issues, include:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Error messages/logs

## 🤝 Pull Request Process

1. **Create PR with clear title**
2. **Fill out PR template**
3. **Link related issues**
4. **Wait for review**
5. **Address feedback**
6. **Celebrate when merged! 🎉**