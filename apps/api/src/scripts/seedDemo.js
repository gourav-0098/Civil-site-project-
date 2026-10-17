import { connectDB, disconnectDB } from '../config/db.js';
import { Project } from '../models/Project.js';
import { User } from '../models/User.js';

const DEMO_PROPERTIES = [
  {
    title: 'The Skyview Residences',
    slug: 'the-skyview-residences',
    category: 'Residential Flats & Apartments',
    location: 'Worli Sea Face, South Mumbai, Maharashtra',
    developerName: 'Horizon Luxury Estates Ltd.',
    clientName: 'Horizon Luxury Estates Ltd.',
    price: '₹3.85 Cr – ₹7.20 Cr',
    priceNumeric: 38500000,
    configuration: '3 & 4 BHK Sea-Facing Residences',
    area: '2,150 – 3,800 sq.ft.',
    possessionDate: 'Ready to Move',
    reraId: '',
    isDemo: true,
    constructionStatus: 'Ready to Move',
    publicationStatus: 'Published',
    archiveStatus: 'Active',
    isFeatured: true,
    amenities: [
      'Infinity Lap Pool',
      'Sky Lounge & Observatory',
      'State-of-the-Art Fitness Center',
      '24/7 Multi-Tier Concierge & Security',
      'Automated Multi-Level Covered Parking',
      'High-Speed Private Elevators',
      'Landscaped Zen Garden'
    ],
    timeline: {
      startDate: new Date('2020-03-01'),
      completionDate: new Date('2024-06-30')
    },
    shortDescription: 'Exclusive sea-facing high-rise apartments offering panoramic views of the Arabian Sea, private lift access, and world-class luxury amenities. Marketed exclusively by Nivara Infrastructure.',
    fullDescription: 'The Skyview Residences represents the pinnacle of contemporary coastal living in South Mumbai. Developed by Horizon Luxury Estates and marketed by Nivara Infrastructure, this development offers discerning homebuyers ultra-spacious 3 and 4-bedroom residences designed for privacy, natural cross-ventilation, and expansive sea vistas.\n\nEach residence is finished with Italian marble flooring, floor-to-ceiling soundproof acoustic double glazing, modular European kitchens, and pre-integrated smart automation systems. Residents enjoy access to a 20,000 sq.ft. private clubhouse, an elevated infinity pool overlooking the coastline, and dedicated concierge hospitality services.\n\n*Listing Disclaimer: Marketed by Nivara Infrastructure. Developed and constructed by Horizon Luxury Estates Ltd. All specifications, floor plans, and pricing are subject to verification upon inquiry.*',
    scopeOfWork: [
      'Private viewing and priority site tour coordination',
      'Detailed unit floor-plan and architectural layout consultation',
      'Direct developer sales negotiation and transaction facilitation',
      'End-to-end documentation, banking loan assistance, and registry support'
    ],
    specifications: [
      { label: 'Tower Configuration', value: 'Ground + 42 Residential Floors' },
      { label: 'Available Unit Types', value: '3 BHK, 4 BHK & Duplex Penthouses' },
      { label: 'Carpet Area Range', value: '2,150 – 3,800 sq.ft.' },
      { label: 'Ceiling Clear Height', value: '11.5 Feet Floor-to-Ceiling' },
      { label: 'Parking Allocation', value: '2 to 3 Covered Bays per Unit' },
      { label: 'Possession Status', value: 'Ready to Move (Occupancy Certificate Issued)' }
    ],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      publicId: 'demo_skyview_cover',
      alt: 'Luxury modern residential apartment tower',
      caption: 'The Skyview Residences — Architectural facade overlooking coastal bay.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_skyview_1',
        alt: 'Modern luxury living room interior with large windows',
        caption: 'Expansive open-plan living room with natural daylight and ocean vistas.',
        order: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_skyview_2',
        alt: 'Modern designer kitchen with island',
        caption: 'Fully-fitted European modular kitchen with integrated appliances.',
        order: 2
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_skyview_3',
        alt: 'Infinity swimming pool with city view',
        caption: 'Rooftop infinity swimming pool and resident lounge.',
        order: 3
      }
    ],
    video: {
      provider: 'youtube',
      url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
      embedUrl: 'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4',
      publicId: 'ScMzIvxBSi4'
    },
    seo: {
      title: 'The Skyview Residences | Luxury Apartments in Worli | Nivara Infrastructure',
      description: 'Explore 3 & 4 BHK sea-facing luxury apartments at The Skyview Residences, Worli. Marketed by Nivara Infrastructure.',
      keywords: ['luxury flats', 'Worli sea face', 'residential apartments', 'Mumbai property', 'Nivara Infrastructure']
    }
  },
  {
    title: 'Palm Meadows Gated Community',
    slug: 'palm-meadows-gated-community',
    category: 'Residential Societies & Gated Communities',
    location: 'Whitefield - Sarjapur Link Road, Bengaluru, Karnataka',
    developerName: 'Sterling Greenfield Developers Pvt. Ltd.',
    clientName: 'Sterling Greenfield Developers Pvt. Ltd.',
    price: '₹1.85 Cr – ₹3.40 Cr',
    priceNumeric: 18500000,
    configuration: '3 & 4 BHK Luxury Villas & Townhomes',
    area: '2,600 – 4,100 sq.ft.',
    possessionDate: 'December 2025',
    reraId: '',
    isDemo: true,
    constructionStatus: 'Under Construction',
    publicationStatus: 'Published',
    archiveStatus: 'Active',
    isFeatured: true,
    amenities: [
      'Private Clubhouse (35,000 sq.ft.)',
      'Tennis & Badminton Courts',
      'Dedicated Jogging & Cycling Tracks',
      'Solar Power Infrastructure',
      'Children’s Interactive Play Park',
      'Rainwater Harvesting & Lakefront Deck',
      'Round-the-Clock Perimeter Security'
    ],
    timeline: {
      startDate: new Date('2022-09-15'),
      estimatedCompletionDate: new Date('2025-12-31')
    },
    shortDescription: 'An idyllic 45-acre master-planned gated enclave featuring independent luxury villas, private garden courtyards, and over 70% open green landscapes in Bengaluru’s tech corridor.',
    fullDescription: 'Palm Meadows Gated Community is an eco-sensitive residential society tailored for families seeking space, calm, and community in east Bengaluru. Developed by Sterling Greenfield Developers and represented for marketing by Nivara Infrastructure, the township includes 180 bespoke triplex villas bordered by landscaped avenues and tree-lined walkways.\n\nEach villa features double-height foyer spaces, private rooftop terrace entertainment decks, domestic helper quarters, and dual covered car porches. The community is pre-certified IGBC Green Gold with decentralized organic waste converters and high-efficiency water treatment systems.\n\n*Listing Disclaimer: Marketed by Nivara Infrastructure. The property is engineered and developed by Sterling Greenfield Developers Pvt. Ltd. Contact our advisory team for stage-wise construction inspection schedules.*',
    scopeOfWork: [
      'Comprehensive community master plan and villa orientation walkthroughs',
      'Buyer pre-qualification and allotment assistance',
      'Coordination of personalized interior modification packages with developer',
      'Construction milestone updates and escrow account payment advisories'
    ],
    specifications: [
      { label: 'Total Enclave Area', value: '45 Acres Master Planned' },
      { label: 'Total Villa Inventory', value: '180 Independent Homes' },
      { label: 'Green Open Space Ratio', value: '72% Landscaped Open Area' },
      { label: 'Villa Structure', value: 'Ground + 2 Floors + Private Terrace' },
      { label: 'Power Backup', value: '100% DG Back-up for Homes and Common Areas' },
      { label: 'Handover Phase', value: 'Phase 1: June 2025 | Phase 2: Dec 2025' }
    ],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80',
      publicId: 'demo_palm_cover',
      alt: 'Luxury modern villa in gated residential society',
      caption: 'Palm Meadows — Elegant independent villas immersed in green tranquility.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_palm_1',
        alt: 'Contemporary villa exterior with manicured lawn',
        caption: 'Bespoke contemporary facade with landscaped private lawn.',
        order: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_palm_2',
        alt: 'Open-concept villa dining and living area',
        caption: 'Double-height living space flowing smoothly onto the private patio.',
        order: 2
      }
    ],
    video: {
      provider: 'none',
      url: '',
      embedUrl: '',
      publicId: ''
    },
    seo: {
      title: 'Palm Meadows Gated Community | Luxury Villas in Bengaluru | Nivara Infrastructure',
      description: 'Discover independent luxury villas at Palm Meadows, Whitefield-Sarjapur corridor. Marketed by Nivara Infrastructure.',
      keywords: ['gated community', 'villas in Bangalore', 'luxury housing', 'property sales', 'Nivara Infrastructure']
    }
  },
  {
    title: 'Aura Grand Urban Apartments',
    slug: 'aura-grand-urban-apartments',
    category: 'Residential Flats & Apartments',
    location: 'Banjara Hills Extension, Hyderabad, Telangana',
    developerName: 'Aura Urban Living Projects LLP',
    clientName: 'Aura Urban Living Projects LLP',
    price: '₹95 Lakh – ₹1.65 Cr',
    priceNumeric: 9500000,
    configuration: '2 & 3 BHK Contemporary Flats',
    area: '1,280 – 1,940 sq.ft.',
    possessionDate: 'Ready to Move',
    reraId: '',
    isDemo: true,
    constructionStatus: 'Ready to Move',
    publicationStatus: 'Published',
    archiveStatus: 'Active',
    isFeatured: true,
    amenities: [
      'Rooftop Swimming Pool',
      'Multipurpose Community Hall',
      'Equipped Gymnasium & Yoga Studio',
      'High-Speed Elevators with Power Backup',
      'EV Charging Stations in Basement',
      '24/7 Security with CCTV Surveillance',
      'Landscaped Terrace Seating'
    ],
    timeline: {
      startDate: new Date('2021-06-01'),
      completionDate: new Date('2024-03-31')
    },
    shortDescription: 'Ready-to-move 2 and 3 BHK apartments situated in Hyderabad’s prime cultural and commercial neighborhood, offering intelligent floor plans and swift connectivity.',
    fullDescription: 'Aura Grand Urban Apartments delivers contemporary metropolitan living designed for professionals and families. Constructed by Aura Urban Living Projects and marketed through Nivara Infrastructure, the development blends urban accessibility with modern conveniences.\n\nUnits are designed according to Vastu principles with unhindered ventilation, anti-skid premium vitrified flooring, and designer sanitaryware. The community is conveniently located within minutes of IT corridors, leading healthcare centers, and renowned schools.\n\n*Listing Disclaimer: Marketed by Nivara Infrastructure. Constructed and delivered by Aura Urban Living Projects LLP. Please verify ready unit availability and current registry procedures with our sales advisors.*',
    scopeOfWork: [
      'Ready-to-move flat inspection and inventory reservation',
      'Comparative pricing and market rental yield analysis for investors',
      'Bank home loan pre-approvals and documentation advisory',
      'Direct coordination with developer for key handover and title transfer'
    ],
    specifications: [
      { label: 'Project Density', value: '140 Premium Residences' },
      { label: 'Apartment Configurations', value: '2 BHK (1,280 sq.ft.) & 3 BHK (1,940 sq.ft.)' },
      { label: 'Flooring', value: 'High-Gloss Glazed Vitrified Tiles (800x1600mm)' },
      { label: 'Elevators', value: '3 High-Speed Passenger Elevators + 1 Service Lift' },
      { label: 'Water Supply', value: 'Continuous Municipal Supply + Dual Borewell Backup' },
      { label: 'Occupancy Status', value: 'Ready to Move with Full Clearance' }
    ],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=80',
      publicId: 'demo_aura_cover',
      alt: 'Modern residential apartment building exterior',
      caption: 'Aura Grand — Premium 2 & 3 BHK apartments in prime Hyderabad.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_aura_1',
        alt: 'Warm contemporary apartment interior',
        caption: 'Thoughtfully planned living space with natural ventilation.',
        order: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_aura_2',
        alt: 'Modern master bedroom with wooden flooring',
        caption: 'Comfortable master bedroom with laminated wood flooring.',
        order: 2
      }
    ],
    video: {
      provider: 'none',
      url: '',
      embedUrl: '',
      publicId: ''
    },
    seo: {
      title: 'Aura Grand Urban Apartments | Ready 2 & 3 BHK | Nivara Infrastructure',
      description: 'Inspect ready-to-move 2 & 3 BHK flats at Aura Grand, Banjara Hills Extension. Marketed by Nivara Infrastructure.',
      keywords: ['ready to move flats', 'Hyderabad apartments', 'Banjara Hills property', '2 BHK', '3 BHK']
    }
  },
  {
    title: 'The Pinnacle Commercial Business Suites',
    slug: 'the-pinnacle-commercial-business-suites',
    category: 'Commercial Properties',
    location: 'Cyber City Sector 29, Gurugram, NCR',
    developerName: 'Pinnacle Corporate Infrastructures Ltd.',
    clientName: 'Pinnacle Corporate Infrastructures Ltd.',
    price: '₹1.10 Cr – ₹6.50 Cr',
    priceNumeric: 11000000,
    configuration: 'Grade-A Office Suites & Retail Spaces',
    area: '850 – 5,200 sq.ft.',
    possessionDate: 'March 2026',
    reraId: '',
    isDemo: true,
    constructionStatus: 'Under Construction',
    publicationStatus: 'Published',
    archiveStatus: 'Active',
    isFeatured: true,
    amenities: [
      'Double-Height Grand Corporate Atrium',
      'LEED Platinum Pre-Certified Building',
      'Central Chilled-Water Air Conditioning',
      '100% Uninterrupted Power Back-Up (N+1)',
      'High-Speed Destination-Controlled Lifts',
      'Food Court, Cafes & Business Lounges',
      'Advanced 3-Tier Fire Suppression & Security'
    ],
    timeline: {
      startDate: new Date('2023-01-10'),
      estimatedCompletionDate: new Date('2026-03-31')
    },
    shortDescription: 'Grade-A corporate office suites and high-street retail showrooms engineered for IT corporations, financial firms, and boutique practices in Gurugram’s commercial core.',
    fullDescription: 'The Pinnacle is a flagship commercial development designed to meet the rigorous operational standards of international enterprises and expanding businesses. Marketed on behalf of Pinnacle Corporate Infrastructures by Nivara Infrastructure, the complex provides flexible floor plates that can accommodate boutique 850 sq.ft. suites or contiguous whole-floor headquarters up to 28,000 sq.ft.\n\nThe tower incorporates energy-efficient double-glazed Low-E facade glazing, advanced indoor air purification with MERV-13 filtration, and touchless destination dispatch elevators.\n\n*Listing Disclaimer: Marketed by Nivara Infrastructure. Developed by Pinnacle Corporate Infrastructures Ltd. Commercial leasing and purchase terms are subject to standard developer agreements.*',
    scopeOfWork: [
      'Commercial space requirement mapping and floor plate feasibility analysis',
      'Investor ROI assessment, projected rental yields, and capital appreciation models',
      'Direct developer commercial lease-to-buy negotiation',
      'Legal verification and corporate transfer transaction support'
    ],
    specifications: [
      { label: 'Building Classification', value: 'Grade-A Corporate Tower (LEED Platinum)' },
      { label: 'Total Built-up Area', value: '450,000 sq. ft. Commercial & Retail' },
      { label: 'Floor-to-Floor Height', value: '4.2 Meters Commercial Clear Height' },
      { label: 'Power Backup', value: '100% Redundant Diesel Generator Capacity' },
      { label: 'Car Parking Capacity', value: 'Over 800 Basement Stalls + Valet Service' },
      { label: 'Handover Condition', value: 'Bare-Shell & Warm-Shell Options Available' }
    ],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      publicId: 'demo_pinnacle_cover',
      alt: 'Glass modern corporate office building skyscraper',
      caption: 'The Pinnacle — Iconic Grade-A commercial architecture in Cyber City.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_pinnacle_1',
        alt: 'Modern corporate office interior',
        caption: 'Flexible column-free office floor plates adaptable for modern work styles.',
        order: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_pinnacle_2',
        alt: 'Bright executive conference room',
        caption: 'Shared business center facilities and executive meeting suites.',
        order: 2
      }
    ],
    video: {
      provider: 'none',
      url: '',
      embedUrl: '',
      publicId: ''
    },
    seo: {
      title: 'The Pinnacle Commercial Suites | Gurugram Office Spaces | Nivara Infrastructure',
      description: 'Discover Grade-A commercial office suites in Cyber City Gurugram. Marketed by Nivara Infrastructure.',
      keywords: ['commercial property', 'office space', 'Gurugram commercial', 'retail shops', 'Nivara Infrastructure']
    }
  },
  {
    title: 'Emerald Valley Residential Enclave',
    slug: 'emerald-valley-residential-enclave',
    category: 'Residential Plots',
    location: 'Devanahalli Airport Highway Corridor, Bengaluru, Karnataka',
    developerName: 'Greenfield Landholdings & Developers',
    clientName: 'Greenfield Landholdings & Developers',
    price: '₹52 Lakh – ₹1.15 Cr',
    priceNumeric: 5200000,
    configuration: 'Villa Plots (1,200 to 2,400 sq.ft.)',
    area: '1,200 – 2,400 sq.ft. Plots',
    possessionDate: 'Immediate Registration',
    reraId: '',
    isDemo: true,
    constructionStatus: 'Ready to Move',
    publicationStatus: 'Published',
    archiveStatus: 'Active',
    isFeatured: false,
    amenities: [
      'Gated Boundary Wall with Security Gate',
      'Blacktop Asphalt Wide Internal Roads (40ft & 30ft)',
      'Underground Electrical & Water Connections',
      'LED Solar Street Lighting',
      'Themed Landscape Parks & Herb Gardens',
      'Clubhouse with Swimming Pool & Sports Lawn',
      'Rainwater Recharge Wells'
    ],
    timeline: {
      startDate: new Date('2022-01-10'),
      completionDate: new Date('2023-11-20')
    },
    shortDescription: 'Clear-title approved plotted development positioned along Bengaluru’s international airport growth corridor, ready for immediate registration and custom villa construction.',
    fullDescription: 'Emerald Valley offers strategic land investment and the ideal canvas for building your custom dream home. Marketed by Nivara Infrastructure in partnership with Greenfield Landholdings, the plotted layout spans 30 acres with comprehensive underground infrastructure already fully installed.\n\nThe layout is approved by municipal authorities with all individual plot demarcations, concrete curbs, tree avenues, and dual water supply connections in place.\n\n*Listing Disclaimer: Marketed by Nivara Infrastructure. Plotted development executed by Greenfield Landholdings & Developers. Title documents available for review by prospective buyers.*',
    scopeOfWork: [
      'Site layout inspection and individual plot selection assistance',
      'Title document inspection and legal clearance review',
      'Coordination with approved architects for custom villa blueprints',
      'Registration assistance at the local sub-registrar office'
    ],
    specifications: [
      { label: 'Layout Scale', value: '30 Acres Approved Plotted Development' },
      { label: 'Plot Dimensions', value: '30x40 (1,200 sq.ft.) & 40x60 (2,400 sq.ft.)' },
      { label: 'Internal Road Width', value: '40 Feet Main Avenues & 30 Feet Cross Roads' },
      { label: 'Utility Reticulation', value: '100% Underground Cabling & Piped Water' },
      { label: 'Title Clearance', value: 'Approved Clear Title with Bank Loan Tie-ups' },
      { label: 'Registration Status', value: 'Immediate Registration Ready' }
    ],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
      publicId: 'demo_emerald_cover',
      alt: 'Serene green open landscape for plotted residential development',
      caption: 'Emerald Valley — Approved premium villa plots near Airport Corridor.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_emerald_1',
        alt: 'Wide tree-lined asphalt road inside residential layout',
        caption: 'Paved avenues with underground utilities and solar illumination.',
        order: 1
      }
    ],
    video: {
      provider: 'none',
      url: '',
      embedUrl: '',
      publicId: ''
    },
    seo: {
      title: 'Emerald Valley Villa Plots | Airport Road Bengaluru | Nivara Infrastructure',
      description: 'Approved residential plots for sale near Bengaluru Airport. Marketed by Nivara Infrastructure.',
      keywords: ['residential plots', 'villa plots Bangalore', 'land investment', 'Devanahalli plots']
    }
  },
  {
    title: 'Serenity Lakeview Penthouses',
    slug: 'serenity-lakeview-penthouses',
    category: 'Luxury Residences',
    location: 'Jubilee Hills Lakeside, Hyderabad, Telangana',
    developerName: 'Serenity Premier Living LLP',
    clientName: 'Serenity Premier Living LLP',
    price: '₹5.50 Cr – ₹9.80 Cr',
    priceNumeric: 55000000,
    configuration: '4 & 5 BHK Duplex Penthouses',
    area: '4,500 – 6,800 sq.ft.',
    possessionDate: 'Pre-Launch / Q1 2027',
    reraId: '',
    isDemo: true,
    constructionStatus: 'Upcoming / Pre-Launch',
    publicationStatus: 'Published',
    archiveStatus: 'Active',
    isFeatured: true,
    amenities: [
      'Private Plunge Pool on Every Terrace',
      'Panoramic 360-Degree Lake & City Views',
      'Private Temperature-Controlled Wine Cellar',
      'Automated Valet Parking with 4 Designated Bays',
      'Personal Butler & Concierge Desk',
      'Direct Biometric Elevator Access'
    ],
    timeline: {
      startDate: new Date('2024-04-01'),
      estimatedCompletionDate: new Date('2027-03-31')
    },
    shortDescription: 'Ultra-exclusive duplex penthouses overlooking the historic lake, offering private terrace plunge pools, private elevator entries, and bespoke customized interiors. Marketed by Nivara Infrastructure.',
    fullDescription: 'Serenity Lakeview represents the pinnacle of private luxury living in Hyderabad’s most distinguished enclave. Marketed on behalf of Serenity Premier Living by Nivara Infrastructure, this limited collection consists of just 12 limited-edition duplex penthouses.\n\nDesigned by international architectural consultants, each home incorporates an expansive double-height terrace garden with a heated infinity plunge pool, private elevator vestibules, dedicated quarters for personal staff, and imported floor finishes.\n\n*Listing Disclaimer: Marketed by Nivara Infrastructure. Developed by Serenity Premier Living LLP. Pre-launch expressions of interest are registered strictly according to statutory permissions and developer verification.*',
    scopeOfWork: [
      'Confidential high-net-worth buyer advisory and portfolio matching',
      'Private developer architectural review and layout customisation meetings',
      'Structured installment payment schedule and escrow contract consultation',
      'End-to-end luxury asset transaction management'
    ],
    specifications: [
      { label: 'Collection Exclusivity', value: 'Limited Edition (Only 12 Penthouses)' },
      { label: 'Unit Sizes', value: '4,500 to 6,800 sq.ft. Duplex Layouts' },
      { label: 'Terrace Feature', value: 'Private Heated Plunge Pool & Deck' },
      { label: 'Elevator Security', value: 'Direct Biometric Keyed Elevator Access' },
      { label: 'Parking Provision', value: '4 Dedicated Basement Stalls per Penthouse' },
      { label: 'Current Status', value: 'Upcoming / Verified Pre-Launch Stage' }
    ],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      publicId: 'demo_serenity_cover',
      alt: 'Luxury duplex penthouse terrace overlooking lake',
      caption: 'Serenity Lakeview — Limited-edition luxury penthouses with private terrace pools.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_serenity_1',
        alt: 'Ultra-luxury penthouse living room with double height ceiling',
        caption: 'Double-height glass facade with tranquil lake views.',
        order: 1
      }
    ],
    video: {
      provider: 'none',
      url: '',
      embedUrl: '',
      publicId: ''
    },
    seo: {
      title: 'Serenity Lakeview Penthouses | Jubilee Hills Luxury | Nivara Infrastructure',
      description: 'Exclusive 4 & 5 BHK duplex penthouses in Jubilee Hills Hyderabad. Marketed by Nivara Infrastructure.',
      keywords: ['luxury penthouses', 'Jubilee Hills property', 'Hyderabad luxury residences', 'Nivara Infrastructure']
    }
  }
];

async function seedDemo() {
  try {
    console.log('🌱 Seeding real estate demonstration properties for Nivara Infrastructure...');
    await connectDB();

    const admin = await User.findOne({ role: 'superadmin' });
    const adminId = admin ? admin._id : null;

    let seededCount = 0;

    for (const propertyData of DEMO_PROPERTIES) {
      const updateData = {
        ...propertyData,
        createdBy: adminId,
        updatedBy: adminId
      };

      await Project.findOneAndUpdate(
        { slug: propertyData.slug },
        updateData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      seededCount++;
      console.log(`  ✓ Seeded/Updated property: ${propertyData.title} (${propertyData.category}) - ${propertyData.price}`);
    }

    console.log(`\n🎉 Successfully seeded ${seededCount} real estate demonstration properties.`);
    console.log('📌 All properties communicate Nivara Infrastructure marketing role and credit respective developers.');

    await disconnectDB();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed demonstration properties:', err.message);
    process.exit(1);
  }
}

seedDemo();
