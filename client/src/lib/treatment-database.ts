export interface TreatmentRecommendation {
  severity: 'low' | 'moderate' | 'high';
  icon: string;
  description: string;
  organic: string[];
  chemical: string[];
  cultural: string[];
  tips: {
    organic?: string;
    chemical?: string;
    cultural?: string;
  };
}

export const treatmentDatabase: Record<string, TreatmentRecommendation> = {
  'tomato bacterial spot': {
    severity: 'moderate',
    icon: '⚠️',
    description: 'Bacterial infection that requires immediate attention to prevent spread',
    organic: [
      'Apply copper-based organic fungicide (2-3 applications, 7-10 days apart)',
      'Use neem oil spray (0.5-1% concentration) in early morning or evening',
      'Implement baking soda spray (1 tsp per quart water) weekly',
      'Apply compost tea to boost plant immunity'
    ],
    chemical: [
      'Apply copper hydroxide fungicide as directed on label',
      'Use streptomycin sulfate for severe infections (follow local regulations)',
      'Consider systemic bactericides for widespread infection',
      'Alternate between different chemical classes to prevent resistance'
    ],
    cultural: [
      'Remove and destroy affected plant parts immediately',
      'Improve air circulation by proper plant spacing',
      'Use drip irrigation instead of overhead watering',
      'Rotate crops yearly to break disease cycle',
      'Sanitize tools between plants'
    ],
    tips: {
      organic: 'Combine treatments with proper plant spacing and avoid overhead watering to reduce humidity around leaves.',
      chemical: 'Always follow label instructions and observe pre-harvest intervals. Use protective equipment during application.',
      cultural: 'Prevention is always better than treatment. Maintain plant health with proper nutrition and stress management.'
    }
  },
  'tomato leaf mold': {
    severity: 'moderate',
    icon: '🍄',
    description: 'Fungal infection common in humid conditions, affects photosynthesis',
    organic: [
      'Apply sulfur-based organic fungicide every 7-14 days',
      'Use baking soda solution (1 tsp per quart) with liquid soap',
      'Apply milk spray (1:10 ratio with water) twice weekly',
      'Increase air circulation around plants'
    ],
    chemical: [
      'Use chlorothalonil-based fungicides as preventive measure',
      'Apply mancozeb for active infections',
      'Consider systemic fungicides for severe cases',
      'Rotate fungicide types to prevent resistance'
    ],
    cultural: [
      'Remove lower leaves touching soil',
      'Ensure adequate spacing between plants',
      'Use mulch to prevent soil splash',
      'Water at soil level, avoid wetting leaves',
      'Improve greenhouse ventilation if applicable'
    ],
    tips: {
      organic: 'Early morning application of organic treatments is most effective when humidity is naturally lower.',
      chemical: 'Follow resistance management guidelines and alternate between different fungicide modes of action.',
      cultural: 'Humidity control is critical - aim for less than 85% relative humidity around plants.'
    }
  },
  'pepper bell bacterial spot': {
    severity: 'moderate',
    icon: '⚠️',
    description: 'Bacterial infection affecting bell pepper leaves and fruit quality',
    organic: [
      'Apply copper-based organic fungicide (2-3 applications, 7-10 days apart)',
      'Use neem oil spray (0.5-1% concentration) in early morning or evening',
      'Implement baking soda spray (1 tsp per quart water) weekly',
      'Apply beneficial bacteria (Bacillus subtilis) as preventive measure'
    ],
    chemical: [
      'Apply copper hydroxide fungicide as directed on label',
      'Use streptomycin sulfate for severe infections (follow local regulations)',
      'Consider systemic bactericides for widespread infection',
      'Use fixed copper compounds for resistance management'
    ],
    cultural: [
      'Remove and destroy affected plant parts immediately',
      'Improve air circulation by proper plant spacing',
      'Use drip irrigation instead of overhead watering',
      'Rotate crops yearly to break disease cycle',
      'Use resistant varieties when available'
    ],
    tips: {
      organic: 'Combine treatments with proper plant spacing and avoid overhead watering to reduce humidity around leaves.',
      chemical: 'Always follow label instructions and observe pre-harvest intervals. Use protective equipment during application.',
      cultural: 'Prevention is always better than treatment. Maintain plant health with proper nutrition and stress management.'
    }
  },
  'apple scab': {
    severity: 'moderate',
    icon: '🍎',
    description: 'Fungal disease causing dark, scabby lesions on apple leaves and fruits',
    organic: [
      'Apply sulfur-based organic fungicide during growing season',
      'Use baking soda spray (2 tsp per quart water) weekly during wet conditions',
      'Apply compost tea to boost plant immunity',
      'Use horticultural oil during dormant season'
    ],
    chemical: [
      'Apply myclobutanil or propiconazole fungicides',
      'Use captan fungicide during fruit development',
      'Consider systemic fungicides for severe infections',
      'Rotate fungicide classes to prevent resistance'
    ],
    cultural: [
      'Rake and destroy fallen leaves in autumn',
      'Prune trees for better air circulation',
      'Choose scab-resistant apple varieties',
      'Avoid overhead irrigation during leaf-wet periods',
      'Apply mulch to prevent soil splash'
    ],
    tips: {
      organic: 'Prevention through proper sanitation is key. Remove all fallen leaves and infected debris.',
      chemical: 'Apply fungicides preventively before wet weather periods for best results.',
      cultural: 'Resistant varieties are the most effective long-term solution for scab management.'
    }
  },
  'appleblack rot': {
    severity: 'high',
    icon: '🚨',
    description: 'Serious fungal disease causing fruit rot and leaf spots, can destroy entire crops',
    organic: [
      'Apply copper-based organic fungicides regularly',
      'Use bordeaux mixture during dormant season',
      'Apply beneficial microorganisms to compete with pathogen',
      'Implement strict sanitation practices'
    ],
    chemical: [
      'Use captan or thiophanate-methyl fungicides',
      'Apply mancozeb during fruit development',
      'Consider systemic fungicides like myclobutanil',
      'Use tank mixes for broader spectrum control'
    ],
    cultural: [
      'Remove and destroy all infected fruits and branches immediately',
      'Prune out dead and diseased wood during dormant season',
      'Maintain proper tree spacing for air circulation',
      'Clean up all fallen debris regularly',
      'Avoid wounding trees during cultivation'
    ],
    tips: {
      organic: 'Early detection and removal of infected material is critical to prevent spread.',
      chemical: 'Start fungicide applications early in the season and maintain consistent coverage.',
      cultural: 'Sanitation is the most important cultural practice - remove ALL infected material.'
    }
  },
  'cedar apple': {
    severity: 'moderate',
    icon: '🌿',
    description: 'Fungal rust disease requiring both apple and cedar hosts to complete lifecycle',
    organic: [
      'Apply sulfur-based fungicides during spring growth',
      'Use neem oil spray during spore release periods',
      'Apply beneficial bacteria to leaf surfaces',
      'Implement copper-based treatments during dormant season'
    ],
    chemical: [
      'Use myclobutanil or propiconazole fungicides',
      'Apply mancozeb during wet spring conditions',
      'Consider strobilurin fungicides for resistance management',
      'Use preventive fungicide programs during susceptible periods'
    ],
    cultural: [
      'Remove nearby cedar trees if possible (within 1-2 miles)',
      'Choose rust-resistant apple varieties',
      'Improve air circulation through pruning',
      'Avoid overhead irrigation during spring',
      'Plant apples away from cedar windbreaks'
    ],
    tips: {
      organic: 'Timing is critical - apply treatments during spring when cedar galls are active.',
      chemical: 'Preventive applications work better than curative treatments for rust diseases.',
      cultural: 'Removing alternate hosts (cedars) is the most effective long-term management strategy.'
    }
  },
  'corn northern leaf blight': {
    severity: 'moderate',
    icon: '🌽',
    description: 'Fungal disease causing characteristic long lesions on corn leaves',
    organic: [
      'Apply Bacillus subtilis-based biological fungicides',
      'Use sulfur-based organic treatments',
      'Implement crop rotation with non-grass species',
      'Apply compost to improve soil health'
    ],
    chemical: [
      'Use azoxystrobin or propiconazole fungicides',
      'Apply mancozeb for protectant activity',
      'Consider tank mixes for broader disease control',
      'Use fungicides at early reproductive stages'
    ],
    cultural: [
      'Plant resistant corn varieties',
      'Rotate with non-host crops (soybeans, legumes)',
      'Bury crop residues to reduce inoculum',
      'Maintain adequate plant spacing',
      'Avoid late planting dates'
    ],
    tips: {
      organic: 'Focus on building soil health and using certified disease-free seeds.',
      chemical: 'Apply fungicides before disease symptoms appear for best results.',
      cultural: 'Genetic resistance is the most economical management strategy for northern leaf blight.'
    }
  },
  'corn common rust': {
    severity: 'low',
    icon: '🦀',
    description: 'Common fungal rust disease with characteristic orange-brown pustules on leaves',
    organic: [
      'Apply sulfur-based organic fungicides',
      'Use plant-based essential oil treatments',
      'Implement beneficial microorganism applications',
      'Focus on plant nutrition for natural resistance'
    ],
    chemical: [
      'Use propiconazole or tebuconazole fungicides',
      'Apply strobilurin fungicides for systemic activity',
      'Consider tank mixing with different modes of action',
      'Time applications during early infection periods'
    ],
    cultural: [
      'Plant rust-resistant corn hybrids',
      'Ensure adequate plant nutrition',
      'Avoid excessive nitrogen fertilization',
      'Maintain proper plant spacing for air flow',
      'Monitor weather conditions for rust development'
    ],
    tips: {
      organic: 'Common rust usually doesn\'t require treatment unless conditions are very favorable for disease.',
      chemical: 'Fungicide treatments are rarely economical unless severe infection occurs early in season.',
      cultural: 'Plant genetic resistance and proper nutrition are usually sufficient for rust management.'
    }
  },
  'grape esca': {
    severity: 'high',
    icon: '🍇',
    description: 'Complex trunk disease causing leaf symptoms and eventual vine decline',
    organic: [
      'Apply Trichoderma-based biological treatments to pruning wounds',
      'Use paint pruning cuts with organic wound sealers',
      'Apply beneficial microorganism drenches',
      'Implement biodynamic preparations for vine health'
    ],
    chemical: [
      'Apply fungicide wound protectants after pruning',
      'Use sodium arsenite treatments (where legally permitted)',
      'Apply systemic fungicides through trunk injection',
      'Consider cyproconazole treatments for wound protection'
    ],
    cultural: [
      'Prune during dry weather conditions',
      'Remove and destroy infected wood immediately',
      'Avoid large pruning cuts and wounds',
      'Maintain vine vigor through proper nutrition',
      'Replace severely infected vines'
    ],
    tips: {
      organic: 'Prevention through proper pruning timing and wound protection is essential.',
      chemical: 'Trunk injection systems may provide systemic protection for valuable vines.',
      cultural: 'Early detection and removal of infected wood is critical to slow disease progression.'
    }
  },
  'grape leaf blight': {
    severity: 'moderate',
    icon: '🍂',
    description: 'Fungal disease causing leaf spots and defoliation in grape vines',
    organic: [
      'Apply copper-based organic fungicides',
      'Use sulfur treatments during growing season',
      'Implement beneficial bacterial sprays',
      'Apply compost tea for plant health'
    ],
    chemical: [
      'Use mancozeb or captan fungicides',
      'Apply strobilurin fungicides for systemic activity',
      'Consider tank mixes for broader disease control',
      'Use protectant fungicides during wet periods'
    ],
    cultural: [
      'Improve air circulation through canopy management',
      'Remove infected leaves and debris',
      'Avoid overhead irrigation',
      'Maintain proper vine spacing',
      'Practice good vineyard sanitation'
    ],
    tips: {
      organic: 'Focus on preventive applications during favorable disease conditions.',
      chemical: 'Rotate fungicide chemistries to prevent resistance development.',
      cultural: 'Canopy management for air flow is critical in humid growing conditions.'
    }
  },
  'peach bacterial spot': {
    severity: 'moderate',
    icon: '🍑',
    description: 'Bacterial infection affecting peach leaves, twigs, and fruit quality',
    organic: [
      'Apply copper-based organic bactericides',
      'Use beneficial bacteria (Bacillus spp.) as preventive treatment',
      'Implement plant resistance inducers',
      'Apply organic acids for bacterial suppression'
    ],
    chemical: [
      'Apply streptomycin sulfate (where legally permitted)',
      'Use copper hydroxide bactericides',
      'Consider kasugamycin for resistance management',
      'Apply oxytetracycline for severe infections'
    ],
    cultural: [
      'Plant resistant peach cultivars',
      'Prune trees for better air circulation',
      'Remove infected plant parts immediately',
      'Avoid overhead irrigation and leaf wetness',
      'Maintain proper orchard sanitation'
    ],
    tips: {
      organic: 'Preventive copper applications are most effective when applied before infection periods.',
      chemical: 'Antibiotic resistance management requires rotation of different active ingredients.',
      cultural: 'Cultivar selection is the most effective long-term management strategy.'
    }
  }
};

export function getTreatmentRecommendation(diseaseName: string): TreatmentRecommendation | null {
  const key = diseaseName.toLowerCase().trim();
  return treatmentDatabase[key] || null;
}

export function isHealthy(diseaseName: string): boolean {
  return diseaseName.toLowerCase().includes('healthy');
}
