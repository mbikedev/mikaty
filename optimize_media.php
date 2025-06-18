<?php
class MediaOptimizer {
    private $basePath;
    private $stats = [
        'images' => ['processed' => 0, 'saved' => 0],
        'videos' => ['processed' => 0, 'saved' => 0],
        'gifs' => ['processed' => 0, 'saved' => 0]
    ];
    
    public function __construct($basePath) {
        $this->basePath = $basePath;
    }
    
    private function getFileSize($file) {
        return filesize($file);
    }
    
    public function optimizeWebP($file) {
        $originalSize = $this->getFileSize($file);
        
        // Create image resource
        $image = imagecreatefromwebp($file);
        if (!$image) {
            echo "✗ Failed to process: $file\n";
            return false;
        }
        
        // Preserve transparency
        imagesavealpha($image, true);
        
        // Optimize WebP with 80% quality (good balance of size/quality)
        imagewebp($image, $file, 80);
        imagedestroy($image);
        
        $newSize = $this->getFileSize($file);
        $saved = $originalSize - $newSize;
        
        if ($saved > 0) {
            $this->stats['images']['saved'] += $saved;
            echo "✓ Optimized: $file (Saved: " . round($saved / 1024, 2) . "KB)\n";
        } else {
            echo "ℹ No optimization needed: $file\n";
        }
        
        $this->stats['images']['processed']++;
        return true;
    }
    
    public function optimizeVideo($file) {
        $originalSize = $this->getFileSize($file);
        
        // Check if ffmpeg is available
        exec('ffmpeg -version', $output, $returnCode);
        if ($returnCode !== 0) {
            echo "✗ FFmpeg not found. Skipping video optimization.\n";
            return false;
        }
        
        $outputFile = $file . '.optimized';
        $command = "ffmpeg -i \"$file\" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k \"$outputFile\"";
        exec($command, $output, $returnCode);
        
        if ($returnCode === 0) {
            $newSize = $this->getFileSize($outputFile);
            $saved = $originalSize - $newSize;
            
            if ($saved > 0) {
                unlink($file);
                rename($outputFile, $file);
                $this->stats['videos']['saved'] += $saved;
                echo "✓ Optimized: $file (Saved: " . round($saved / 1024, 2) . "KB)\n";
            } else {
                unlink($outputFile);
                echo "ℹ No optimization needed: $file\n";
            }
        } else {
            echo "✗ Failed to optimize: $file\n";
            if (file_exists($outputFile)) {
                unlink($outputFile);
            }
            return false;
        }
        
        $this->stats['videos']['processed']++;
        return true;
    }
    
    public function optimizeGif($file) {
        $originalSize = $this->getFileSize($file);
        
        // Check if gifsicle is available
        exec('gifsicle --version', $output, $returnCode);
        if ($returnCode !== 0) {
            echo "✗ Gifsicle not found. Skipping GIF optimization.\n";
            return false;
        }
        
        $outputFile = $file . '.optimized';
        $command = "gifsicle -O3 --lossy=80 \"$file\" -o \"$outputFile\"";
        exec($command, $output, $returnCode);
        
        if ($returnCode === 0) {
            $newSize = $this->getFileSize($outputFile);
            $saved = $originalSize - $newSize;
            
            if ($saved > 0) {
                unlink($file);
                rename($outputFile, $file);
                $this->stats['gifs']['saved'] += $saved;
                echo "✓ Optimized: $file (Saved: " . round($saved / 1024, 2) . "KB)\n";
            } else {
                unlink($outputFile);
                echo "ℹ No optimization needed: $file\n";
            }
        } else {
            echo "✗ Failed to optimize: $file\n";
            if (file_exists($outputFile)) {
                unlink($outputFile);
            }
            return false;
        }
        
        $this->stats['gifs']['processed']++;
        return true;
    }
    
    public function run() {
        echo "Starting media optimization...\n\n";
        
        // Optimize WebP images
        $webpFiles = glob($this->basePath . '/images/*.webp');
        foreach ($webpFiles as $file) {
            $this->optimizeWebP($file);
        }
        
        // Optimize videos
        $videoFiles = glob($this->basePath . '/videos/*.{mp4,webm}', GLOB_BRACE);
        foreach ($videoFiles as $file) {
            $this->optimizeVideo($file);
        }
        
        // Optimize GIFs
        $gifFiles = glob($this->basePath . '/gif/*.gif');
        foreach ($gifFiles as $file) {
            $this->optimizeGif($file);
        }
        
        // Print summary
        echo "\nOptimization Summary:\n";
        echo "-------------------\n";
        echo "Images processed: {$this->stats['images']['processed']}\n";
        echo "Images space saved: " . round($this->stats['images']['saved'] / 1024, 2) . "KB\n";
        echo "Videos processed: {$this->stats['videos']['processed']}\n";
        echo "Videos space saved: " . round($this->stats['videos']['saved'] / 1024, 2) . "KB\n";
        echo "GIFs processed: {$this->stats['gifs']['processed']}\n";
        echo "GIFs space saved: " . round($this->stats['gifs']['saved'] / 1024, 2) . "KB\n";
        echo "Total space saved: " . round(($this->stats['images']['saved'] + $this->stats['videos']['saved'] + $this->stats['gifs']['saved']) / 1024, 2) . "KB\n";
    }
}

// Run the optimizer
$optimizer = new MediaOptimizer(__DIR__ . '/src/assets');
$optimizer->run(); 