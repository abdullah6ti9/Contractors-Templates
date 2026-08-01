import { Project, Service, ProcessStage, Testimonial } from '../types';

import heroImg from '../assets/images/hero_architecture_1785610630921.jpg';
import meridianImg from '../assets/images/meridian_tower_1785610650605.jpg';
import hudsonImg from '../assets/images/hudson_residence_1785610667591.jpg';
import ironworksImg from '../assets/images/ironworks_district_1785610686601.jpg';
import atelierImg from '../assets/images/the_atelier_1785610705807.jpg';

export { heroImg };

export const FIRM_DETAILS = {
  name: 'KILN & VAULT',
  tagline: 'Master Architectural Construction & Structural Engineering',
  established: 1999,
  offices: [
    { city: 'London', address: '45 Mayfair Square, W1J 8AJ' },
    { city: 'Geneva', address: 'Rue du Rhône 14, 1204' },
    { city: 'New York', address: '520 Madison Ave, NY 10022' },
  ],
  stats: {
    projectsCompleted: 500,
    yearsExperience: 25,
    portfolioValue: '$2.4B+',
    isoRating: 'ISO 9001:2015 & 14001',
    clientRating: '4.9 / 5.0',
    leedProjects: 'LEED Platinum Certified',
  }
};

export const SERVICES: Service[] = [
  {
    id: 'commercial',
    number: '01',
    title: 'Commercial Construction',
    shortDesc: 'Monolithic corporate headquarters and high-density towers built with surgical structural discipline.',
    fullDesc: 'We construct world-class commercial structures engineered for multi-generational longevity, ultra-efficient energy performance, and high structural load tolerance.',
    image: meridianImg,
    svgIcon: 'M4 4h16v16H4V4zm4 4v2h2V8H8zm6 0v2h2V8h-2zm-6 4v2h2v-2H8zm6 0v2h2v-2h-2zm-6 4v2h2v-2H8zm6 0v2h2v-2h-2z',
    technicalCapabilities: [
      'Post-tensioned concrete slabs with 18m un-columned spans',
      'Double-skin thermal glass curtain walls with low-E coating',
      'Advanced seismic vibration dampening systems',
      'BIM Level 3 real-time digital twin integration'
    ]
  },
  {
    id: 'residential',
    number: '02',
    title: 'Residential Development',
    shortDesc: 'Bespoke architectural compounds and high-end estates crafted with hand-selected natural materials.',
    fullDesc: 'Crafting private architectural residences where monolithic concrete, raw bronze, timber, and glass meet uncompromising interior perfection.',
    image: hudsonImg,
    svgIcon: 'M3 12l9-9 9 9M5 10v10h14V10M9 20v-6h6v6',
    technicalCapabilities: [
      'Board-formed architectural fair-face concrete walls',
      'Hidden thermal break cantilevered roof plates',
      'Acoustically isolated floor assemblies (STC 68)',
      'Custom motorized floor-to-ceiling glass panel tracks'
    ]
  },
  {
    id: 'steel',
    number: '03',
    title: 'Steel & Structural Engineering',
    shortDesc: 'Complex long-span steel trusses and heavy structural frameworks engineered to sub-millimeter tolerances.',
    fullDesc: 'Custom structural steel fabrication and erection for audacious cantilevers, stadium-scale spans, and complex industrial geometry.',
    image: ironworksImg,
    svgIcon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    technicalCapabilities: [
      'EN 1090-1 Execution Class 4 structural steel fabrication',
      'Ultrasonic & radiographic weld integrity verification',
      'Complex 3D parametric node connection design',
      'Corrosion-resistant weathering steel alloys'
    ]
  },
  {
    id: 'renovation',
    number: '04',
    title: 'Historic Renovation',
    shortDesc: 'Surgical preservation and structural reinforcement of landmark heritage edifices.',
    fullDesc: 'Fusing heritage masonry preservation with invisible modern structural underpinning, carbon-fiber strengthening, and smart HVAC integration.',
    image: atelierImg,
    svgIcon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z',
    technicalCapabilities: [
      'Micropile underpinning in restricted subterranean vaults',
      'Non-destructive radar wall testing & moisture mapping',
      'Lime-mortar brickwork restoration & stone carving',
      'Concealed seismic tie-rod reinforcement'
    ]
  },
  {
    id: 'management',
    number: '05',
    title: 'Project Management',
    shortDesc: 'Rigorous schedule execution, risk mitigation, and fiscal transparency for $10M+ developments.',
    fullDesc: 'Turnkey site control managed by senior structural engineers using 4D BIM scheduling, automated supply chain tracking, and strict site safety compliance.',
    image: heroImg,
    svgIcon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11',
    technicalCapabilities: [
      'Real-time drone photogrammetry site progress monitoring',
      'Earned Value Management (EVM) budget tracking',
      'Zero-incident safety culture (OSHA / ISO 45001)',
      'Global mill-to-site raw material tracking'
    ]
  },
  {
    id: 'design-build',
    number: '06',
    title: 'Design-Build Integration',
    shortDesc: 'Single-source responsibility combining architectural concept, engineering physics, and direct construction.',
    fullDesc: 'Eliminating friction between architect and contractor through unified pre-construction design modeling, value engineering, and direct artisan fabrication.',
    image: meridianImg,
    svgIcon: 'M12 4v16m8-8H4',
    technicalCapabilities: [
      'Integrated pre-construction cost modeling (5D BIM)',
      'In-house structural engineering & FEA stress analysis',
      'Rapid prototype mockups of critical exterior joints',
      'Guaranteed Maximum Price (GMP) delivery models'
    ]
  }
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    id: 1,
    stageNumber: '01',
    name: 'Discovery',
    iconName: 'Compass',
    subtitle: 'Site Physics & Feasibility',
    description: 'Geotechnical soil analysis, seismic hazard profiling, microclimate modeling, and municipal zoning envelope calculation.',
    deliverables: ['Subterranean Geotechnical Survey', 'Environmental Baseline', '3D Massing Feasibility Envelope'],
    image: heroImg
  },
  {
    id: 2,
    stageNumber: '02',
    name: 'Design',
    iconName: 'PenTool',
    subtitle: 'Architectural Synthesis',
    description: 'Translating design intent into precise spatial coordinates, material selections, structural grids, and energy performance targets.',
    deliverables: ['BIM Level 3 Architectural Model', 'Material Palette Spec Sheet', 'Façade Thermal Dynamics Simulation'],
    image: hudsonImg
  },
  {
    id: 3,
    stageNumber: '03',
    name: 'Engineering',
    iconName: 'Cpu',
    subtitle: 'Structural Calculation',
    description: 'Finite element stress calculations, load path optimization, steel node design, and MEP subterranean network routing.',
    deliverables: ['FEA Structural Calculations', 'Steel Connection Detail Diagrams', 'Acoustic & Vibration Matrix'],
    image: ironworksImg
  },
  {
    id: 4,
    stageNumber: '04',
    name: 'Construction',
    iconName: 'Hammer',
    subtitle: 'Physical Execution',
    description: 'Precision excavation, concrete pour sequencing, heavy crane lift operations, and micron-level curtain wall alignment.',
    deliverables: ['Daily Drone Survey Telemetry', 'Mill Test Material Certifications', 'Third-Party QC Inspector Logs'],
    image: meridianImg
  },
  {
    id: 5,
    stageNumber: '05',
    name: 'Delivery',
    iconName: 'Key',
    subtitle: 'Commissioning & Handover',
    description: 'Air tightness testing, building system balancing, digital twin asset transfer, and concierge facility orientation.',
    deliverables: ['LEED Platinum Certificate', 'As-Built Digital Twin Model', '50-Year Structural Integrity Warranty'],
    image: atelierImg
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'meridian-tower',
    title: 'The Meridian Tower',
    category: 'Commercial',
    year: '2024',
    location: 'London, UK (City Financial District)',
    value: '$145M',
    architect: 'Foster & Partners / KILN & VAULT Engineering',
    image: meridianImg,
    blueprintImage: meridianImg,
    gridSpan: 'left-60',
    description: 'A 42-story commercial skyscraper featuring an exposed diagrid steel superstructure, triple-glazed thermal skin, and a 6-story subterranean parking vault built directly above an active underground rail line.',
    specs: {
      sqft: '420,000 sq ft',
      concreteGrade: 'C80/95 High-Strength Self-Consolidating',
      steelTonnage: '8,400 Metric Tons',
      leedStatus: 'LEED Platinum & WELL Gold',
      structuralGrid: '18m x 12m Un-columned Perimeter',
      completionDuration: '28 Months (On Schedule)'
    },
    features: [
      'Exposed obsidian structural diagrid bracing',
      'Dynamic tuned mass damper suspended on floor 40',
      'Integrated rainwater harvesting and solar glass louvers',
      'Subterranean slurry wall foundation down to 48 meters'
    ]
  },
  {
    id: 'hudson-residence',
    title: 'Hudson Cliffside Estate',
    category: 'Residential',
    year: '2023',
    location: 'Upstate New York, USA',
    value: '$28M',
    architect: 'Olson Kundig / KILN & VAULT',
    image: hudsonImg,
    blueprintImage: hudsonImg,
    gridSpan: 'right-60',
    description: 'A monolithic 14,000 sq ft private residence cantilevered 60 feet over a river bluff, constructed from off-shutter white concrete, Swiss-engineered sliding glass panels, and scorched yakisugi timber.',
    specs: {
      sqft: '14,200 sq ft',
      concreteGrade: 'White Architectural Fair-Face (Titanium Dioxide additive)',
      steelTonnage: '420 Metric Tons Weathering Steel',
      leedStatus: 'Net-Zero Passive House Certified',
      structuralGrid: '60ft Double Cantilever Pin Joint',
      completionDuration: '18 Months'
    },
    features: [
      'Hydraulically operated 30ft motorized vertical glass wall',
      'Geothermal loop field with 12 subterranean boreholes',
      'Integrated infinity rim pool embedded into bedrock',
      'Acoustically isolated private recording laboratory'
    ]
  },
  {
    id: 'ironworks-district',
    title: 'Ironworks Master Complex',
    category: 'Mixed-Use',
    year: '2022',
    location: 'Zurich, Switzerland',
    value: '$82M',
    architect: 'Herzog & de Meuron / KILN & VAULT',
    image: ironworksImg,
    blueprintImage: ironworksImg,
    gridSpan: 'full',
    description: 'Conversion of a former 19th-century locomotive factory into a multi-purpose cultural, office, and residential campus with custom bronze structural beams and a sweeping glass atrium.',
    specs: {
      sqft: '210,000 sq ft',
      concreteGrade: 'Recycled Aggregate Low-Carbon Concrete',
      steelTonnage: '3,100 Metric Tons Structural Bronze & Steel',
      leedStatus: 'BREEAM Outstanding',
      structuralGrid: '24m Trusses with Cable Suspensions',
      completionDuration: '22 Months'
    },
    features: [
      'Restored historic riveted iron arches coupled with modern steel',
      'Automated natural ventilation atrium louvers',
      'Subterranean district thermal energy vault',
      'Floating steel pedestrian catwalks'
    ]
  },
  {
    id: 'the-atelier',
    title: 'The Atelier Cultural Pavilion',
    category: 'Cultural',
    year: '2021',
    location: 'Geneva, Switzerland',
    value: '$34M',
    architect: 'Peter Zumthor / KILN & VAULT',
    image: atelierImg,
    blueprintImage: atelierImg,
    gridSpan: 'half',
    description: 'A sculptural art gallery and performance pavilion set along Lake Geneva, featuring catenary concrete arches, quiet subterranean acoustic chambers, and an undulating water pool reflector.',
    specs: {
      sqft: '48,000 sq ft',
      concreteGrade: 'Pigmented Charcoal Architectural Concrete',
      steelTonnage: '890 Metric Tons Custom Forged Steel',
      leedStatus: 'Minergie-P-ECO Standard',
      structuralGrid: 'Catenary Shell Vault System',
      completionDuration: '16 Months'
    },
    features: [
      'Continuous 120-meter jointless concrete floor slab',
      'Precision acoustic baffle ceiling cast in-situ',
      'Subaquatic gallery viewing windows',
      'Museum-grade climate stabilization systems (+/- 0.5°C)'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "KILN & VAULT didn't just build our headquarters. They engineered our identity into every square millimeter of raw concrete and steel.",
    author: "Henri Vance",
    title: "Chief Executive Officer",
    company: "Vance Financial Holdings",
    projectRef: "The Meridian Tower"
  },
  {
    id: '2',
    quote: "Precision that borders on obsession. When you are hanging a 60-foot cantilever over a rock cliff, there is zero room for error. They executed flawlessly.",
    author: "Elena Rostova",
    title: "Managing Director",
    company: "Apex Real Estate Development",
    projectRef: "Hudson Cliffside Estate"
  },
  {
    id: '3',
    quote: "The seamless integration between structural physics and architectural elegance made our 200,000 sq ft industrial conversion a global benchmark.",
    author: "Dr. Marcus Thorne",
    title: "Director of Facilities",
    company: "Zurich Cultural Foundation",
    projectRef: "Ironworks Master Complex"
  }
];
