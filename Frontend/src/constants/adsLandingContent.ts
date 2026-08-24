import { destinationImages } from "@/constants/brandAssets";
import {
  defaultFromPlace,
  defaultToPlace,
  type FlightSearchPlace,
} from "@/constants/flightSearchPlaces";
import { destinations, testimonials } from "@/constants/homeContent";
import { supportPhone } from "@/constants/supportContact";

export const adsLandingPath = "/en/book" as const;

const londonDestination = destinations.find((item) => item.place.iata === "LHR");

export const adsLandingDefaultFrom = defaultFromPlace;

export const adsLandingDefaultTo: FlightSearchPlace =
  londonDestination?.place ?? defaultToPlace;

export const adsLandingCopy = {
  spine: "You search, we ticket by phone.",
  eyebrow: "INTERNATIONAL FLIGHTS · CANADA & USA",
  headingLineOne: "International flights.",
  headingLineTwo: "Ticketed by phone.",
  heading: "International flights. Ticketed by phone.",
  sub: "Live international fares. Award-winning specialists. 24/7 for Canada and the USA.",
  searchHint: "See live offers, then call. We ticket on the line.",
  searchCta: "Search flights",
  trustHours: "24/7",
  trustCheckout: "No website checkout",
  trustRegion: "Canada & USA",
  stepsHeading: "How it works",
  whyHeading: "Why call instead of buying online",
  citiesHeading: "Where are you flying?",
  proofHeading: "Travelers who called",
  faqHeading: "Questions before you call",
  closeHeading: "Ready when you are — including 2am.",
  closeBody:
    "Search live flights, then call. A specialist tickets your itinerary by phone.",
} as const;

export const adsLandingSteps = [
  {
    index: "1",
    title: "Search live flights",
    body: "Check routes and dates on this page. No checkout.",
  },
  {
    index: "2",
    title: `Call ${supportPhone.display}`,
    body: "Tap the number. A specialist picks up 24/7.",
  },
  {
    index: "3",
    title: "We ticket by phone",
    body: "We confirm the live fare and issue the tickets on the line.",
  },
] as const;

export const adsLandingReasons = [
  {
    title: "Fares move",
    body: "We confirm the live price, seats, and fare rules before ticketing.",
  },
  {
    title: "No website checkout",
    body: "You are not charged for an offer that has already expired.",
  },
  {
    title: "Award-winning, 24/7",
    body: "The desk is open around the clock for Canada and the USA.",
  },
] as const;

export const adsLandingCities = destinations.map((item) => ({
  id: item.id,
  name: item.name,
  image: destinationImages[item.imageKey],
  place: item.place,
}));

const adsProofIds = ["t02", "t04"] as const;

export const adsLandingProof = adsProofIds.flatMap((id) => {
  const item = testimonials.find((entry) => entry.id === id);
  return item ? [item] : [];
});

export const adsLandingFaq = [
  {
    id: "book",
    question: "How do I book a flight?",
    answer:
      "You search, we ticket by phone. Use the search on this page, pick an itinerary, then call our desk. A specialist confirms the live fare and issues your tickets.",
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
