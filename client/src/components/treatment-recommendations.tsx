import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Share2, AlertTriangle, Lightbulb, ShieldAlert } from "lucide-react";
import { TreatmentRecommendation } from "@/lib/treatment-database";

interface TreatmentRecommendationsProps {
  treatment: TreatmentRecommendation;
  diseaseName: string;
}

export default function TreatmentRecommendations({ 
  treatment, 
  diseaseName 
}: TreatmentRecommendationsProps) {
  const [activeTab, setActiveTab] = useState("organic");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-accent text-accent-foreground';
      case 'moderate': return 'bg-secondary text-secondary-foreground';
      case 'high': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return '💚';
      case 'moderate': return '⚠️';
      case 'high': return '🚨';
      default: return '❓';
    }
  };

  return (
    <Card className="p-6" data-testid="treatment-recommendations">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Treatment Recommendations</h2>
      
      {/* Severity Level */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xl">{getSeverityIcon(treatment.severity)}</span>
          <Badge className={getSeverityColor(treatment.severity)} data-testid="severity-badge">
            {treatment.severity.charAt(0).toUpperCase() + treatment.severity.slice(1)} Severity
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground" data-testid="severity-description">
          {treatment.description}
        </p>
      </div>

      {/* Treatment Options Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="organic" data-testid="tab-organic">
            🌿 Organic
          </TabsTrigger>
          <TabsTrigger value="chemical" data-testid="tab-chemical">
            🧪 Chemical
          </TabsTrigger>
          <TabsTrigger value="cultural" data-testid="tab-cultural">
            🌱 Cultural
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organic" className="space-y-4 mt-4">
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Natural Solutions</h4>
            <ul className="space-y-2 text-sm" data-testid="organic-treatments">
              {treatment.organic.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {treatment.tips.organic && (
            <div className="bg-accent/10 rounded-lg p-3">
              <p className="text-sm text-foreground">
                <Lightbulb className="w-4 h-4 inline mr-1" />
                <strong>Pro Tip:</strong> {treatment.tips.organic}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="chemical" className="space-y-4 mt-4">
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Chemical Solutions</h4>
            <ul className="space-y-2 text-sm" data-testid="chemical-treatments">
              {treatment.chemical.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-secondary mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {treatment.tips.chemical && (
            <div className="bg-destructive/10 rounded-lg p-3 border border-destructive/20">
              <p className="text-sm text-foreground">
                <ShieldAlert className="w-4 h-4 inline mr-1" />
                <strong>Warning:</strong> {treatment.tips.chemical}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="cultural" className="space-y-4 mt-4">
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Prevention & Management</h4>
            <ul className="space-y-2 text-sm" data-testid="cultural-treatments">
              {treatment.cultural.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {treatment.tips.cultural && (
            <div className="bg-primary/10 rounded-lg p-3">
              <p className="text-sm text-foreground">
                <Lightbulb className="w-4 h-4 inline mr-1" />
                <strong>Best Practice:</strong> {treatment.tips.cultural}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <Button 
          variant="default" 
          className="flex-1"
          data-testid="save-report"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Report
        </Button>
        <Button 
          variant="secondary" 
          className="flex-1"
          data-testid="share-results"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Results
        </Button>
      </div>
    </Card>
  );
}
