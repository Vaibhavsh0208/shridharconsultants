// Facts about the business that do not change with language.
// Anything shown to visitors in words lives in src/i18n instead.

export const site = {
  url: "https://shridharconsultants.in",
  name: "Shridhar Consultants",
  brandLine1: "M/s Shridhar",
  brandLine2: "Consultants",
  tagline: "NHAI NOC & Highway Access Permission Consultancy",
  phone: { display: "+91 79880 08722", tel: "+917988008722" },
  whatsapp: { display: "+91 94166 65796", url: "https://wa.me/919416665796" },
  address: {
    street: "17/7 New Partap Nagar, Behind Vita Milk Plant",
    city: "Ambala City",
    region: "Haryana",
    postalCode: "134007",
    country: "IN",
    display: "#17/7, New Partap Nagar, Behind Vita Milk Plant, Ambala City, Haryana - 134007",
  },
  mapsUrl: "https://maps.app.goo.gl/a6M29N3JAuw6xX6FA",
  geo: { lat: 30.385261, lng: 76.790969 },
  proprietor: "Mrs. Renu Bala",
  foundingYear: "2005",
  description:
    "NHAI NOC consultant since 2005 assisting with highway access permission, petrol pump NOC, OFC cable permission and pipeline crossings across Haryana, Punjab and Delhi NCR.",
  // Mon to Sat, 10:00 to 18:00 (same as the contact section)
  hours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "18:00" },
  knowsAbout: [
    "NHAI NOC",
    "Highway access permission",
    "Petrol pump NOC",
    "OFC cable permission",
    "Pipeline crossing permission",
  ],
  areaServed: ["Haryana", "Punjab", "Delhi NCR"],
  // Cities named in the home page text
  cities: [
    "Ambala",
    "Kurukshetra",
    "Karnal",
    "Panipat",
    "Yamunanagar",
    "Chandigarh",
    "Panchkula",
    "Ludhiana",
    "Jalandhar",
    "Kaithal",
    "Sonipat",
    "Patiala",
    "Sangrur",
    "Bathinda",
    "Baghpat",
  ],
  // How many FAQ questions the home page shows; the rest are on the FAQ page
  faqOnHome: 4,
  logo: "/images/shridhar-consultants-logo.png", // 512x512, used for share previews and structured data
  logoSvg: "/images/shridhar-consultants-logo.svg",
  // Note: public/images/logo.png is an identical copy kept only so share previews and links
  // made by the old site (which used that address) keep working. Nothing here refers to it.
  favicon: "/favicon.png",
  appleIcon: "/apple-touch-icon.png",
  guidelinesPdf: "/documents/nhai-guidelines.pdf",
} as const;
