import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import CropSelector from "@/components/crop-selector";
import ImageUpload from "@/components/image-upload";
import ResultsDisplay from "@/components/results-display";
import TreatmentRecommendations from "@/components/treatment-recommendations";
import { tensorFlowService, type Prediction } from "@/lib/tensorflow";
import { getTreatmentRecommendation, isHealthy } from "@/lib/treatment-database";

export default function Home() {
  const [selectedCrop, setSelectedCrop] = useState("tomato");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoadingModel, setIsLoadingModel] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Pre-load the default crop model
    loadModel(selectedCrop);
  }, []);

  const loadModel = async (cropType: string) => {
    setIsLoadingModel(true);
    try {
      await tensorFlowService.loadModel(cropType);
      toast({
        title: "Model loaded",
        description: `${cropType} disease detection model is ready`,
      });
    } catch (error) {
      console.error("Failed to load model:", error);
      toast({
        title: "Model loading failed",
        description: `Failed to load ${cropType} model. Some features may not work.`,
        variant: "destructive",
      });
    } finally {
      setIsLoadingModel(false);
    }
  };

  const handleCropSelect = async (crop: string) => {
    setSelectedCrop(crop);
    setPredictions(null);
    
    // Load model for selected crop
    await loadModel(crop);
  };

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setPredictions(null);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setPredictions(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    try {
      // Load model if not already loaded
      const model = await tensorFlowService.loadModel(selectedCrop);
      
      // Create image element for processing
      const img = new Image();
      img.onload = async () => {
        try {
          const results = await tensorFlowService.predict(model, img, selectedCrop);
          setPredictions(results);
          
          toast({
            title: "Analysis complete",
            description: `Detected: ${results[0].className} (${Math.round(results[0].probability * 100)}% confidence)`,
          });
        } catch (error) {
          console.error("Prediction failed:", error);
          toast({
            title: "Analysis failed",
            description: "Failed to analyze the image. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsAnalyzing(false);
        }
      };
      
      img.onerror = () => {
        toast({
          title: "Image processing failed",
          description: "Failed to process the image. Please try a different image.",
          variant: "destructive",
        });
        setIsAnalyzing(false);
      };
      
      img.src = selectedImage!;
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis failed",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
  };

  const topPrediction = predictions?.[0];
  const treatment = topPrediction && !isHealthy(topPrediction.className) 
    ? getTreatmentRecommendation(topPrediction.className)
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">🌱</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AgriScan</h1>
                <p className="text-sm text-muted-foreground">Plant Disease Detection</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">AI-Powered • Client-Side</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Crop Selector */}
        <CropSelector 
          selectedCrop={selectedCrop} 
          onCropSelect={handleCropSelect}
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <ImageUpload
            onImageSelect={handleImageSelect}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
            selectedImage={selectedImage}
            onRemoveImage={handleRemoveImage}
          />

          {/* Results Section */}
          <div className="space-y-6">
            <ResultsDisplay 
              predictions={predictions}
              isLoading={isAnalyzing}
            />

            {/* Treatment Recommendations */}
            {treatment && topPrediction && (
              <TreatmentRecommendations 
                treatment={treatment}
                diseaseName={topPrediction.className}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              AgriScan - AI-Powered Plant Disease Detection
            </p>
            <p className="text-xs text-muted-foreground">
              Processing happens entirely in your browser. Your images never leave your device.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
