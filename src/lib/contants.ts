export const SITE_CONFIG = {
  name: "PT. Prestasi Jaya Maju",
  description:
    "Solusi Industrial Automation lengkap, PLC, Inverter, HMI, Sensor , Servo dan Power meter dengan engineering support Programming & Parameter setting, commissioning, engineering consultation Jakarta.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pjmotomasi.co.id",
  company: {
    name: "PT. Prestasi Jaya Maju",
    phone: " 021-2784-3480",
    email: "sales@pjmotomasi.co.id",
    address: "Jl. Gandaria Raya No. 64 , Jakarta Selatan , DKI Jakarta",
    tagline: "One Stop Solution Automation Provider",
  },
  pricing: {
    showPrices: false,
    defaultPricetext: "Hubungi untuk harga terbaik",
    contactForQoute: "Contact for competitive pricing",
  },
};

export const PRODUCT_CATEGORIES = [
  {
    slug: "plc",
    name: "PLC (Programmable Logic Controller)",
    description:
      "Supplier Automation controller dengan technical support dan programming service - Mitsubishi, Omron, Siemens",
    keywords: [
      "jual plc",
      "supplier plc mitsubishi",
      "plc programming indonesia",
    ],
  },
  {
    slug: "inverter", // ✅ CHANGED FROM "vfd"
    name: "Inverter (Variable Speed Drive)",
    description:
      "Supplier Pengontrol kecepatan motor dengan parameter setting dan commissioning - Schneider, ABB, Danfoss",
    keywords: [
      "jual inverter",
      "parameter setting inverter",
      "inverter schneider indonesia",
    ],
  },
  {
    slug: "hmi",
    name: "HMI (Human Machine Interface)",
    description:
      "Supplier HMI dengan technical support, programming dan troubleshooting support - Mitsubishi, Proface, Weintek, Omron",
    keywords: [
      "hmi proface",
      "touchscreen industrial",
      "hmi configuration jakarta",
    ],
  },
  {
    slug: "power-meter",
    name: "Power Meter & Monitoring",
    description:
      "Supplier Power Meter untuk Energy monitoring dengan instalasi dan programming - Schneider, ABB, Phoenix Contact",
    keywords: [
      "power meter schneider",
      "energy monitoring",
      "power analyzer indonesia",
    ],
  },
  {
    slug: "plc-module",
    name: "PLC Module",
    description:
      "Complete PLC Module : Input/Output Unit, Power Supply Unit, Base Unit, Communication & Network Module",
    keywords: [
      "Input Unit PLC",
      "Output Unit PLC",
      "Power Supply Unit PLC",
      "Ethernet Module PLC",
      "Positioning Module PLC",
    ],
  },
  {
    slug: "power-supply",
    name: "Power Supply",
    description:
      "Power supply unit untuk kebutuhan power supply industrial automation",
    keywords: ["pwoer supply", "external power supply", "power supply plc"],
  },
  {
    slug: "servo",
    name: "Servo Drives & Motor",
    description:
      "Pengontrol kecepatan motor presisi tinggi dengan parameter setting dan commissioning - Panasonic, Mitsubishi, Yaskawa",
    keywords: ["Servo Mitsubishi", "Servo Drive", "Servo Motor"],
  },
  {
    slug: "sensor",
    name: "Sensor",
    description:
      "Berbagai macam jenis sensor untuk kebutuhan industri proximity, safety sensor, vision sensor",
    keywords: [
      "Sensor",
      "Proximity Sensor",
      "Photoelectric Sensor",
      "Vision Sensor",
      "Safety Sensor",
      "Encoder",
    ],
  },
  {
    slug: "accesories",
    name: "Accesories",
    description:
      "Accesories untuk komponen industrial automation push button, pilot lamp, relay",
    keywords: ["Push Button", "Pilot Lamp", "Relay"],
  },
  {
    slug: "robot",
    name: "Robot",
    description:
      "Automatic Robot Untuk Berbagai Kebutuhan Industrial, Delivery Robot, Arm Robot, Scara Robot",
    keywords: ["Delivery Robot", "Arm Robot", "Scara Robot"],
  },
];

export const BRANDS = [
  "ABB",
  "Allen Bradley",
  "Autonics",
  "Banner",
  "Danfoss",
  "Delta",
  "Fuji",
  "Haiwell",
  "Idec",
  "Ifm",
  "Keyence",
  "LS",
  "Mitsubishi",
  "Omron",
  "Panasonic",
  "Parker",
  "Pepperl+Fuchs",
  "Phoenix Contact",
  "Proface",
  "Reeman",
  "Schneider",
  "Sick",
  "Siemens",
  "Teco",
  "Toshiba",
  "Weintek",
  "Xinje",
  "Yaskawa",
  "Zest",
];

export const TARGET_KEYWORDS = {
  primary: [
    "supplier automation parts indonesia",
    "jual inverter jakarta",
    "technical support plc",
    "parameter setting inverter",
    "supplier plc mitsubishi indonesia",
  ],
  secondary: [
    "hmi proface harga kompetitif",
    "troubleshooting automation jakarta",
    "engineering consultation plc",
    "inverter fuji indonesia",
    "commissioning inverter service",
  ],
  longTail: [
    "cara setting parameter inverter schneider",
    "troubleshooting plc communication error",
    "supplier power supply indonesia",
    "parameter setting plc mitsubishi fx5u",
    "hmi proface gp4000 configuration",
  ],
};

export const SERVICES = [
  {
    slug: "technical-support",
    name: "Technical Support",
    description: "Engineering consultation dan troubleshooting support",
    icon: "Headphones",
  },
  {
    slug: "parameter-setting",
    name: "Parameter Setting",
    description: "Konfigurasi inverter, PLC programming, HMI setup",
    icon: "Settings",
  },
  {
    slug: "commissioning",
    name: "Commissioning Service",
    description: "Testing, startup, dan validation system automation",
    icon: "PlayCircle",
  },
  {
    slug: "training",
    name: "Training & Education",
    description: "Operator training dan technical knowledge transfer",
    icon: "GraduationCap",
  },
];

// 🎯 LOCATIONS (Local SEO)
export const LOCATIONS = [
  {
    city: "Jakarta",
    slug: "jakarta",
    description: "Supplier automation parts Jakarta dengan technical support",
  },
  {
    city: "Surabaya",
    slug: "surabaya",
    description:
      "Distributor industrial automation Surabaya - engineering services",
  },
  {
    city: "Bandung",
    slug: "bandung",
    description:
      "Automation parts supplier Bandung dengan consultation service",
  },
  {
    city: "Tangerang",
    slug: "tangerang",
    description: "Technical support automation Tangerang - parameter setting",
  },
];

// 📊 TRUST SIGNALS
export const TRUST_SIGNALS = [
  {
    title: "8+ Years Experience",
    description: "Pengalaman bertahun-tahun di industrial automation",
    icon: "Award",
  },
  {
    title: "Engineering Expertise",
    description:
      "Tim engineering berpengalaman dan siap untuk technical support",
    icon: "Cog",
  },
  {
    title: "Quality Products",
    description: "Produk berkualitas dengan competitive pricing",
    icon: "Shield",
  },
  {
    title: "Fast Response",
    description: "Response time cepat untuk consultation dan troubleshooting",
    icon: "Clock",
  },
  {
    title: "Local Support",
    description: "Technical support Untuk Seluruh Wilayah Indonesia",
    icon: "MapPin",
  },
  {
    title: "Custom Solutions",
    description:
      "Solusi industrial automation sesuai kebutuhan terbaik automasi industri",
    icon: "Wrench",
  },
];

export default {
  SITE_CONFIG,
  PRODUCT_CATEGORIES,
  BRANDS,
  TARGET_KEYWORDS,
  SERVICES,
  LOCATIONS,
  TRUST_SIGNALS,
};
