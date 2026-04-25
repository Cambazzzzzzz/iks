@echo off
echo İks Uygulamasi Baslatiliyor...
echo.

if not exist "node_modules" (
    echo Bagimliliklari yukleniyor...
    call npm install
    echo.
)

echo Uygulama baslatiliyor...
npm start
