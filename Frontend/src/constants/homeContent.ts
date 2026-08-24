import type { FlightSearchPlace } from "@/constants/flightSearchPlaces";

export type DestinationImageKey =
  | "montreal"
  | "newYork"
  | "lasVegas"
  | "miami"
  | "cancun"
  | "london"
  | "paris"
  | "tokyo";

export type DestinationItem = {
  readonly id: string;
  readonly name: string;
  readonly scope: "domestic" | "international";
  readonly imageKey: DestinationImageKey;
  readonly place: FlightSearchPlace;
};

export const homeValueLine = "You search, we ticket by phone." as const;

export const homeHeroSupportLine =
  "Search international routes worldwide, then call a specialist." as const;

export const homeAvailabilityLine = "Award-winning service · 24/7" as const;

export const homeFormTrustLine = "24/7 expert support • Canada & USA" as const;

export const destinations: ReadonlyArray<DestinationItem> = [
  {
    id: "london",
    name: "London",
    scope: "international",
    imageKey: "london",
    place: {
      id: "arp_lhr_gb",
      city: "London",
      iata: "LHR",
      name: "Heathrow",
      countryCode: "GB",
      kind: "airport",
    },
  },
  {
    id: "paris",
    name: "Paris",
    scope: "international",
    imageKey: "paris",
    place: {
      id: "arp_cdg_fr",
      city: "Paris",
      iata: "CDG",
      name: "Charles de Gaulle Airport",
      countryCode: "FR",
      kind: "airport",
    },
  },
  {
    id: "tokyo",
    name: "Tokyo",
    scope: "international",
    imageKey: "tokyo",
    place: {
      id: "arp_nrt_jp",
      city: "Tokyo",
      iata: "NRT",
      name: "Narita International Airport",
      countryCode: "JP",
      kind: "airport",
    },
  },
  {
    id: "cancun",
    name: "Cancun",
    scope: "international",
    imageKey: "cancun",
    place: {
      id: "arp_cun_mx",
      city: "Cancun",
      iata: "CUN",
      name: "Cancun International Airport",
      countryCode: "MX",
      kind: "airport",
    },
  },
  {
    id: "montreal",
    name: "Montreal",
    scope: "domestic",
    imageKey: "montreal",
    place: {
      id: "arp_yul_ca",
      city: "Montreal",
      iata: "YUL",
      name: "Montreal-Trudeau International Airport",
      countryCode: "CA",
      kind: "airport",
    },
  },
  {
    id: "new-york",
    name: "New York",
    scope: "domestic",
    imageKey: "newYork",
    place: {
      id: "arp_jfk_us",
      city: "New York",
      iata: "JFK",
      name: "John F. Kennedy International Airport",
      countryCode: "US",
      kind: "airport",
    },
  },
  {
    id: "miami",
    name: "Miami",
    scope: "domestic",
    imageKey: "miami",
    place: {
      id: "arp_mia_us",
      city: "Miami",
      iata: "MIA",
      name: "Miami International Airport",
      countryCode: "US",
      kind: "airport",
    },
  },
  {
    id: "las-vegas",
    name: "Las Vegas",
    scope: "domestic",
    imageKey: "lasVegas",
    place: {
      id: "arp_las_us",
      city: "Las Vegas",
      iata: "LAS",
      name: "Harry Reid International Airport",
      countryCode: "US",
      kind: "airport",
    },
  },
];

export function findDestinationPlaceByIata(
  iata: string,
): FlightSearchPlace | undefined {
  return destinations.find(
    (destination) => destination.place.iata === iata.toUpperCase(),
  )?.place;
}

export const faqItems = [
  {
    id: "book",
    question: "How do I book an international flight?",
    answer:
      "You search, we ticket by phone. Use the search on this page, pick an itinerary, then call our desk. A specialist confirms the live fare and issues your tickets.",
  },
  {
    id: "hours",
    question: "When can I call?",
    answer:
      "Award-winning service · 24/7. Specialists are available around the clock for travelers in Canada and the USA.",
  },
  {
    id: "pay",
    question: "Why don't I complete payment on the website?",
    answer:
      "Fares move quickly. Your agent verifies the live price, fare rules, and seat availability before ticketing, so you are not charged for an offer that has already expired.",
  },
  {
    id: "change",
    question: "Can I change or cancel after booking?",
    answer:
      "Call our desk with your name and quote reference. We apply the airline’s fare rules, explain any fees, and complete the change or cancellation for you.",
  },
  {
    id: "documents",
    question: "What documents do I need to fly?",
    answer:
      "International trips need a valid passport and any visas required for your destination or connections. For Canada and USA domestic legs, a government ID is usually enough. Ask your specialist if you are unsure.",
  },
  {
    id: "ready",
    question: "What should I have ready when I call?",
    answer:
      "Your route, travel dates, number of adults, cabin class, and the quote reference shown on your itinerary. We handle the rest 24/7.",
  },
] as const;

export const testimonials = [
  {
    id: "t01",
    name: "Daniel Park",
    role: "Business Traveler",
    quote:
      "I searched the London route, called the desk, and they ticketed me in the same conversation. Award-winning service, 24/7.",
    rating: 5,
    imageSrc: "/images/testimonials/avatar01.png",
    routeCode: "ICN",
  },
  {
    id: "t02",
    name: "Ava Chen",
    role: "Frequent Flyer",
    quote:
      "You search, we ticket by phone is exactly how it worked. Clear options, then a specialist who stayed on the line.",
    rating: 5,
    imageSrc: "/images/testimonials/avatar02.png",
    routeCode: "YVR",
  },
  {
    id: "t03",
    name: "Marcus Reid",
    role: "Weekend Explorer",
    quote:
      "Called late at night and still got a real person. 24/7 coverage made a tight weekend trip possible.",
    rating: 5,
    imageSrc: "/images/testimonials/avatar03.png",
    routeCode: "MIA",
  },
  {
    id: "t04",
    name: "Emma Collins",
    role: "Leisure Traveler",
    quote:
      "They confirmed the fare on the call so I wasn’t guessing. Phone ticketing felt safer than clicking buy.",
    rating: 5,
    imageSrc: "/images/testimonials/avatar04.png",
    routeCode: "CDG",
  },
  {
    id: "t05",
    name: "Noah Bennett",
    role: "Remote Professional",
    quote:
      "Long-haul in business was sorted in one call. I searched, they ticketed, and the itinerary came through immediately.",
    rating: 5,
    imageSrc: "/images/testimonials/avatar05.png",
    routeCode: "LHR",
  },
  {
    id: "t06",
    name: "Sofia Alvarez",
    role: "Family Traveler",
    quote:
      "Four tickets, one specialist. They walked the rules with us before anything was issued.",
    rating: 5,
    imageSrc: "/images/testimonials/avatar06.png",
    routeCode: "CUN",
  },
  {
    id: "t07",
    name: "Amit Sharma",
    role: "Frequent Traveler",
    quote:
      "No checkout maze. Search international flights, call the desk, done. That is how phone ticketing should work.",
    rating: 5,
    imageSrc: "/images/testimonials/avatar07.png",
    routeCode: "DEL",
  },
  {
    id: "t08",
    name: "Sarah Johnson",
    role: "Business Traveler",
    quote:
      "A last-minute change was handled on the phone in minutes. Award-winning service when the clock is against you.",
    rating: 5,
    imageSrc: "/images/testimonials/avatar08.png",
    routeCode: "JFK",
  },
  {
    id: "t09",
    name: "Ravi Patel",
    role: "Adventure Enthusiast",
    quote:
      "I picked Las Vegas in search, called, and they locked it. Simple, human, 24/7.",
    rating: 5,
    imageSrc: "/images/testimonials/avatar09.png",
    routeCode: "LAS",
  },
  {
    id: "t10",
    name: "Olivia Brooks",
    role: "City Hopper",
    quote:
      "The specialist quoted the live fare and ticketed before I hung up. That is how I want to book.",
    rating: 5,
    imageSrc: "/images/testimonials/avatar10.png",
    routeCode: "YYZ",
  },
  {
    id: "t11",
    name: "Ethan Morales",
    role: "Student Traveler",
    quote:
      "They explained documents and connections on the call so I didn’t have to guess at the airport.",
    rating: 5,
    imageSrc: "/images/testimonials/avatar11.png",
    routeCode: "MAD",
  },
  {
    id: "t12",
    name: "Mia Thompson",
    role: "Honeymoon Traveler",
    quote:
      "Multi-city was too much for a form. We searched the legs, then an agent built and ticketed the trip by phone.",
    rating: 5,
    imageSrc: "/images/testimonials/avatar12.png",
    routeCode: "NRT",
  },
  {
    id: "t13",
    name: "Jordan Blake",
    role: "Sports Traveler",
    quote:
      "Tight kickoff timeline. 24/7 desk, one call, tickets in my inbox. No drama.",
    rating: 5,
    imageSrc: "/images/testimonials/avatar13.png",
    routeCode: "ORD",
  },
  {
    id: "t14",
    name: "Hannah Lee",
    role: "Culture Seeker",
    quote:
      "You search, we ticket by phone. I used it for Paris and the specialist stayed with me until it was confirmed.",
    rating: 5,
    imageSrc: "/images/testimonials/avatar14.png",
    routeCode: "FCO",
  },
] as const;

export const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Search flights", href: "/en#search" },
      { label: "Destinations", href: "/en#destinations" },
      { label: "FAQ", href: "/en#faq" },
    ],
  },
] as const;
