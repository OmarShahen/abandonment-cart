@echo off
echo Fixing Prisma permission issue...

echo.
echo Step 1: Stopping Node processes...
taskkill /f /im node.exe 2>nul
taskkill /f /im tsc.exe 2>nul
echo Node processes stopped.

echo.
echo Step 2: Cleaning Prisma cache...
if exist "node_modules\.prisma" (
    rmdir /s /q "node_modules\.prisma"
    echo Prisma cache cleared.
) else (
    echo No Prisma cache to clear.
)

echo.
echo Step 3: Regenerating Prisma client...
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo Error generating Prisma client. Try running as Administrator.
    pause
    exit /b 1
)

echo.
echo Step 4: Deploying migrations...
call npx prisma migrate deploy
if %ERRORLEVEL% NEQ 0 (
    echo Error deploying migrations. Check your DATABASE_URL.
    pause
    exit /b 1
)

echo.
echo Step 5: Seeding database...
call npm run db:seed
if %ERRORLEVEL% NEQ 0 (
    echo Error seeding database. Check connection.
    pause
    exit /b 1
)

echo.
echo ✅ All done! Your database is ready.
echo You can now run: npm run dev
pause