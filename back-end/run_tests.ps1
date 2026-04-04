$currentDirName = Split-Path -Path (Get-Location) -Leaf
if ($currentDirName -ne "back-end") {
    throw "This script must be run from 'back-end'. Current directory is '$currentDirName'."
}

if (-not (Get-Command "bru" -ErrorAction SilentlyContinue)) {
    throw "Required command 'bru' is not available. Try running 'npm install -g @usebruno/cli' and then try again."
}

cd ".\tests\Booklend API"
bru run `
	--env-file .\environments\dev.bru `
	--reporter-html ..\..\public\test_report.html
cd ..\..
