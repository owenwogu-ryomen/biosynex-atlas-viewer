// Add a new device by copying one object below. Paste a Spline/Sketchfab
// iframe URL into `embedUrl`, or full embed HTML (iframe) into `embedHtml`.
export type Device = {
  slug: string;
  name: string;
  category: "Imaging" | "Life Support";
  summary: string;
  embedUrl?: string;
  embedHtml?: string;
  workingPrinciples: string[];
  clinicalUses: string[];
  descriptions: { heading: string; body: string }[];
};

export const devices: Device[] = [
  {
    slug: "mri-scanner",
    name: "MRI Scanner",
    category: "Imaging",
    summary: "Magnetic resonance imaging for detailed soft-tissue visualisation.",
    embedUrl: "",
    workingPrinciples: [
      "A strong static magnetic field aligns hydrogen protons in the body.",
      "Radiofrequency pulses tip the protons; as they relax they emit signals.",
      "Gradient coils encode spatial position, and the signals are reconstructed into images.",
    ],
    clinicalUses: [
      "Brain and spinal cord imaging",
      "Musculoskeletal and joint assessment",
      "Cardiac and abdominal evaluation",
    ],
    descriptions: [
      { heading: "Overview", body: "Add your description of this device here." },
      { heading: "Key Components", body: "Magnet, gradient coils, RF coils, patient table, console." },
    ],
  },
  {
    slug: "mechanical-ventilator",
    name: "Mechanical Ventilator",
    category: "Life Support",
    summary: "Delivers controlled breaths to patients unable to breathe adequately.",
    embedUrl: "https://sketchfab.com/models/a03a99fab9314aab96fd41ec69acf1a3/embed?autospin=1&autostart=1&transparent=1",
    workingPrinciples: [
      "Generates positive pressure to push air/oxygen mixture into the lungs.",
      "Controls volume, pressure, rate and timing of each breath.",
      "Sensors monitor flow and pressure for patient safety alarms.",
    ],
    clinicalUses: ["Respiratory failure", "General anaesthesia", "Intensive care support"],
    descriptions: [{ heading: "Overview", body: "Add your description of this device here." }],
  },
];

export const categories = ["Imaging", "Life Support"] as const;
export const getDevice = (slug: string) => devices.find((d) => d.slug === slug);

export type Resource = { title: string; type: "Video" | "Book" | "PDF" | "Article" | "Journal" | "Other"; url: string; note?: string };

// Add study materials here.
export const resources: Resource[] = [
  { title: "MRI Physics Basics", type: "Video", url: "https://www.youtube.com/results?search_query=mri+physics", note: "Introductory lectures" },
  { title: "Medical Instrumentation: Application and Design (Webster)", type: "Book", url: "https://www.wiley.com", note: "Core textbook" },
  { title: "Mechanical Ventilation overview", type: "Article", url: "https://www.ncbi.nlm.nih.gov/books/NBK539742/" },
  { title: "Journal of Medical Engineering & Technology", type: "Journal", url: "https://www.tandfonline.com/journals/ijmt20" },
];
