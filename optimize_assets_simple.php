<?php
class AssetOptimizer {
    private $basePath;
    
    public function __construct($basePath) {
        $this->basePath = $basePath;
    }
    
    public function optimizeImages($directory) {
        $files = glob($directory . '/*.{jpg,jpeg,png,gif,webp,svg}', GLOB_BRACE);
        foreach ($files as $file) {
            echo "Optimizing: $file\n";
            try {
                // Get image info
                $info = getimagesize($file);
                if (!$info) {
                    echo "✗ Not an image: $file\n";
                    continue;
                }
                
                // Create image resource based on type
                switch ($info[2]) {
                    case IMAGETYPE_JPEG:
                        $image = imagecreatefromjpeg($file);
                        // Optimize JPEG
                        imagejpeg($image, $file, 85); // 85% quality
                        break;
                        
                    case IMAGETYPE_PNG:
                        $image = imagecreatefrompng($file);
                        // Preserve transparency
                        imagesavealpha($image, true);
                        // Optimize PNG
                        imagepng($image, $file, 6); // Compression level 6
                        break;
                        
                    case IMAGETYPE_GIF:
                        $image = imagecreatefromgif($file);
                        // Optimize GIF
                        imagegif($image, $file);
                        break;
                        
                    case IMAGETYPE_WEBP:
                        $image = imagecreatefromwebp($file);
                        // Optimize WebP
                        imagewebp($image, $file, 80); // 80% quality
                        break;
                }
                
                // Free memory
                if (isset($image)) {
                    imagedestroy($image);
                }
                
                echo "✓ Optimized: $file\n";
            } catch (Exception $e) {
                echo "✗ Error optimizing $file: " . $e->getMessage() . "\n";
            }
        }
    }
    
    public function optimizeVideos($directory) {
        $files = glob($directory . '/*.{mp4,webm}', GLOB_BRACE);
        foreach ($files as $file) {
            echo "Optimizing video: $file\n";
            try {
                // Check if ffmpeg is available
                exec('ffmpeg -version', $output, $returnCode);
                if ($returnCode !== 0) {
                    echo "✗ FFmpeg not found. Please install FFmpeg to optimize videos.\n";
                    continue;
                }
                
                $outputFile = $file . '.optimized';
                $command = "ffmpeg -i \"$file\" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k \"$outputFile\"";
                exec($command, $output, $returnCode);
                
                if ($returnCode === 0) {
                    unlink($file);
                    rename($outputFile, $file);
                    echo "✓ Optimized video: $file\n";
                } else {
                    echo "✗ Error optimizing video $file\n";
                }
            } catch (Exception $e) {
                echo "✗ Error optimizing video $file: " . $e->getMessage() . "\n";
            }
        }
    }
    
    public function optimizeGifs($directory) {
        $files = glob($directory . '/*.gif');
        foreach ($files as $file) {
            echo "Optimizing GIF: $file\n";
            try {
                // Check if gifsicle is available
                exec('gifsicle --version', $output, $returnCode);
                if ($returnCode !== 0) {
                    echo "✗ Gifsicle not found. Please install Gifsicle to optimize GIFs.\n";
                    continue;
                }
                
                $command = "gifsicle -O3 --lossy=80 \"$file\" -o \"$file\"";
                exec($command, $output, $returnCode);
                
                if ($returnCode === 0) {
                    echo "✓ Optimized GIF: $file\n";
                } else {
                    echo "✗ Error optimizing GIF $file\n";
                }
            } catch (Exception $e) {
                echo "✗ Error optimizing GIF $file: " . $e->getMessage() . "\n";
            }
        }
    }
    
    public function run() {
        // Optimize images
        $this->optimizeImages($this->basePath . '/images');
        
        // Optimize videos
        $this->optimizeVideos($this->basePath . '/videos');
        
        // Optimize GIFs
        $this->optimizeGifs($this->basePath . '/gif');
    }
}

// Run the optimizer
$optimizer = new AssetOptimizer(__DIR__ . '/src/assets');
$optimizer->run(); 