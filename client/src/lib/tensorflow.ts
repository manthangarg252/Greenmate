import * as tf from '@tensorflow/tfjs';

export interface Prediction {
  className: string;
  probability: number;
}

export interface CropModel {
  labels: string[];
  modelPath: string;
  emoji: string;
}

export const cropModels: Record<string, CropModel> = {
  apple: {
    labels: ['Apple scab', 'appleblack rot', 'cedar apple'],
    modelPath: '/models/apple/',
    emoji: '🍎'
  },
  corn: {
    labels: ['corn healthy', 'corn northern leaf blight', 'Corn common rust'],
    modelPath: '/models/corn/',
    emoji: '🌽'
  },
  grape: {
    labels: ['grape esca', 'grape healthy', 'grape leaf blight'],
    modelPath: '/models/grape/',
    emoji: '🍇'
  },
  peach: {
    labels: ['peach bacterial spot', 'peach healthy'],
    modelPath: '/models/peach/',
    emoji: '🍑'
  },
  pepper: {
    labels: ['pepper bell healthy', 'pepper bell bacterial spot'],
    modelPath: '/models/pepper/',
    emoji: '🌶️'
  },
  tomato: {
    labels: ['tomato bacterial spot', 'tomato leaf mold'],
    modelPath: '/models/tomato/',
    emoji: '🍅'
  }
};

export class TensorFlowService {
  private models: Map<string, tf.LayersModel> = new Map();
  
  async loadModel(cropType: string): Promise<tf.LayersModel> {
    if (this.models.has(cropType)) {
      return this.models.get(cropType)!;
    }

    const modelConfig = cropModels[cropType];
    if (!modelConfig) {
      throw new Error(`Unknown crop type: ${cropType}`);
    }

    try {
      const model = await tf.loadLayersModel(`${modelConfig.modelPath}model.json`);
      this.models.set(cropType, model);
      return model;
    } catch (error) {
      console.error(`Failed to load model for ${cropType}:`, error);
      throw new Error(`Failed to load ${cropType} model. Please ensure model files are available.`);
    }
  }

  preprocessImage(imageElement: HTMLImageElement): tf.Tensor {
    return tf.tidy(() => {
      // Convert image to tensor
      const tensor = tf.browser.fromPixels(imageElement);
      
      // Resize to 224x224 (model input size)
      const resized = tf.image.resizeBilinear(tensor, [224, 224]);
      
      // Normalize pixel values to [0, 1]
      const normalized = resized.div(255.0);
      
      // Add batch dimension
      return normalized.expandDims(0);
    });
  }

  async predict(model: tf.LayersModel, imageElement: HTMLImageElement, cropType: string): Promise<Prediction[]> {
    const modelConfig = cropModels[cropType];
    if (!modelConfig) {
      throw new Error(`Unknown crop type: ${cropType}`);
    }

    const preprocessed = this.preprocessImage(imageElement);
    
    try {
      const predictions = model.predict(preprocessed) as tf.Tensor;
      const probabilities = await predictions.data();
      
      // Create prediction objects with labels
      const results: Prediction[] = modelConfig.labels.map((label, index) => ({
        className: label,
        probability: probabilities[index]
      }));

      // Sort by probability (highest first)
      results.sort((a, b) => b.probability - a.probability);

      // Dispose prediction tensor to prevent memory leaks
      predictions.dispose();
      
      return results;
    } finally {
      preprocessed.dispose();
    }
  }

  disposeModel(cropType: string): void {
    const model = this.models.get(cropType);
    if (model) {
      model.dispose();
      this.models.delete(cropType);
    }
  }

  disposeAllModels(): void {
    this.models.forEach(model => model.dispose());
    this.models.clear();
  }
}

export const tensorFlowService = new TensorFlowService();
