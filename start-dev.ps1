# Bambral 3D Studio - Full Stack Development Starter (Windows PowerShell)

Write-Host "🚀 Starting Bambral 3D Studio Full Stack Development Environment" -ForegroundColor Green
Write-Host ""

# Check if Docker is running
try {
    docker info > $null 2>&1
} catch {
    Write-Host "❌ Docker is not running. Please start Docker first." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Starting PostgreSQL database..." -ForegroundColor Cyan
docker-compose up -d postgres

Write-Host "⏳ Waiting for PostgreSQL to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "🔧 Setting up backend..." -ForegroundColor Cyan
Set-Location backend

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "⚠️  Please edit backend/.env with your configuration" -ForegroundColor Yellow
}

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "📥 Installing backend dependencies..." -ForegroundColor Cyan
    npm install
}

# Generate Prisma client
Write-Host "🔨 Generating Prisma client..." -ForegroundColor Cyan
npm run prisma:generate

# Run migrations
Write-Host "🗄️  Running database migrations..." -ForegroundColor Cyan
npm run prisma:migrate

# Seed database
Write-Host "🌱 Seeding database..." -ForegroundColor Cyan
npm run prisma:seed

Write-Host ""
Write-Host "✅ Backend setup complete!" -ForegroundColor Green
Write-Host ""

# Start backend in background
Write-Host "🚀 Starting backend server on http://localhost:4000..." -ForegroundColor Green
$backendProcess = Start-Process "npm" -ArgumentList "run dev" -WorkingDirectory (Get-Location) -PassThru

# Go back to root
Set-Location ..

# Install frontend dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "📥 Installing frontend dependencies..." -ForegroundColor Cyan
    npm install
}

Write-Host "🚀 Starting frontend server on http://localhost:5173..." -ForegroundColor Green
$frontendProcess = Start-Process "npm" -ArgumentList "run dev" -WorkingDirectory (Get-Location) -PassThru

Write-Host ""
Write-Host "🎉 Full stack development environment is running!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "📍 Backend API: http://localhost:4000/api" -ForegroundColor Cyan
Write-Host "📍 API Health: http://localhost:4000/api/health" -ForegroundColor Cyan
Write-Host "📍 Prisma Studio: Run 'npm run prisma:studio' in backend folder" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Yellow

# Wait for user to press Ctrl+C
try {
    $backendProcess.WaitForExit()
    $frontendProcess.WaitForExit()
} catch {
    Write-Host "Stopping servers..." -ForegroundColor Yellow
    Stop-Process $backendProcess.Id -Force
    Stop-Process $frontendProcess.Id -Force
    docker-compose down
}