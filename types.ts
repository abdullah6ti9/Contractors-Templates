export interface Project {
  id: string;
  title: string;
  category: 'Commercial' | 'Residential' | 'Mixed-Use' | 'Cultural';
  year: string;
  location: string;
  value: string;
  architect: string;
  image: string;
  blueprintImage: string;
  gridSpan: 'left-60' | 'right-60' | 'full' | 'half';
  description: string;
  specs: {
    sqft: string;
    concreteGrade: string;
    steelTonnage: string;
    leedStatus: string;
    structuralGrid: string;
    completionDuration: string;
  };
  features: string[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  svgIcon: string;
  technicalCapabilities: string[];
}

export interface ProcessStage {
  id: number;
  stageNumber: string;
  name: string;
  iconName: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  image: string;
}

export interface Metric {
  label: string;
  value: string;
  subtext: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  projectRef: string;
}
