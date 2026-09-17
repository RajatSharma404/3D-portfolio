# .agents/skills/commit/scripts/atomic_commit.ps1
# Automates atomic per-file Git commit & push

$ErrorActionPreference = "Stop"

Write-Host "🔍 Inspecting Git Working Tree..." -ForegroundColor Cyan
$statusLines = git status --porcelain

if (-not $statusLines) {
    Write-Host "✓ Working tree is already clean. Nothing to commit." -ForegroundColor Green
    exit 0
}

$commitCount = 0
$summary = @()

foreach ($line in $statusLines) {
    $trimmed = $line.Trim()
    if ($trimmed -eq "") { continue }

    # Extract status code and file path
    $status = $line.Substring(0, 2).Trim()
    $filePath = $line.Substring(3).Trim()

    # Handle rename arrows
    if ($filePath -match " -> ") {
        $parts = $filePath -split " -> "
        $filePath = $parts[1]
    }

    # Stage the single file
    git add -- "$filePath"

    # Derive scope and type
    $scope = "workspace"
    if ($filePath -match "^app/") { $scope = "app" }
    elseif ($filePath -match "^components/ui/") { $scope = "ui" }
    elseif ($filePath -match "^components/scene/") { $scope = "scene" }
    elseif ($filePath -match "^lib/") { $scope = "lib" }
    elseif ($filePath -match "^tests/") { $scope = "tests" }
    elseif ($filePath -match "^\.agents/") { $scope = "agents" }
    elseif ($filePath -match "^scripts/") { $scope = "scripts" }
    elseif ($filePath -match "package.*json") { $scope = "deps" }

    $actionType = "chore"
    if ($status -eq "??") { $actionType = "feat" }
    elseif ($status -eq "M") { $actionType = "refactor" }
    elseif ($status -eq "D") { $actionType = "chore" }

    $fileName = Split-Path $filePath -Leaf
    $commitMsg = "$actionType($scope): update $fileName"

    # Commit single file
    git commit -m "$commitMsg" --quiet
    $commitSha = git rev-parse --short HEAD

    $commitCount++
    $summary += [PSCustomObject]@{
        Index = $commitCount
        SHA = $commitSha
        File = $filePath
        Message = $commitMsg
    }
}

Write-Host "`n✓ Created $commitCount atomic commits." -ForegroundColor Green

# Get current branch
$branch = git rev-parse --abbrev-ref HEAD
Write-Host "🚀 Pushing to origin/$branch..." -ForegroundColor Cyan
git push origin "$branch" --quiet

Write-Host "`n🏁 Atomic Push Complete!" -ForegroundColor Green
$summary | Format-Table -AutoSize
