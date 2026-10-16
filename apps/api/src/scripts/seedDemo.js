import { connectDB, disconnectDB } from '../config/db.js';
import { Project } from '../models/Project.js';
import { User } from '../models/User.js';

const DEMO_PROJECTS = [
  {
    title: 'Western Coastal Elevated Viaduct',
    slug: 'western-coastal-elevated-viaduct',
    category: 'Highways & Bridges',
    location: 'Mumbai-Goa Coastal Corridor, Maharashtra',
    clientName: 'State Road Development Corporation (Demonstration)',
    constructionStatus: 'Ongoing',
    publicationStatus: 'Published',
    archiveStatus: 'Active',
    isFeatured: true,
    timeline: {
      startDate: new Date('2023-03-15'),
      estimatedCompletionDate: new Date('2027-11-30')
    },
    shortDescription: 'A 24.8-kilometer eight-lane elevated marine expressway viaduct engineered with pre-stressed segmental concrete box girders to bypass high-density coastal settlements.',
    fullDescription: 'The Western Coastal Elevated Viaduct represents a landmark demonstration in maritime civil engineering and high-capacity traffic management. Constructed across tidal inlets and sensitive coastal estuaries, this corridor incorporates seismic-resistant deep pile foundations drilled up to 45 meters into seabed bedrock.\n\nEmploying twin self-launching gantry systems, the engineering plan minimizes ground footprint while delivering exceptional structural durability designed for a 120-year operational design life against saline corrosion.',
    scopeOfWork: [
      'Fabrication and erection of 1,840 precast prestressed segmental box girders',
      'Installation of 45-meter-deep marine monopile foundations under tidal conditions',
      'Integration of continuous automated structural health monitoring (SHM) fiber sensors',
      'Advanced coastal erosion barriers and hydrodynamic scour protection buffers'
    ],
    specifications: [
      { label: 'Total Viaduct Length', value: '24.8 km' },
      { label: 'Carriageway Configuration', value: 'Dual 4-Lane + Emergency Shoulders' },
      { label: 'Structural Concrete Volume', value: '420,000 m³ (M60 High-Performance Grade)' },
      { label: 'Reinforcement Steel', value: '98,000 Metric Tonnes' },
      { label: 'Design Speed', value: '100 km/h' },
      { label: 'Environmental Classification', value: 'Severe Marine Exposure (BS 8500-1)' }
    ],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80',
      publicId: 'demo_viaduct_cover',
      alt: 'Elevated highway viaduct concrete construction at sunset',
      caption: 'Mainline viaduct segmental span erection over coastal tidal inlet.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_viaduct_1',
        alt: 'Heavy civil construction cranes working on piers',
        caption: 'Heavy pier-cap reinforcement and hydraulic formwork positioning.',
        order: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_viaduct_2',
        alt: 'High-altitude construction view of bridge deck',
        caption: 'Segmental box girder deck alignment prior to post-tensioning.',
        order: 2
      },
      {
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_viaduct_3',
        alt: 'Civil engineers inspecting bridge structure',
        caption: 'Quality control engineers verifying rebar clearances and duct alignment.',
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
      title: 'Western Coastal Elevated Viaduct | Nivara Infrastructure',
      description: 'Explore the Western Coastal Elevated Viaduct demonstration project: 24.8 km marine viaduct engineered with precast segmental technology.',
      keywords: ['viaduct', 'marine engineering', 'elevated highway', 'civil construction', 'bridge']
    }
  },
  {
    title: 'Godavari River Cable-Stayed Bridge',
    slug: 'godavari-river-cable-stayed-bridge',
    category: 'Highways & Bridges',
    location: 'Rajahmundry Regional Bypass, Andhra Pradesh',
    clientName: 'National Highway Infrastructure Authority (Demonstration)',
    constructionStatus: 'Completed',
    publicationStatus: 'Published',
    archiveStatus: 'Active',
    isFeatured: true,
    timeline: {
      startDate: new Date('2020-01-10'),
      completionDate: new Date('2024-08-15')
    },
    shortDescription: 'A signature 4.2-kilometer cable-stayed river crossing featuring twin 145-meter inverted-Y concrete pylons and aerodynamic steel-concrete composite deck.',
    fullDescription: 'The Godavari River Cable-Stayed Bridge is an architectural and structural engineering showpiece designed to bridge a dynamic, flood-prone river basin. With a primary navigational span of 480 meters, the structure allows uninterrupted inland river navigation during high monsoonal discharge.\n\nThe bridge incorporates 112 high-tensile parallel strand stay cables equipped with internal damping rings to counteract wind-induced and rain-vortex vibrations.',
    scopeOfWork: [
      'Twin 145-meter high-performance slipform concrete pylons in deep alluvial subsoil',
      'Fabrication and installation of 480-meter orthotropic aerodynamic composite deck',
      '112 stay-cable stay installation with multi-layer corrosion wax and HDPE sheathing',
      'Dynamic wind-tunnel testing and real-time seismic isolation bearings'
    ],
    specifications: [
      { label: 'Overall River Crossing Length', value: '4.2 km (Bridge + Approaches)' },
      { label: 'Main Navigational Span', value: '480 meters' },
      { label: 'Pylon Height Above Foundation', value: '145 meters' },
      { label: 'Stay Cable Tensile Strength', value: '1,860 MPa High-Grade Steel' },
      { label: 'Navigational Clear Headroom', value: '26 meters at High Flood Level' },
      { label: 'Foundation Type', value: '24m Diameter Well Caisson Foundations' }
    ],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
      publicId: 'demo_bridge_cover',
      alt: 'Spectacular cable stayed bridge crossing wide river',
      caption: 'Completed main cable-stayed span crossing the river basin.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_bridge_1',
        alt: 'Cable stays anchored into the tower',
        caption: 'High-tensile stay cables radiating from the upper pylon saddle.',
        order: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_bridge_2',
        alt: 'Tower structure rising into the sky',
        caption: 'Pylon slipform casting progress reached at 120m height mark.',
        order: 2
      }
    ],
    video: {
      provider: 'youtube',
      url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
      embedUrl: 'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4',
      publicId: 'ScMzIvxBSi4'
    },
    seo: {
      title: 'Godavari River Cable-Stayed Bridge | Nivara Infrastructure',
      description: 'Explore the 4.2 km signature cable-stayed bridge demonstration project crossing the Godavari basin with a 480m main span.',
      keywords: ['cable-stayed bridge', 'pylons', 'infrastructure', 'civil engineering']
    }
  },
  {
    title: 'Deccan Regional Transit Corridor',
    slug: 'deccan-regional-transit-corridor',
    category: 'Urban & Transit',
    location: 'Bengaluru Outer Metropolitan Belt, Karnataka',
    clientName: 'Metropolitan Rapid Transit Corporation (Demonstration)',
    constructionStatus: 'Ongoing',
    publicationStatus: 'Published',
    archiveStatus: 'Active',
    isFeatured: true,
    timeline: {
      startDate: new Date('2022-07-01'),
      estimatedCompletionDate: new Date('2026-12-15')
    },
    shortDescription: 'A 32-kilometer grade-separated regional semi-high-speed transit line featuring 8 elevated multi-modal stations and dedicated depot facilities.',
    fullDescription: 'The Deccan Regional Transit Corridor is designed to relieve urban congestion across high-growth technological and manufacturing hubs. Built within narrow right-of-way boundaries along existing expressway medians, the project utilizes portal beam substructures and precast U-girders for rapid nighttime erection.\n\nThe project incorporates green station architecture with integrated solar canopies, rainwater harvesting viaduct drain systems, and full universal accessibility standards.',
    scopeOfWork: [
      '32 km twin-track elevated viaduct utilizing monolithic precast U-girders',
      'Turnkey construction of 8 architecturally distinctive elevated transit stations',
      'Integration of third-rail power supply distribution and track ballastless plinth',
      'Maintenance depot construction including heavy workshop and stabling yards'
    ],
    specifications: [
      { label: 'Corridor Alignment Length', value: '32.4 km Elevated' },
      { label: 'Passenger Design Capacity', value: '45,000 PPHPD' },
      { label: 'Operating Speed Limit', value: '120 km/h' },
      { label: 'Track Gauge', value: '1,435 mm Standard Gauge' },
      { label: 'Number of Stations', value: '8 Elevated Multi-Modal Hubs' },
      { label: 'Power Traction', value: '750V DC Third Rail Bottom-Contact' }
    ],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1600&q=80',
      publicId: 'demo_transit_cover',
      alt: 'Modern transit viaduct track in urban landscape',
      caption: 'Elevated transit track structure passing through metropolitan corridor.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_transit_1',
        alt: 'Station steel roof construction',
        caption: 'Station canopy structural steel truss hoisting and bolt torquing.',
        order: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_transit_2',
        alt: 'Concrete track bed construction',
        caption: 'Continuous ballastless plinth concrete pouring and laser leveling.',
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
      title: 'Deccan Regional Transit Corridor | Nivara Infrastructure',
      description: 'Discover the Deccan Regional Transit Corridor: 32 km elevated semi-high-speed rail project with 8 stations and advanced civil works.',
      keywords: ['urban transit', 'metro viaduct', 'civil rail infrastructure', 'transit corridor']
    }
  },
  {
    title: 'Kutch Renewable Energy Infrastructure',
    slug: 'kutch-renewable-energy-infrastructure',
    category: 'Industrial & Energy',
    location: 'Rann of Kutch Energy Zone, Gujarat',
    clientName: 'Clean Power Transmission Grid Ltd. (Demonstration)',
    constructionStatus: 'Completed',
    publicationStatus: 'Published',
    archiveStatus: 'Active',
    isFeatured: true,
    timeline: {
      startDate: new Date('2021-04-10'),
      completionDate: new Date('2023-10-20')
    },
    shortDescription: 'Comprehensive civil and foundation engineering for a 1.2 GW hybrid wind-solar installation across challenging saline mudflat terrain.',
    fullDescription: 'Constructing utility-scale renewable power across coastal mudflats requires specialized geotechnical remediation. The Kutch Renewable Energy Infrastructure project overcame extreme seasonal waterlogging and corrosive soil chemistry through stone column ground improvement and sulfate-resistant concrete foundations.\n\nThe project delivered 280 heavy wind turbine gravity foundations and over 40 square kilometers of solar racking foundations, alongside high-voltage substation switchyards and heavy-duty access haul roads.',
    scopeOfWork: [
      'Geotechnical ground improvement across 4,200 hectares of saline mudflats',
      'Construction of 280 heavy gravity wind turbine foundations (up to 4.2 MW class)',
      'Erection of 765 kV Extra High Voltage (EHV) substation civil structures',
      '140 km of compacted all-weather heavy transport access roadways'
    ],
    specifications: [
      { label: 'Installed Energy Capacity', value: '1,200 MW Hybrid (Wind & Solar)' },
      { label: 'Wind Turbine Foundations', value: '280 Units (C35/45 SR Cement)' },
      { label: 'Ground Improvement Area', value: '42,000,000 m² (Stone Columns)' },
      { label: 'Substation Voltage Class', value: '765 kV / 400 kV GIS Substation' },
      { label: 'Haul Road Network', value: '142 km Heavy-Duty Compacted Aggregate' }
    ],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=80',
      publicId: 'demo_energy_cover',
      alt: 'Vast wind turbines and solar installation on horizon',
      caption: 'Hybrid wind turbine array foundations across coastal energy zone.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_energy_1',
        alt: 'Solar energy field installation',
        caption: 'Driven steel pile foundations for solar tracking arrays.',
        order: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_energy_2',
        alt: 'Heavy industrial civil works',
        caption: 'High-voltage transformer foundation pad pouring and cable trenching.',
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
      title: 'Kutch Renewable Energy Infrastructure | Nivara Infrastructure',
      description: 'Review the Kutch Renewable Energy project: 1.2 GW civil foundation engineering across challenging coastal terrain.',
      keywords: ['renewable energy', 'wind turbine foundation', 'geotechnical engineering', 'solar farm civil']
    }
  },
  {
    title: 'Sonipat Logistics and Freight Terminal',
    slug: 'sonipat-logistics-and-freight-terminal',
    category: 'Commercial Infrastructure',
    location: 'Delhi-NCR Western Dedicated Freight Belt, Haryana',
    clientName: 'Intermodal Logistics Logistics Hub Corp (Demonstration)',
    constructionStatus: 'Ongoing',
    publicationStatus: 'Published',
    archiveStatus: 'Active',
    isFeatured: false,
    timeline: {
      startDate: new Date('2023-09-01'),
      estimatedCompletionDate: new Date('2025-08-30')
    },
    shortDescription: 'A 180-acre modern intermodal logistics terminal featuring automated high-bay warehouses, rail siding container yards, and heavy-duty industrial pavements.',
    fullDescription: 'The Sonipat Logistics Terminal provides seamless connectivity between direct freight rail lines and national highways. The terminal includes three climate-controlled high-bay fulfillment centers spanning over 2.4 million square feet of clear-span structural steel buildings.\n\nThe project features jointless post-tensioned industrial flooring slabs designed to withstand continuous 120-kN axle loads and precision automated guided vehicle (AGV) traffic.',
    scopeOfWork: [
      '2.4 million sq. ft. of structural steel clear-span logistics warehouses',
      'Post-tensioned jointless floor slabs engineered to FM2 flatness standards',
      '4-track direct rail freight siding with heavy crane gantry foundations',
      'Automated truck staging yards, stormwater detention ponds, and bio-retention swales'
    ],
    specifications: [
      { label: 'Site Footprint', value: '180 Acres' },
      { label: 'Covered Warehouse Space', value: '2,400,000 sq. ft.' },
      { label: 'Clear Ceiling Height', value: '14.5 meters' },
      { label: 'Pavement Design Load', value: 'Jointless Post-Tensioned Concrete (120 kN)' },
      { label: 'Container Handling Capacity', value: '450,000 TEU per Annum' },
      { label: 'Rail Siding Tracks', value: '4 Full-Length 750m Loop Lines' }
    ],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
      publicId: 'demo_logistics_cover',
      alt: 'Massive modern warehouse interior with clear structural steel spans',
      caption: 'Structural steel erection for 2.4 million sq. ft. intermodal logistics hub.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_logistics_1',
        alt: 'Container terminal yard',
        caption: 'Heavy container yard roller-compacted concrete pavement completion.',
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
      title: 'Sonipat Logistics & Freight Terminal | Nivara Infrastructure',
      description: 'Explore the 180-acre Sonipat Logistics & Freight Terminal project: precision industrial slabs and structural steel logistics facilities.',
      keywords: ['logistics hub', 'industrial warehouse', 'post-tensioned slab', 'intermodal rail terminal']
    }
  },
  {
    title: 'Mahanadi Water Supply and Treatment Facility',
    slug: 'mahanadi-water-supply-and-treatment-facility',
    category: 'Water & Utilities',
    location: 'Cuttack-Bhubaneswar Urban Agglomeration, Odisha',
    clientName: 'State Water Works & Municipal Board (Demonstration)',
    constructionStatus: 'Planned',
    publicationStatus: 'Published',
    archiveStatus: 'Active',
    isFeatured: false,
    timeline: {
      startDate: new Date('2024-11-01'),
      estimatedCompletionDate: new Date('2028-03-31')
    },
    shortDescription: 'A 650 MLD state-of-the-art potable water intake, clarification, filtration, and regional transmission pipeline network serving 3.5 million residents.',
    fullDescription: 'The Mahanadi Water Supply Project is engineered to secure clean municipal drinking water through sustainable gravity-flow treatment. The design incorporates a circular river intake structure with self-cleaning fish-friendly screens, multi-stage flash flocculation basins, dual-media rapid gravity filters, and ozone contact disinfection chambers.\n\nThe project includes 160 kilometers of welded ductile iron and mild steel water transmission mains up to 2,200 mm diameter.',
    scopeOfWork: [
      'River intake well and pump house with 650 MLD initial pumping capacity',
      'Turnkey civil construction of 650 MLD advanced water treatment plant (WTP)',
      'Laying of 160 km large-diameter water transmission pipeline (1,400 - 2,200 mm)',
      'Master Supervisory Control and Data Acquisition (SCADA) telemetry and surge vessels'
    ],
    specifications: [
      { label: 'Plant Nominal Capacity', value: '650 Million Liters per Day (MLD)' },
      { label: 'Intake Well Diameter', value: '32-meter Reinforced Concrete Well' },
      { label: 'Treated Water Storage Reservoir', value: '95,000 m³ Underground Reservoir' },
      { label: 'Transmission Pipeline Network', value: '162 km (1,400mm - 2,200mm MS/DI Pipe)' },
      { label: 'Service Population Target', value: '3,500,000 Residents' },
      { label: 'Water Quality Standard', value: 'IS 10500:2012 / WHO Guidelines' }
    ],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1600&q=80',
      publicId: 'demo_water_cover',
      alt: 'Clean water treatment facility basins and engineering structures',
      caption: 'Circular clarifier and flocculation basin civil engineering works.'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        publicId: 'demo_water_1',
        alt: 'Large pipeline excavation and installation',
        caption: '2,200 mm raw water pipeline trenching, bedding, and cathodic protection.',
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
      title: 'Mahanadi Water Supply & Treatment Facility | Nivara Infrastructure',
      description: 'Discover the 650 MLD Mahanadi Water Supply and Treatment Facility demonstration project serving 3.5 million residents.',
      keywords: ['water treatment plant', 'intake well', 'transmission pipeline', 'civil water infrastructure']
    }
  }
];

async function seedDemo() {
  try {
    console.log('🌱 Seeding demonstration projects for Nivara Infrastructure...');
    await connectDB();

    const admin = await User.findOne({ role: 'superadmin' });
    const adminId = admin ? admin._id : null;

    let seededCount = 0;

    for (const projectData of DEMO_PROJECTS) {
      const updateData = {
        ...projectData,
        createdBy: adminId,
        updatedBy: adminId
      };

      await Project.findOneAndUpdate(
        { slug: projectData.slug },
        updateData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      seededCount++;
      console.log(`  ✓ Seeded/Updated project: ${projectData.title} (${projectData.category})`);
    }

    console.log(`\n🎉 Successfully seeded ${seededCount} demonstration projects.`);
    console.log('📌 All demonstration projects are marked as demonstration case studies with complete specifications and imagery.');

    await disconnectDB();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed demonstration projects:', err.message);
    process.exit(1);
  }
}

seedDemo();
