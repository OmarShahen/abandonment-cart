# PowerShell script to fix Prisma and setup database
Write-Host "🔧 Fixing Prisma permission issue and setting up database..." -ForegroundColor Green

# Stop Node processes
Write-Host "`n📋 Step 1: Stopping Node processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "tsc" -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host "✅ Node processes stopped." -ForegroundColor Green

# Clean Prisma cache
Write-Host "`n🧹 Step 2: Cleaning Prisma cache..." -ForegroundColor Yellow
if (Test-Path "node_modules\.prisma") {
    Remove-Item -Recurse -Force "node_modules\.prisma"
    Write-Host "✅ Prisma cache cleared." -ForegroundColor Green
} else {
    Write-Host "ℹ️ No Prisma cache to clear." -ForegroundColor Cyan
}

# Generate Prisma client
Write-Host "`n⚙️ Step 3: Regenerating Prisma client..." -ForegroundColor Yellow
try {
    & npx prisma generate
    Write-Host "✅ Prisma client generated successfully." -ForegroundColor Green
} catch {
    Write-Host "❌ Error generating Prisma client. Try running as Administrator." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Deploy migrations
Write-Host "`n🚀 Step 4: Deploying migrations..." -ForegroundColor Yellow
try {
    & npx prisma migrate deploy
    Write-Host "✅ Migrations deployed successfully." -ForegroundColor Green
} catch {
    Write-Host "❌ Error deploying migrations. Check your DATABASE_URL." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Seed database
Write-Host "`n🌱 Step 5: Seeding database..." -ForegroundColor Yellow
try {
    & npm run db:seed
    Write-Host "✅ Database seeded successfully." -ForegroundColor Green
} catch {
    Write-Host "❌ Error seeding database. Check connection." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`n🎉 All done! Your database is ready." -ForegroundColor Green
Write-Host "You can now run: npm run dev" -ForegroundColor Cyan
Read-Host "Press Enter to exit"