#!/bin/bash

echo "🚀 Starting Morphic Development Environment..."

# Check if Redis is installed
if ! command -v redis-server &> /dev/null; then
    echo "⚠️  Redis is not installed. Installing..."
    sudo apt-get update
    sudo apt-get install -y redis-server
fi

# Start Redis in background
echo "📦 Starting Redis..."
redis-server --daemonize yes

# Check Redis status
if redis-cli ping > /dev/null 2>&1; then
    echo "✅ Redis is running on port 6379"
else
    echo "❌ Redis failed to start"
    exit 1
fi

# Check if bun is in PATH
if ! command -v bun &> /dev/null; then
    # Use full path if not in PATH
    BUN_CMD="$HOME/.bun/bin/bun"
else
    BUN_CMD="bun"
fi

echo ""
echo "📝 Development Environment Ready!"
echo "================================"
echo "1. Make sure KoboldCpp is running on http://localhost:5001"
echo "2. Starting Morphic development server..."
echo ""

# Start development server
$BUN_CMD dev