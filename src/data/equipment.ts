// Add a new device by copying one object below. Paste a Spline/Sketchfab
// iframe URL into `embedUrl`, or full embed HTML (iframe) into `embedHtml`.

export const categories = [
  "Diagnostic Imaging",
  "Life Support & Critical Care",
  "Patient Monitoring & Biosignals",
  "Therapeutic & Surgical",
  "Laboratory & Sterilization",
] as const;
export type Category = (typeof categories)[number];

export const categoryInfo: Record<Category, { examples: string; purpose: string; risk: string }> = {
  "Diagnostic Imaging": {
    examples: "MRI, CT, Diagnostic Ultrasound, Digital X-Ray",
    purpose: "Non-invasive visualisation of anatomical structures and physiological processes.",
    risk: "Medium to High",
  },
  "Life Support & Critical Care": {
    examples: "Mechanical Ventilators, Anaesthesia Machines, Hemodialysis Machines, Infant Incubators",
    purpose: "Continuous maintenance or replacement of vital bodily functions during organ failure or surgery.",
    risk: "High / Life-Critical",
  },
  "Patient Monitoring & Biosignals": {
    examples: "ECG, EEG, Pulse Oximeters, Patient Monitors",
    purpose: "Acquisition, amplification and real-time display of bioelectric and physiological parameters.",
    risk: "Medium",
  },
  "Therapeutic & Surgical": {
    examples: "Defibrillators, Pacemakers, Electrosurgical Units, Oxygen Concentrators",
    purpose: "Active treatment of disease, cardiac arrest, tissue cutting/coagulation or acute deficits.",
    risk: "High",
  },
  "Laboratory & Sterilization": {
    examples: "Autoclaves, Centrifuges, Spectrophotometers, Biosafety Cabinets",
    purpose: "Sample preparation, biochemical analysis and infection control through sterilisation.",
    risk: "Medium",
  },
};

export type Device = {
  slug: string;
  name: string;
  category: Category;
  summary: string;
  risk?: string;
  embedUrl?: string;
  embedHtml?: string;
  workingPrinciples: string[];
  clinicalUses: string[];
  components?: { name: string; detail: string }[];
  descriptions: { heading: string; body: string }[];
};

export const devices: Device[] = [
  {
    slug: "mri-scanner",
    name: "MRI Scanner",
    category: "Diagnostic Imaging",
    risk: "Medium to High (strong magnetic fields)",
    summary: "Magnetic resonance imaging for high-contrast soft-tissue images without ionising radiation.",
    embedUrl: "",
    workingPrinciples: [
      "A strong static magnetic field (B0, typically 1.5 T or 3.0 T) aligns hydrogen protons, which precess at the Larmor frequency.",
      "An RF pulse tuned to the Larmor frequency tips the spins into the transverse plane (excitation).",
      "As protons relax they emit RF signals; contrast comes from proton density and T1/T2 relaxation times.",
      "Gradient coils encode position along X, Y and Z; signals are reconstructed with Fast Fourier Transforms.",
    ],
    clinicalUses: [
      "Brain and spinal cord imaging",
      "Musculoskeletal and joint assessment",
      "Cardiac and abdominal evaluation",
    ],
    components: [
      { name: "Main Superconducting Magnet", detail: "Niobium-titanium coils in liquid helium (~4.2 K) keep a homogeneous static field." },
      { name: "Gradient Coil Assembly", detail: "Three orthogonal coils for slice selection, phase and frequency encoding." },
      { name: "RF Coils", detail: "Antenna arrays that transmit B1 excitation pulses and capture weak echo signals." },
      { name: "Cryogenic Cooling System", detail: "Dewars, cold-heads and helium compressors that prevent magnet quenches." },
      { name: "Image Reconstruction Processor", detail: "Converts raw k-space data into 2D and 3D images using FFT." },
    ],
    descriptions: [
      {
        heading: "Overview",
        body: "MRI relies on nuclear magnetic resonance to generate high-contrast images of soft tissue. The patient lies inside a high-strength static magnetic field, and radiofrequency pulses are used to excite and then listen to hydrogen protons in body tissue.",
      },
      {
        heading: "Signal Path",
        body: "The magnet bore houses the superconducting coils. Inside sits the gradient coil assembly, and closest to the patient are the RF transmit/receive coils. Signals flow from the RF coils into low-noise pre-amplifiers, analog-to-digital converters, and finally the image reconstruction processor.",
      },
    ],
  },
  {
    slug: "mechanical-ventilator",
    name: "Mechanical Ventilator",
    category: "Life Support & Critical Care",
    risk: "High / Life-Critical",
    summary: "Delivers controlled breaths of air and oxygen to patients who cannot breathe adequately.",
    embedUrl: "",
    workingPrinciples: [
      "Microprocessor-controlled pneumatics operate in pressure-controlled or volume-controlled modes.",
      "Pipeline gases (~50 psi) pass through regulators and proportional solenoid valves that blend precise mixtures.",
      "Gas flows through the inspiratory limb and endotracheal tube into the lungs.",
      "Exhaled gas returns via the expiratory limb and a PEEP valve that prevents alveolar collapse.",
    ],
    clinicalUses: ["Respiratory failure", "General anaesthesia", "Intensive care support"],
    components: [
      { name: "Pneumatic Manifold & Blending Valves", detail: "Servo-driven valves adjusting FiO2 and delivery flow rates." },
      { name: "Patient Breathing Circuit", detail: "Corrugated tubing, inspiratory/expiratory valves and exhalation manifold." },
      { name: "Flow and Pressure Sensors", detail: "Transducers or hot-wire anemometers measuring tidal volume and airway pressure." },
      { name: "CO2 Absorber Canister", detail: "Soda-lime granules removing carbon dioxide in closed-circuit anaesthesia." },
    ],
    descriptions: [
      {
        heading: "Overview",
        body: "Mechanical ventilators provide controlled delivery of respirable gases to support or replace breathing during respiratory failure or surgical anaesthesia.",
      },
      {
        heading: "Pneumatic Flow Pathway",
        body: "High-pressure wall inlets supply medical air and oxygen to pressure-reducing regulators. The gases are blended in the proportioning valve assembly, travel through the inspiratory side of the circuit into the lungs, and return through the expiratory tubing and PEEP valve before venting.",
      },
    ],
  },
];

export const getDevice = (slug: string) => devices.find((d) => d.slug === slug);

export const resourceTypes = ["Video", "Book", "Article", "Journal", "PDF", "Other"] as const;
export type ResourceType = (typeof resourceTypes)[number];

export type Resource = {
  title: string;
  type: ResourceType;
  url: string;
  source?: string;
  categories: Category[];
  topics?: string;
  note?: string;
};

// Add study materials here. `categories` decides which equipment filters it appears under.
export const resources: Resource[] = [
  // Videos
  {
    title: "NPTEL Biomedical Instrumentation Course",
    type: "Video",
    url: "https://onlinecourses.nptel.ac.in/",
    source: "IIT Madras / NPTEL (Prof. Varadhan SKM)",
    categories: ["Patient Monitoring & Biosignals", "Therapeutic & Surgical"],
    topics: "Sensors, Biopotentials, ECG, EEG, Flowmeters, Defibrillators, Pacemakers",
    note: "Lecture series on electrodes, instrumentation amplifiers, cardiopulmonary monitoring and therapeutic devices.",
  },
  {
    title: "NPTEL Introduction to Biomedical Imaging Systems",
    type: "Video",
    url: "https://www.youtube.com/results?search_query=NPTEL+Introduction+to+Biomedical+Imaging+Systems",
    source: "IIT Kharagpur / NPTEL",
    categories: ["Diagnostic Imaging"],
    topics: "X-Ray, CT, MRI, Ultrasound, Scintigraphy",
    note: "Radiation interactions, CT reconstruction, MRI pulse sequences and transducer optics.",
  },
  {
    title: "MRI Physics Basics & Diagnostic Radiology",
    type: "Video",
    url: "https://radiopaedia.org/articles/mri-physics",
    source: "Radiopaedia",
    categories: ["Diagnostic Imaging"],
    topics: "MRI, CT, General Radiography",
    note: "Larmor precession, gradient encoding, relaxation curves and X-ray target physics.",
  },
  {
    title: "Anesthesia Machines & Mechanical Ventilation Guides",
    type: "Video",
    url: "https://www.youtube.com/results?search_query=full+tour+of+the+anesthesia+machine",
    source: "OpenAnesthesia / Clinical Learning Media",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilators, Anaesthesia Workstations",
    note: "Breathing circuits, servo-controlled valves, vaporizer operation and alarms.",
  },
  // Books
  {
    title: "WHO Core Medical Equipment & Technical Series",
    type: "Book",
    url: "https://www.who.int/publications/i/item/WHO-HSS-EHT-DIM-11.03",
    source: "World Health Organization",
    categories: ["Diagnostic Imaging", "Life Support & Critical Care", "Patient Monitoring & Biosignals", "Therapeutic & Surgical", "Laboratory & Sterilization"],
    topics: "Equipment specifications, maintenance, inventory",
    note: "Public-domain reference on specifications, operating principles and maintenance.",
  },
  {
    title: "Handbook of Biomedical Instrumentation (R.S. Khandpur)",
    type: "Book",
    url: "https://www.google.com/search?q=Handbook+of+Biomedical+Instrumentation+Khandpur",
    source: "R.S. Khandpur",
    categories: ["Patient Monitoring & Biosignals", "Life Support & Critical Care"],
    topics: "ECG, EEG, Oximeters, Dialysis, Telemetry",
    note: "Biopotentials, transducer design, circuit schematics and patient safety.",
  },
  {
    title: "Bio-Medical Instrumentation e-Textbook",
    type: "Book",
    url: "https://www.scribd.com/search?query=Biomedical%20Instrumentation%20e-Textbook",
    source: "Open Educational Resources (M-Scheme)",
    categories: ["Patient Monitoring & Biosignals", "Therapeutic & Surgical", "Diagnostic Imaging"],
    topics: "Bioelectric potentials, recorders, therapeutic devices, imaging",
    note: "Introductory text on lead systems, biotelemetry, surgical lasers and shock prevention.",
  },
  {
    title: "LibreTexts Academic Learning Modules",
    type: "Book",
    url: "https://med.libretexts.org/",
    source: "LibreTexts",
    categories: ["Laboratory & Sterilization", "Patient Monitoring & Biosignals"],
    topics: "Medical instrumentation, biosensors, biophysics",
    note: "Open modular textbook on biosensor physics and laboratory instrumentation.",
  },
  // Articles
  {
    title: "Radiopaedia Imaging Physics Knowledge Base",
    type: "Article",
    url: "https://radiopaedia.org/articles/physical-principles-of-ultrasound",
    source: "Radiopaedia Foundation",
    categories: ["Diagnostic Imaging"],
    topics: "MRI, CT, Ultrasound, Digital X-Ray",
    note: "Acoustic impedance, T1/T2 relaxation, beam hardening and detector geometry.",
  },
  {
    title: "Frank's Hospital Workshop Technical Tutorials",
    type: "Article",
    url: "https://www.frankshospitalworkshop.com/",
    source: "Frank Weithöner",
    categories: ["Therapeutic & Surgical", "Laboratory & Sterilization", "Life Support & Critical Care"],
    topics: "Suction Pumps, Oxygen Concentrators, Autoclaves, Centrifuges, Incubators",
    note: "Troubleshooting checklists, component replacement and maintenance.",
  },
  {
    title: "iFixit Medical Device Hardware Documentation",
    type: "Article",
    url: "https://www.ifixit.com/Device/Medical_Device",
    source: "iFixit Global Medical Project",
    categories: ["Patient Monitoring & Biosignals", "Therapeutic & Surgical"],
    topics: "Bedside Monitors, Defibrillators, Syringe Pumps, Pulse Oximeters",
    note: "Teardown photos, block diagrams, parts lists and disassembly guides.",
  },
  {
    title: "Open Critical Care Equipment Guidance",
    type: "Article",
    url: "https://opencriticalcare.org/",
    source: "Open Critical Care Initiative",
    categories: ["Life Support & Critical Care", "Therapeutic & Surgical"],
    topics: "Oxygen delivery, Ventilators, Flowmeters, High-Flow Nasal Cannulae",
    note: "Device selection, oxygen purity testing, manifold setup and circuit safety.",
  },
  // Journals
  {
    title: "BioMedical Engineering OnLine",
    type: "Journal",
    url: "https://biomedical-engineering-online.biomedcentral.com/",
    source: "BioMed Central / Springer Nature",
    categories: ["Patient Monitoring & Biosignals", "Diagnostic Imaging"],
    topics: "Sensors, wearable monitors, diagnostic hardware",
    note: "Fully open-access research on physiological sensors and diagnostic innovations.",
  },
  {
    title: "Journal of Medical Engineering & Technology",
    type: "Journal",
    url: "https://www.tandfonline.com/journals/ijmt20",
    source: "Taylor & Francis",
    categories: ["Diagnostic Imaging", "Life Support & Critical Care", "Patient Monitoring & Biosignals", "Therapeutic & Surgical", "Laboratory & Sterilization"],
    topics: "Clinical engineering, device evaluation, equipment management",
    note: "Field evaluations of devices and performance testing protocols.",
  },
  {
    title: "IEEE Reviews in Biomedical Engineering",
    type: "Journal",
    url: "https://www.embs.org/rbme/",
    source: "IEEE EMBS",
    categories: ["Diagnostic Imaging", "Therapeutic & Surgical", "Patient Monitoring & Biosignals"],
    topics: "Imaging architectures, therapeutic devices, signal processing",
    note: "Review papers on modern medical technologies.",
  },
];
