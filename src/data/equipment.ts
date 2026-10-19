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
  references?: { title: string; url: string; source?: string }[];
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
    risk: "High / Life-Critical (associated with potential complications such as ventilator-associated pneumonia, barotrauma, pneumothorax, atelectasis, and vocal cord trauma)",
    summary: "An automated positive-pressure life support device designed to augment or substitute human respiratory muscles.",
    embedUrl: "https://sketchfab.com/models/a03a99fab9314aab96fd41ec69acf1a3/embed?autostart=1&camera=0&transparent=1&ui_hint=2",
    workingPrinciples: [
      "Microprocessor-Controlled Pneumatics: Operates using closed-loop logic in either volume-controlled or pressure-controlled modes to manage air delivery.",
      "High-Pressure Metering: Pipeline gas (~50 psi / 400 kPa) passes through proportional solenoid valves that meter flow and blend precise oxygen ratios.",
      "Positive-Pressure Inflation: Forces oxygenated gas into the lungs to overcome thoracic resistance and expand collapsed alveoli.",
      "Passive Recoil & PEEP Retention: Exhaled gas returns via the expiratory limb where a PEEP valve maintains residual end-expiratory pressure to prevent lung sac collapse.",
    ],
    clinicalUses: [
      "Respiratory Failure Treatment: Deployed in critical conditions such as Acute Respiratory Distress Syndrome (ARDS), pneumonia, COPD exacerbations, asthma, stroke, sepsis, or traumatic brain injury where pulmonary oxygenation fails.",
      "Surgical Anesthesia Support: Takes over mechanical ventilation during surgical procedures when general anesthesia and neuromuscular blockade suppress natural breathing drives.",
      "Invasive vs. Non-Invasive Support: Administered non-invasively via face masks (e.g., CPAP/BiPAP) for lighter respiratory assistance or invasively via endotracheal intubation or tracheostomy for full life support.",
    ],
    components: [
      { name: "Pneumatic Gas Supply & Inlet Regulators", detail: "Accepts high-pressure medical air and pure oxygen lines (~50 psi / 400 kPa) and stabilizes incoming pressure before internal routing." },
      { name: "Gas Blender (Proportioning Valve Assembly)", detail: "Electromechanically mixes medical air and oxygen to deliver precise, tailored FiO2 concentrations (from 21% ambient to 100% pure oxygen)." },
      { name: "Microprocessor Unit & Solenoid Control Valves", detail: "Acts as the central command center, using proportional valves to regulate breath timing, inspiratory flow, and pressure limits." },
      { name: "Heated Humidifier & Conditioning System", detail: "Heats incoming dry gas to approximately 37°C and adds 100% relative humidity to prevent sore throats, thick secretions, and mucosal injury." },
      { name: "Patient Breathing Circuit (Inspiratory & Expiratory Limbs)", detail: "A flexible dual-tube corrugated system that isolates the sterile inspiratory pathway from the exhaled carbon dioxide return line." },
      { name: "Patient Interface (Breathing Tube / Mask)", detail: "Delivers pressurized gas directly into the trachea via an invasive endotracheal/tracheostomy tube or non-invasively via a tight-fitting facial mask." },
      { name: "Expiratory PEEP Valve & Pathogen Filter", detail: "Regulates exhalation resistance to maintain Positive End-Expiratory Pressure (PEEP) while trapping viral/bacterial aerosols to protect clinical personnel." },
      { name: "Inline Monitoring Sensors (Flow, Pressure, & FiO2)", detail: "Utilizes silicon wafer pressure transducers, hot-wire anemometers, and galvanic oxygen cells to transmit continuous, real-time feedback to the central computer." },
      { name: "Digital Display Monitor & Safety Alarms", detail: "Displays live pressure/volume waveforms and patient vitals while triggering visual/audible alarms for disconnects, pressure spikes, or power anomalies." },
    ],
    descriptions: [
      {
        heading: "Overview",
        body: "A mechanical ventilator is an automated positive-pressure life support device designed to augment or substitute human respiratory muscles when a patient is unable to maintain adequate independent gas exchange. Operating like controlled bellows, the machine supplies oxygen-rich air to saturate the blood while simultaneously clearing carbon dioxide waste from the body during severe respiratory failure or general surgical anesthesia.",
      },
      {
        heading: "Pneumatic Flow Pathway",
        body: "1. Gas Inflow & Pressure Regulation: High-pressure medical air and pure oxygen supplies (typically ~50 psi / 400 kPa) feed into pressure-reducing inlet regulators from wall pipelines or mini-compressors.\n2. Proportioning & Blending: The gases enter an internal gas blender where proportional solenoid valves adjust the mixture to deliver the precise prescribed fraction of inspired oxygen (FiO2, ranging from 21% to 100%).\n3. Inspiratory Flow Control: A microprocessor-driven inspiratory control valve meters tidal volume, gas flow rate, and peak airway pressure according to the set ventilation mode.\n4. Gas Conditioning: The gas stream flows through a heated humidifier, warming the air to body temperature (~37°C) and saturating it with moisture to protect sensitive bronchial mucosa.\n5. Inspiratory Delivery & Lung Inflation: Conditioned gas travels down the corrugated inspiratory limb and through an artificial airway (endotracheal tube, tracheostomy, or face mask) under positive pressure to inflate the pulmonary alveoli.\n6. Expiratory Return & PEEP: During passive exhalation, carbon dioxide-laden gas returns along the expiratory limb, passes through a protective bacterial/pathogen filter, and vents past a solenoid PEEP valve that maintains baseline airway pressure to prevent alveolar deflation.",
      },
      {
        heading: "Category Profile",
        body: "Primary Function: Continuous maintenance or artificial replacement of pulmonary gas exchange during organ failure or general surgery.\nRisk Level: High / Life-Critical (associated with potential complications such as ventilator-associated pneumonia, barotrauma, pneumothorax, atelectasis, and vocal cord trauma).\nRelated Devices: Anesthesia machines, CPAP/BiPAP non-invasive respirators, high-frequency jet ventilators, and Extracorporeal Membrane Oxygenation (ECMO) circuits.",
      },
    ],
    references: [
      { title: "Basic components of a mechanical ventilator", url: "https://derangedphysiology.com/main/cicm-primary-exam/respiratory-system/Chapter-501/basic-components-mechanical-ventilator", source: "Deranged Physiology" },
      { title: "What Is a Medical Ventilator & How Does It Work?", url: "https://www.impactinstrumentation.com/", source: "Innovative Technologies in Medicine" },
      { title: "Ventilator/Ventilator Support - What Is a Ventilator?", url: "https://www.nhlbi.nih.gov/health/ventilator", source: "NHLBI, NIH" },
      { title: "Ventilator/Ventilator Support - Who Needs a Ventilator", url: "https://www.nhlbi.nih.gov/health/ventilator/who-needs-it", source: "NHLBI, NIH" },
      { title: "Ventilator/Ventilator Support - What to Expect", url: "https://www.nhlbi.nih.gov/health/ventilator/what-to-expect", source: "NHLBI, NIH" },
      { title: "Ventilator/Ventilator Support - Risks of Being on a Ventilator", url: "https://www.nhlbi.nih.gov/health/ventilator/risks", source: "NHLBI, NIH" },
      { title: "What Are Ventilator Parts and Function?", url: "https://www.nai-group.com/what-are-ventilator-parts-and-function/", source: "NAI Group" },
      { title: "Medical ventilators: a breakdown of components and sensors", url: "https://uk.rs-online.com/web/content/smart-advanced-technologies/medical-technology/medical-devices", source: "RS Components" },
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
  // Mechanical Ventilator references
  {
    title: "Basic components of a mechanical ventilator",
    type: "Article",
    url: "https://derangedphysiology.com/main/cicm-primary-exam/respiratory-system/Chapter-501/basic-components-mechanical-ventilator",
    source: "Deranged Physiology",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, components, gas blender, PEEP valve",
    note: "Breakdown of ventilator components and the pneumatic pathway.",
  },
  {
    title: "What Is a Medical Ventilator & How Does It Work?",
    type: "Article",
    url: "https://www.impactinstrumentation.com/",
    source: "Innovative Technologies in Medicine",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, positive pressure, FiO2",
    note: "Overview of how medical ventilators deliver controlled breaths.",
  },
  {
    title: "Ventilator/Ventilator Support - What Is a Ventilator?",
    type: "Article",
    url: "https://www.nhlbi.nih.gov/health/ventilator",
    source: "NHLBI, NIH",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, respiratory failure",
    note: "Patient-friendly explanation of ventilator support.",
  },
  {
    title: "Ventilator/Ventilator Support - Who Needs a Ventilator",
    type: "Article",
    url: "https://www.nhlbi.nih.gov/health/ventilator/who-needs-it",
    source: "NHLBI, NIH",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, ARDS, pneumonia, COPD, anesthesia",
    note: "Conditions and situations that require ventilation.",
  },
  {
    title: "Ventilator/Ventilator Support - What to Expect",
    type: "Article",
    url: "https://www.nhlbi.nih.gov/health/ventilator/what-to-expect",
    source: "NHLBI, NIH",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, ICU, intubation",
    note: "What patients and families can expect during ventilation.",
  },
  {
    title: "Ventilator/Ventilator Support - Risks of Being on a Ventilator",
    type: "Article",
    url: "https://www.nhlbi.nih.gov/health/ventilator/risks",
    source: "NHLBI, NIH",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, pneumonia, barotrauma, pneumothorax",
    note: "Complications associated with mechanical ventilation.",
  },
  {
    title: "What Are Ventilator Parts and Function?",
    type: "Article",
    url: "https://www.nai-group.com/what-are-ventilator-parts-and-function/",
    source: "NAI Group",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, sensors, valves, breathing circuit",
    note: "Guide to ventilator parts and their functions.",
  },
  {
    title: "Medical ventilators: a breakdown of components and sensors",
    type: "Article",
    url: "https://uk.rs-online.com/web/content/smart-advanced-technologies/medical-technology/medical-devices",
    source: "RS Components",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, flow sensors, pressure transducers",
    note: "Engineering breakdown of ventilator components and sensors.",
  },
];
