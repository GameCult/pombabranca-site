param(
    [ValidateSet("build", "dev")]
    [string]$Command = "dev",
    [int]$Port = 8080
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$sharedQuartzRoot = if ($env:GAMECULT_QUARTZ_ROOT) {
    $env:GAMECULT_QUARTZ_ROOT
} else {
    Join-Path (Split-Path -Parent $repoRoot) "GameCult-Quartz"
}

$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCommand) {
    throw "node was not found. Install Node.js or set PATH to a Node 22+ runtime."
}

$env:npm_config_cache = Join-Path $repoRoot ".npm-cache"

if (-not (Test-Path $sharedQuartzRoot)) {
    throw "GameCult-Quartz was not found at '$sharedQuartzRoot'. Clone it beside this repo or set GAMECULT_QUARTZ_ROOT."
}

$buildScript = Join-Path $sharedQuartzRoot "scripts\build-site.mjs"
if (-not (Test-Path $buildScript)) {
    throw "GameCult-Quartz build script was not found at '$buildScript'."
}

$scriptArgs = @(
    $buildScript,
    $Command,
    "--siteRoot", $repoRoot,
    "--overlayDir", "site",
    "--contentDir", "PombaBranca",
    "--outputDir", "quartz-site/public"
)

if ($Command -eq "dev") {
    $scriptArgs += @("--port", $Port)
}

& $nodeCommand.Source @scriptArgs
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}
