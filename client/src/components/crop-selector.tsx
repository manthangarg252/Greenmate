import { Card } from "@/components/ui/card";

interface CropSelectorProps {
  selectedCrop: string;
  onCropSelect: (crop: string) => void;
}

const crops = [
  { id: 'apple', name: 'Apple', emoji: '🍎' },
  { id: 'corn', name: 'Corn', emoji: '🌽' },
  { id: 'grape', name: 'Grape', emoji: '🍇' },
  { id: 'peach', name: 'Peach', emoji: '🍑' },
  { id: 'pepper', name: 'Pepper', emoji: '🌶️' },
  { id: 'tomato', name: 'Tomato', emoji: '🍅' }
];

export default function CropSelector({ selectedCrop, onCropSelect }: CropSelectorProps) {
  return (
    <div className="mb-8">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Select Crop Type</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {crops.map((crop) => (
            <button
              key={crop.id}
              data-testid={`crop-${crop.id}`}
              onClick={() => onCropSelect(crop.id)}
              className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedCrop === crop.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary hover:bg-primary/5'
              }`}
            >
              <span className="text-2xl mb-2">{crop.emoji}</span>
              <span className="text-sm font-medium">{crop.name}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
