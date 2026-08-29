#!/bin/bash

# Bambral 3D Studio - Full Stack Development Starter

set -e

echo "🚀 Starting Bambral 3D Studio Full Stack Development Environment"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "📦 Starting PostgreSQL database..."
docker-compose up -d postgres

echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

echo "🔧 Setting up backend..."
cd backend

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your configuration"
fi

# Install dependencies if needed
if [ ! -d node_modules ]; then
    echo "📥 Installing backend dependencies..."
    npm install
fi

# Generate Prisma client
echo "🔨 Generating Prisma client..."
npm run prisma:generate

# Run migrations
echo "🗄️  Running database migrations..."
npm run prisma:migrate

# Seed database
echo "🌱 Seeding database..."
npm run prisma:seed

echo ""
echo "✅ Backend setup complete!"
echo ""

# Start backend in background
echo "🚀 Starting backend server on http://localhost:4000..."
npm run dev &
BACKEND_PID=$!

# Go back to root
cd ..

# Install frontend dependencies if needed
if [ ! -d node_modules ]; then
    echo "📥 Installing frontend dependencies..."
    npm install
fi

echo "🚀 Starting frontend server on http://localhost:5173..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 Full stack development environment is running!"
echo ""
echo "📍 Frontend: http://localhost:5173"
echo "📍 Backend API: http://localhost:4000/api"
echo "📍 API Health: http://localhost:4000/api/health"
echo "📍 Prisma Studio: Run 'npm run prisma:studio' in backend folder"
echo ""
echo "Press Ctrl+C to stop all servers"

# Trap Ctrl+C and kill background processes
trap "kill $BACKEND_PID $FRONTEND_PID; docker-compose down; exit 0" INT

# Wait for background processes
wait $BACKEND_PID $FRONTEND_PID