$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$nodePath = 'C:\Program Files\nodejs'
if (-not (Test-Path $nodePath)) {
  throw "Node.js was not found at $nodePath"
}
$env:Path = "$nodePath;$env:Path"

Write-Host 'Starting Camp Canteen POS backend...'
Start-Process -FilePath 'npm.cmd' -ArgumentList 'run dev --workspace backend' -WorkingDirectory $repoRoot -WindowStyle Minimized

Write-Host 'Starting Camp Canteen POS frontend...'
Start-Process -FilePath 'npm.cmd' -ArgumentList 'run dev --workspace frontend -- --host 0.0.0.0' -WorkingDirectory $repoRoot -WindowStyle Minimized

Write-Host 'Open http://localhost:5173/'
