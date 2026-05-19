Write-Host "Starting MACROJECT server..." -ForegroundColor Green
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath "$scriptPath\fitness_ai"
python ai_server.py
