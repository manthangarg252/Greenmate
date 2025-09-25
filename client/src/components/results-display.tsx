import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Prediction } from "@/lib/tensorflow";

interface ResultsDisplayProps {
  predictions: Prediction[] | null;
  isLoading: boolean;
}

export default function ResultsDisplay({ predictions, isLoading }: ResultsDisplayProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Detection Results</h2>
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center animate-pulse">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Analyzing image...</p>
        </div>
      </Card>
    );
  }

  if (!predictions) {
    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Detection Results</h2>
        <div className="text-center py-12" data-testid="no-results">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Upload an image to see detection results</p>
        </div>
      </Card>
    );
  }

  const topPrediction = predictions[0];
  const confidence = Math.round(topPrediction.probability * 100);

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Detection Results</h2>
      
      <div className="space-y-4" data-testid="results-content">
        {/* Disease Detection Card */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Detected Condition</h3>
            <Badge 
              variant={confidence > 80 ? "default" : confidence > 60 ? "secondary" : "destructive"}
              data-testid="confidence-badge"
            >
              {confidence}% Confident
            </Badge>
          </div>
          <div className="space-y-3">
            <div>
              <p 
                className="text-lg font-medium text-foreground" 
                data-testid="disease-name"
              >
                {topPrediction.className}
              </p>
              <p className="text-sm text-muted-foreground">
                {topPrediction.className.toLowerCase().includes('healthy') 
                  ? 'Plant appears to be in good health'
                  : 'Disease detected - treatment recommended'
                }
              </p>
            </div>
            
            {/* Confidence Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Confidence Level</span>
                <span className="font-medium" data-testid="confidence-percent">
                  {confidence}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="confidence-bar h-2 rounded-full" 
                  style={{ width: `${confidence}%` }}
                  data-testid="confidence-bar"
                />
              </div>
            </div>
          </div>
        </div>

        {/* All Predictions */}
        <div className="border border-border rounded-lg p-4">
          <h4 className="font-medium mb-3 text-foreground">All Predictions</h4>
          <div className="space-y-2" data-testid="all-predictions">
            {predictions.map((prediction, index) => (
              <div key={index} className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">
                  {prediction.className}
                </span>
                <span className="text-sm font-medium">
                  {(prediction.probability * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
