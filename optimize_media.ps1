# Create a temporary directory for downloads
$tempDir = Join-Path $env:TEMP "media_optimizer"
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null

Write-Host "Starting media optimization setup..." -ForegroundColor Green

# Function to download and extract files
function Download-And-Extract {
    param (
        [string]$Url,
        [string]$OutputFile,
        [string]$ExtractPath
    )
    
    Write-Host "Downloading $OutputFile..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $Url -OutFile (Join-Path $tempDir $OutputFile)
    
    if ($OutputFile -like "*.zip") {
        Write-Host "Extracting $OutputFile..." -ForegroundColor Yellow
        Expand-Archive -Path (Join-Path $tempDir $OutputFile) -DestinationPath $ExtractPath -Force
    }
}

# Create tools directory
$toolsDir = Join-Path $PSScriptRoot "media_tools"
New-Item -ItemType Directory -Force -Path $toolsDir | Out-Null

# Download and set up FFmpeg
$ffmpegUrl = "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip"
$ffmpegExtractPath = Join-Path $tempDir "ffmpeg"
Download-And-Extract -Url $ffmpegUrl -OutputFile "ffmpeg.zip" -ExtractPath $ffmpegExtractPath
Copy-Item -Path (Join-Path $ffmpegExtractPath "ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe") -Destination $toolsDir -Force

# Download and set up Gifsicle
$gifsicleUrl = "https://www.lcdf.org/gifsicle/gifsicle-1.93-win64.zip"
$gifsicleExtractPath = Join-Path $tempDir "gifsicle"
Download-And-Extract -Url $gifsicleUrl -OutputFile "gifsicle.zip" -ExtractPath $gifsicleExtractPath
Copy-Item -Path (Join-Path $gifsicleExtractPath "gifsicle.exe") -Destination $toolsDir -Force

# Download and set up WebP tools
$webpUrl = "https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.3.2-windows-x64.zip"
$webpExtractPath = Join-Path $tempDir "webp"
Download-And-Extract -Url $webpUrl -OutputFile "webp.zip" -ExtractPath $webpExtractPath
Copy-Item -Path (Join-Path $webpExtractPath "libwebp-1.3.2-windows-x64\bin\cwebp.exe") -Destination $toolsDir -Force

# Create optimization script
$batchScript = @"
@echo off
setlocal enabledelayedexpansion

echo Starting media optimization...
echo.

:: Initialize counters
set "total_saved=0"
set "images_processed=0"
set "videos_processed=0"
set "gifs_processed=0"

:: Optimize WebP images using cwebp
echo Optimizing WebP images...
for %%f in (src\assets\images\*.webp) do (
    set "file=%%f"
    set "size_before=%%~zf"
    
    :: Create temporary file
    set "temp_file=%%~nf_temp.webp"
    
    :: Optimize WebP
    "%~dp0cwebp.exe" -q 80 "!file!" -o "!temp_file!"
    
    if exist "!temp_file!" (
        set "size_after=%%~zf"
        set /a "saved=!size_before! - !size_after!"
        
        if !saved! gtr 0 (
            move /y "!temp_file!" "!file!" >nul
            set /a "total_saved+=!saved!"
            set /a "images_processed+=1"
            echo Optimized: !file! (Saved: !saved! bytes)
        ) else (
            del "!temp_file!"
            echo No optimization needed: !file!
        )
    )
)

:: Optimize videos using FFmpeg
echo.
echo Optimizing videos...
for %%f in (src\assets\videos\*.mp4 src\assets\videos\*.webm) do (
    set "file=%%f"
    set "size_before=%%~zf"
    
    :: Create temporary file
    set "temp_file=%%~nf_temp%%~xf"
    
    :: Optimize video
    "%~dp0ffmpeg.exe" -i "!file!" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k "!temp_file!" -y
    
    if exist "!temp_file!" (
        set "size_after=%%~zf"
        set /a "saved=!size_before! - !size_after!"
        
        if !saved! gtr 0 (
            move /y "!temp_file!" "!file!" >nul
            set /a "total_saved+=!saved!"
            set /a "videos_processed+=1"
            echo Optimized: !file! (Saved: !saved! bytes)
        ) else (
            del "!temp_file!"
            echo No optimization needed: !file!
        )
    )
)

:: Optimize GIFs using Gifsicle
echo.
echo Optimizing GIFs...
for %%f in (src\assets\gif\*.gif) do (
    set "file=%%f"
    set "size_before=%%~zf"
    
    :: Create temporary file
    set "temp_file=%%~nf_temp.gif"
    
    :: Optimize GIF
    "%~dp0gifsicle.exe" -O3 --lossy=80 "!file!" -o "!temp_file!"
    
    if exist "!temp_file!" (
        set "size_after=%%~zf"
        set /a "saved=!size_before! - !size_after!"
        
        if !saved! gtr 0 (
            move /y "!temp_file!" "!file!" >nul
            set /a "total_saved+=!saved!"
            set /a "gifs_processed+=1"
            echo Optimized: !file! (Saved: !saved! bytes)
        ) else (
            del "!temp_file!"
            echo No optimization needed: !file!
        )
    )
)

:: Print summary
echo.
echo Optimization Summary:
echo -------------------
echo Images processed: %images_processed%
echo Videos processed: %videos_processed%
echo GIFs processed: %gifs_processed%
echo Total space saved: %total_saved% bytes

echo.
echo Press any key to exit...
pause >nul

endlocal
"@

# Save the batch script
$batchScriptPath = Join-Path $toolsDir "optimize_media.bat"
$batchScript | Out-File -FilePath $batchScriptPath -Encoding ASCII

Write-Host "`nSetup complete! Running optimization..." -ForegroundColor Green

# Run the optimization script
Start-Process -FilePath $batchScriptPath -WorkingDirectory $toolsDir -Wait -NoNewWindow

# Clean up
Write-Host "`nCleaning up temporary files..." -ForegroundColor Yellow
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "`nOptimization complete! Press any key to exit..." -ForegroundColor Green
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 