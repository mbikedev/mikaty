<?php
require 'vendor/autoload.php';

use Spatie\ImageOptimizer\OptimizerChainFactory;
use Spatie\ImageOptimizer\Optimizers\Jpegoptim;
use Spatie\ImageOptimizer\Optimizers\Pngquant;
use Spatie\ImageOptimizer\Optimizers\Optipng;
use Spatie\ImageOptimizer\Optimizers\Svgo;
use Spatie\ImageOptimizer\Optimizers\Gifsicle;
use Spatie\ImageOptimizer\Optimizers\Cwebp;

class AssetOptimizer {
    private $imageOptimizer;
    private $basePath;
    
    public function __construct($basePath) {
        $this->basePath = $basePath;
        $this->imageOptimizer = OptimizerChainFactory::create()
            ->addOptimizer(new Jpegoptim([
                '--strip-all',
                '--all-progressive',
            ]))
            ->addOptimizer(new Pngquant([
                '--force',
            ]))
            ->addOptimizer(new Optipng([
                '-i0',
                '-o2',
                '-quiet',
            ]))
            ->addOptimizer(new Svgo([
                '--disable=cleanupIDs',
            ]))
            ->addOptimizer(new Gifsicle([
                '-b',
                '-O3',
            ]))
            ->addOptimizer(new Cwebp([
                '-m 6',
                '-pass 10',
                '-mt',
                '-q 80',
            ]));
    }
    
    public function optimizeImages($directory) {
        $files = glob($directory . '/*.{jpg,jpeg,png,gif,webp,svg}', GLOB_BRACE);
        foreach ($files as $file) {
            echo "Optimizing: $file\n";
            try {
                $this->imageOptimizer->optimize($file);
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
                $outputFile = $file . '.optimized';
                $command = "ffmpeg -i $file -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k $outputFile";
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
                $command = "gifsicle -O3 --lossy=80 $file -o $file";
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