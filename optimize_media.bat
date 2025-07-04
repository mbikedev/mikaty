@echo off
setlocal enabledelayedexpansion

echo Starting media optimization...
echo.

:: Check for required tools
where ffmpeg >nul 2>nul
if %errorlevel% neq 0 (
    echo FFmpeg not found. Please install FFmpeg to optimize videos.
    echo Download from: https://ffmpeg.org/download.html
    echo.
)

where gifsicle >nul 2>nul
if %errorlevel% neq 0 (
    echo Gifsicle not found. Please install Gifsicle to optimize GIFs.
    echo Download from: https://www.lcdf.org/gifsicle/
    echo.
)

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
    cwebp -q 80 "!file!" -o "!temp_file!"
    
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
    ffmpeg -i "!file!" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k "!temp_file!" -y
    
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
    gifsicle -O3 --lossy=80 "!file!" -o "!temp_file!"
    
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

endlocal 