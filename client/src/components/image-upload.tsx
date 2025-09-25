import { useState, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  selectedImage: string | null;
  onRemoveImage: () => void;
}

export default function ImageUpload({
  onImageSelect,
  onAnalyze,
  isAnalyzing,
  selectedImage,
  onRemoveImage
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    onImageSelect(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Upload Plant Image</h2>
        
        {/* Upload Zone */}
        <div
          data-testid="upload-zone"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`upload-zone border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
            isDragOver
              ? 'border-primary/50 bg-primary/5'
              : 'border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5'
          }`}
        >
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          <div>
            <p className="text-base font-medium text-foreground mb-2">Drop your image here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
            <p className="text-xs text-muted-foreground">Supports: JPG, PNG, WEBP (Max 10MB)</p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileInputChange}
          data-testid="file-input"
        />

        <input
          ref={cameraInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          capture="environment"
          onChange={handleFileInputChange}
          data-testid="camera-input"
        />

        {/* Camera Options */}
        <div className="flex gap-3 mt-4">
          <Button
            variant="default"
            className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
            onClick={() => cameraInputRef.current?.click()}
            data-testid="camera-button"
          >
            <Camera className="w-4 h-4 mr-2" />
            Use Camera
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => fileInputRef.current?.click()}
            data-testid="gallery-button"
          >
            <Upload className="w-4 h-4 mr-2" />
            Gallery
          </Button>
        </div>

        {/* Image Preview */}
        {selectedImage && (
          <div className="mt-6" data-testid="image-preview">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border border-border"
                data-testid="preview-image"
              />
              <button
                onClick={onRemoveImage}
                className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full w-8 h-8 flex items-center justify-center hover:bg-destructive/90 transition-colors duration-200"
                data-testid="remove-image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Analyze Button */}
        <Button
          onClick={onAnalyze}
          disabled={!selectedImage || isAnalyzing}
          className="w-full mt-6"
          data-testid="analyze-button"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            '🔬 Analyze Plant'
          )}
        </Button>
      </Card>

      {/* Model Status */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-accent" data-testid="model-status-indicator"></div>
            <span className="text-sm font-medium text-foreground">Model Status</span>
          </div>
          <span className="text-sm text-muted-foreground" data-testid="model-status-text">
            Ready for Analysis
          </span>
        </div>
      </Card>
    </div>
  );
}
