@REM For Windows
@REM For pushing on GitHub insert in the terminal: ./up.bat *YOUR COMMIT*
git pull
git add .
git commit -m "%*"
git push