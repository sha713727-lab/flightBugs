import {
  destinationImages,
  marketingImages,
} from "@/constants/brandAssets";
import {
  defaultFromPlace,
  defaultToPlace,
  type FlightSearchPlace,
} from "@/constants/flightSearchPlaces";
import { destinations } from "@/constants/homeContent";
import { supportPhone } from "@/constants/supportContact";

export const exploreLandingPath = "/en/explore" as const;

const parisDestination = destinations.find((item) => item.place.iata === "CDG");
const londonDestination = destinations.find((item) => item.place.iata === "LHR");
const tokyoDestination = destinations.find((item) => item.place.iata === "NRT");

export const exploreDefaultFrom = defaultFromPlace;

export const exploreDefaultTo: FlightSearchPlace =
  parisDestination?.place ?? defaultToPlace;

export const exploreLandingCopy = {
  spine: "You search, we ticket by phone.",
  navFlights: "Flights",
  navStays: "Stays",
  navCars: "Cars",
  navPackages: "Packages",
  navExplore: "Explore",
  navAi: "Plan with AI",
  heroEyebrow: "Search hundreds of flight options",
  heroHeading: "Find international flights. Compare with clarity.",
  heroBody:
    "Search live fares worldwide, compare Best · Cheapest · Fastest, then call a specialist to ticket — 24/7 for Canada and the USA.",
  searchCta: "Search flights",
  trustCompare: "Comparing live offers",
  trustFees: "No website checkout fees",
  trustChoose: "You choose. We ticket by phone.",
  trendingEyebrow: "Trending now",
  trendingHeading: "Popular international destinations",
  moodEyebrow: "Explore by mood",
  moodHeading: "Where do you want to feel?",
  priceEyebrow: "Destination inspiration",
  priceHeading: "Places to fly from Montreal",
  routesEyebrow: "Popular routes",
  routesHeading: "Routes travelers search most",
  galleryEyebrow: "Travel gallery",
  galleryHeading: "See the trip before you book",
  compareEyebrow: "How comparison works",
  compareHeading: "Best, cheapest, or fastest — you decide",
  compareBody:
    "We surface clear options so you can choose with confidence. Then a specialist tickets the live fare by phone.",
  aiEyebrow: "Plan with AI",
  aiHeading: "Tell us the trip. We’ll map the options.",
  aiBody:
    "Share destination, dates, budget, and vibe. We’ll suggest routes and stays — then ticket by phone when you’re ready.",
  closeHeading: "Ready to compare and call?",
  closeBody: `Search live international flights, then call ${supportPhone.display}. Award-winning specialists · 24/7.`,
  footerNote: "Search-first travel intelligence. Ticketing stays on the phone.",
} as const;

export const exploreProductTabs = [
  { id: "flights", label: "Flights" },
  { id: "stays", label: "Stays" },
  { id: "cars", label: "Cars" },
  { id: "packages", label: "Packages" },
] as const;

export const exploreTrending = [
  {
    id: "paris",
    name: "Paris",
    fromPrice: "From $489",
    image: destinationImages.paris,
    place: parisDestination?.place ?? defaultToPlace,
  },
  {
    id: "london",
    name: "London",
    fromPrice: "From $432",
    image: destinationImages.london,
    place: londonDestination?.place ?? defaultToPlace,
  },
  {
    id: "tokyo",
    name: "Tokyo",
    fromPrice: "From $741",
    image: destinationImages.tokyo,
    place: tokyoDestination?.place ?? defaultToPlace,
  },
  {
    id: "cancun",
    name: "Cancun",
    fromPrice: "From $318",
    image: destinationImages.cancun,
    place:
      destinations.find((item) => item.place.iata === "CUN")?.place ??
      defaultToPlace,
  },
  {
    id: "miami",
    name: "Miami",
    fromPrice: "From $198",
    image: destinationImages.miami,
    place:
      destinations.find((item) => item.place.iata === "MIA")?.place ??
      defaultToPlace,
  },
  {
    id: "new-york",
    name: "New York",
    fromPrice: "From $164",
    image: destinationImages.newYork,
    place:
      destinations.find((item) => item.place.iata === "JFK")?.place ??
      defaultToPlace,
  },
  {
    id: "las-vegas",
    name: "Las Vegas",
    fromPrice: "From $221",
    image: destinationImages.lasVegas,
    place:
      destinations.find((item) => item.place.iata === "LAS")?.place ??
      defaultToPlace,
  },
  {
    id: "montreal",
    name: "Montreal",
    fromPrice: "Hub city",
    image: destinationImages.montreal,
    place: defaultFromPlace,
  },
] as const;

export const exploreMoods = [
  {
    id: "beach",
    title: "Beach escapes",
    image: destinationImages.cancun,
    accent: "teal",
  },
  {
    id: "city",
    title: "City breaks",
    image: destinationImages.newYork,
    accent: "blue",
  },
  {
    id: "culture",
    title: "Food & culture",
    image: destinationImages.paris,
    accent: "pink",
  },
  {
    id: "lights",
    title: "Nightlife",
    image: destinationImages.lasVegas,
    accent: "orange",
  },
  {
    id: "adventure",
    title: "Adventure",
    image: destinationImages.tokyo,
    accent: "yellow",
  },
  {
    id: "weekend",
    title: "Weekend trips",
    image: destinationImages.miami,
    accent: "primary",
  },
] as const;

export const exploreCheapFlights = [
  {
    city: "Miami",
    code: "MIA",
    image: destinationImages.miami,
  },
  {
    city: "New York",
    code: "JFK",
    image: destinationImages.newYork,
  },
  {
    city: "Cancun",
    code: "CUN",
    image: destinationImages.cancun,
  },
  {
    city: "London",
    code: "LHR",
    image: destinationImages.london,
  },
  {
    city: "Paris",
    code: "CDG",
    image: destinationImages.paris,
  },
  {
    city: "Tokyo",
    code: "NRT",
    image: destinationImages.tokyo,
  },
] as const;

export const exploreRoutes = [
  {
    id: "yul-cdg",
    from: "Montreal",
    to: "Paris",
    fromCode: "YUL",
    toCode: "CDG",
    duration: "Typical 7h 15m",
  },
  {
    id: "yul-lhr",
    from: "Montreal",
    to: "London",
    fromCode: "YUL",
    toCode: "LHR",
    duration: "Typical 6h 45m",
  },
  {
    id: "yul-nrt",
    from: "Montreal",
    to: "Tokyo",
    fromCode: "YUL",
    toCode: "NRT",
    duration: "Typical 13h 20m",
  },
  {
    id: "yul-cun",
    from: "Montreal",
    to: "Cancun",
    fromCode: "YUL",
    toCode: "CUN",
    duration: "Typical 4h 30m",
  },
] as const;

export const exploreCompareSamples = [
  {
    id: "best",
    badge: "Best",
    airline: "Air Canada",
    depart: "09:45",
    arrive: "22:10",
    from: "YUL",
    to: "CDG",
    duration: "7h 25m",
    stops: "Direct",
    bags: "Carry-on included",
    note: "Best balance of duration, stops, and schedule",
  },
  {
    id: "cheap",
    badge: "Cheapest",
    airline: "Partner fare",
    depart: "14:20",
    arrive: "11:05+",
    from: "YUL",
    to: "CDG",
    duration: "15h 45m",
    stops: "1 stop",
    bags: "Personal item",
    note: "Lower fare option — longer travel time",
  },
  {
    id: "fast",
    badge: "Fastest",
    airline: "Air France",
    depart: "18:55",
    arrive: "07:40+",
    from: "YUL",
    to: "CDG",
    duration: "6h 45m",
    stops: "Direct",
    bags: "Carry-on included",
    note: "Shortest total journey time",
  },
] as const;

export const exploreGallery = [
  {
    id: "g1",
    image: destinationImages.paris,
    title: "Paris evenings",
    span: "wide",
  },
  {
    id: "g2",
    image: destinationImages.tokyo,
    title: "Tokyo lights",
    span: "tall",
  },
  {
    id: "g3",
    image: destinationImages.london,
    title: "London mornings",
    span: "square",
  },
  {
    id: "g4",
    image: marketingImages.airportExperience,
    title: "Airport moments",
    span: "wide",
  },
  {
    id: "g5",
    image: destinationImages.cancun,
    title: "Caribbean blue",
    span: "square",
  },
  {
    id: "g6",
    image: marketingImages.cabin,
    title: "Cabin comfort",
    span: "square",
  },
  {
    id: "g7",
    image: destinationImages.miami,
    title: "Miami skyline",
    span: "tall",
  },
  {
    id: "g8",
    image: marketingImages.runwayWing,
    title: "On the runway",
    span: "wide",
  },
] as const;
