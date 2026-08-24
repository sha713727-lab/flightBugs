import { destinationImages } from "@/constants/brandAssets";
import {
  defaultFromPlace,
  defaultToPlace,
  type FlightSearchPlace,
} from "@/constants/flightSearchPlaces";
import { destinations, testimonials } from "@/constants/homeContent";
import { supportPhone } from "@/constants/supportContact";

export const liveLandingPath = "/en/live" as const;

const londonDestination = destinations.find((item) => item.place.iata === "LHR");

export const liveLandingDefaultFrom = defaultFromPlace;

export const liveLandingDefaultTo: FlightSearchPlace =
  londonDestination?.place ?? defaultToPlace;

const liveCityLines: Record<string, string> = {
  montreal: "Start from home.",
  "new-york": "Always in motion.",
  "las-vegas": "Lights after landing.",
  miami: "Warmth on arrival.",
  cancun: "Sea and sky.",
  london: "History, then takeoff.",
  paris: "Arrive before evening.",
  tokyo: "A city unlike any other.",
};

export const liveLandingCopy = {
  badge: "LIVE · 24/7",
  spine: "You search, we ticket by phone.",
  availability: "Award-winning specialists. 24/7.",
  eyebrow: "LIVE DESK · INTERNATIONAL · 24/7",
  headingLineOne: "International flights.",
  headingLineTwo: "Ticketed by phone.",
  ritualEyebrow: "The ritual",
  filmstripEyebrow: "On the board",
  deskTitle: "Open the desk.",
  deskBody:
    "Search live flights, then call. A specialist tickets your itinerary by phone — no website checkout.",
  searchCta: "Search flights",
  proofEyebrow: "On the line",
  closeLine: "We’re on the line.",
  faqHeading: "Questions before you call",
} as const;

export const liveLandingRitual = [
  {
    index: "01",
    title: "Search",
    body: "Live offers. No checkout.",
  },
  {
    index: "02",
    title: "Call",
    body: supportPhone.display,
  },
  {
    index: "03",
    title: "Ticket",
    body: "Specialist issues the tickets.",
  },
] as const;

export const liveLandingCities = destinations.map((item) => ({
  id: item.id,
  name: item.name,
  line: liveCityLines[item.id] ?? item.name,
  image: destinationImages[item.imageKey],
  place: item.place,
}));

const liveProofIds = ["t02", "t03", "t08"] as const;

export const liveLandingProof = liveProofIds.flatMap((id) => {
  const item = testimonials.find((entry) => entry.id === id);
  return item ? [item] : [];
});

export const liveLandingFaq = [
  {
    id: "book",
    question: "How do I book a flight?",
    answer:
      "You search, we ticket by phone. Use the live desk on this page, pick an itinerary, then call. A specialist confirms the live fare and issues your tickets.",
  },
  {
    id: "pay",
    question: "Why don’t I pay on the website?",
    answer:
      "Fares move quickly. Your agent verifies the live price, fare rules, and seat availability before ticketing, so you are not charged for an offer that has already expired.",
  },
  {
    id: "hours",
    question: "When can I call?",
    answer:
      "Award-winning service · 24/7. Specialists are available around the clock for travelers in Canada and the USA.",
  },
  {
    id: "ready",
    question: "What should I have ready when I call?",
    answer:
      "Your route, travel dates, number of adults, cabin class, and the quote reference shown on your itinerary. We handle the rest 24/7.",
  },
] as const;
