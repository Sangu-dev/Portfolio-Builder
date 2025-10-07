@echo off
echo ========================================
echo   Portfolio Builder - Starting All
echo ========================================
echo.
echo Starting Server in new window...
start "Portfolio Builder - Server" cmd /k "cd server && node index.js"
timeout /t 3 /nobreak > nul
echo.
echo Starting Client in new window...
start "Portfolio Builder - Client" cmd /k "cd client && npm run dev"
echo.
echo ========================================
echo Both server and client are starting!
echo Server: http://localhost:5000
echo Client: http://localhost:5173
echo ========================================
echo.
echo Press any key to exit this window...
pause > nul
