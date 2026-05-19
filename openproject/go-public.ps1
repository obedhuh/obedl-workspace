Write-Host "=== MACROJECT - Go Public ===" -ForegroundColor Cyan
Write-Host ""

# Start the server
$serverJob = Start-Job -ScriptBlock {
    Set-Location "$using:PSScriptRoot\fitness_ai"
    python ai_server.py
}
Write-Host "[1] Server starting on http://localhost:8899" -ForegroundColor Green

Start-Sleep -Seconds 2

# Start ngrok tunnel
Write-Host "[2] Starting ngrok tunnel..." -ForegroundColor Green
$ngrokPath = "C:\Users\obedl\AppData\Local\Microsoft\WinGet\Packages\Ngrok.Ngrok_Microsoft.Winget.Source_8wekyb3d8bbwe\ngrok.exe"
if (-not (Test-Path -LiteralPath $ngrokPath)) { $ngrokPath = "ngrok" }
$ngrok = Start-Process -FilePath $ngrokPath -ArgumentList "http 8899" -NoNewWindow -PassThru

Start-Sleep -Seconds 3

# Get the public URL
try {
    $info = Invoke-RestMethod -Uri "http://127.0.0.1:4040/api/tunnels" -ErrorAction Stop
    $url = $info.tunnels[0].public_url
    Write-Host ""
    Write-Host "=== SHARE THIS URL ===" -ForegroundColor Yellow
    Write-Host $url -ForegroundColor Magenta
    Write-Host "=========================" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press Ctrl+C to stop both the server and tunnel."
} catch {
    Write-Host "ngrok is running. Open http://localhost:4040 to see the URL." -ForegroundColor Yellow
}

# Wait for user to press Ctrl+C
try {
    while ($true) { Start-Sleep -Seconds 1 }
} finally {
    $ngrok.Kill()
    Stop-Job $serverJob
    Remove-Job $serverJob
}
