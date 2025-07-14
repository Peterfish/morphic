#!/bin/bash

echo "🛑 Stopping Development Environment..."

# Stop Redis
echo "Stopping Redis..."
redis-cli shutdown 2>/dev/null || true

# Kill any running Next.js dev servers
echo "Stopping Next.js dev server..."
pkill -f "next dev" 2>/dev/null || true

echo "✅ Development environment stopped"