import { destinationImages } from "@/constants/brandAssets";
import {
  defaultFromPlace,
  defaultToPlace,
  type FlightSearchPlace,
} from "@/constants/flightSearchPlaces";
import { destinations, testimonials } from "@/constants/homeContent";
import { supportPhone } from "@/constants/supportContact";

export const europeLandingPath = "/en/europe" as const;

const parisDestination = destinations.find((item) => item.place.iata === "CDG");
const londonDestination = destinations.find((item) => item.place.iata === "LHR");
const tokyoDestination = destinations.find((item) => item.place.iata === "NRT");

export const europeLandingDefaultFrom = defaultFromPlace;

export const europeLandingDefaultTo: FlightSearchPlace =
  parisDestination?.place ?? defaultToPlace;

export const europeLandingCopy = {
  announcement: "You search, we ticket by phone.",
  eyebrow: "Destinations / Worldwide",
  headingLineOne: "Flights",
  headingLineTwo: "Worldwide",
  heroSupport:
    "Search live international flights to cities across the globe, then call our desk. A specialist tickets your itinerary by phone — 24/7 for Canada and the USA.",
  introHeading: "The world is more than a destination.",
  introBody:
    "From North America to Europe, Asia, and beyond — you search, we ticket by phone. Award-winning service, around the clock.",
  introCta: "Explore cities",
  citiesHeading: "Explore the world, one city at a time.",
  whyEyebrow: "Why call our desk?",
  experiencesHeading: "Experience the world beyond the guidebook.",
  flightInfoHeading: "Flights worldwide",
  seasonsHeading: "Best time to fly",
  ctaHeading: "Your next trip starts here.",
  ctaBody: "Find your flight, then call. We ticket by phone.",
  ctaButton: "Search available flights",
  searchCta: "Search flights",
  proofEyebrow: "International travelers",
  proofHeading: "What callers say",
} as const;

export const europeLandingCities = [
  {
    id: "london",
    name: "London",
    line: "History at every corner.",
    image: destinationImages.london,
    place: londonDestination?.place ?? defaultToPlace,
  },
  {
    id: "paris",
    name: "Paris",
    line: "Fashion, design and timeless streets.",
    image: destinationImages.paris,
    place: parisDestination?.place ?? defaultToPlace,
  },
  {
    id: "tokyo",
    name: "Tokyo",
    line: "A city unlike anywhere else.",
    image: destinationImages.tokyo,
    place: tokyoDestination?.place ?? defaultToPlace,
  },
] as const;

export const europeLandingReasons = [
  {
    number: "01",
    title: "Worldwide routes",
    body: "Search live flights to cities across North America, Europe, Asia, and beyond.",
  },
  {
    number: "02",
    title: "Iconic cities",
    body: "London, Paris, Tokyo, New York, and more — ticketed from Canada and the USA.",
  },
  {
    number: "03",
    title: "You search, we ticket",
    body: "No website checkout. A specialist confirms the live fare and issues your tickets by phone.",
  },
  {
    number: "04",
    title: "Award-winning, 24/7",
    body: "Call any time. Fare rules, documents, and changes are handled by our desk.",
  },
] as const;

export const europeLandingExperiences = [
  {
    id: "art",
    label: "Art & history",
    title: "Museums, streets, and golden hour",
    image: destinationImages.paris,
  },
  {
    id: "cities",
    label: "Iconic cities",
    title: "London, Paris, Tokyo, and beyond",
    image: destinationImages.london,
  },
  {
    id: "service",
    label: "Personal desk",
    title: "Award-winning service, 24/7",
    image: {
      src: "/images/thoughtfulService/travelSuccess.png",
      alt: "Travel specialist service",
    },
  },
  {
    id: "airport",
    label: "The journey",
    title: "Airport to the first evening out",
    image: {
      src: "/images/thoughtfulService/airportExperience.jpg",
      alt: "Iconic travel landmarks",
    },
  },
] as const;

export const europeLandingFacts = [
  { label: "From", value: "Canada & USA" },
  { label: "Destination", value: "Worldwide" },
  { label: "Popular airports", value: "LHR · CDG · NRT · JFK" },
  { label: "Cabin options", value: "Economy / Business" },
] as const;

export const europeLandingSeasons = [
  {
    id: "spring",
    name: "Spring",
    months: "Mar–May",
    body: "Mild weather in many cities — a strong window for Europe and North America.",
  },
  {
    id: "summer",
    name: "Summer",
    months: "Jun–Aug",
    body: "Peak season. Book earlier, then call so a specialist can lock the live fare.",
  },
  {
    id: "autumn",
    name: "Autumn",
    months: "Sep–Nov",
    body: "Shoulder season — often the most comfortable weather for city exploration.",
  },
  {
    id: "winter",
    name: "Winter",
    months: "Dec–Feb",
    body: "Festive capitals, ski season, and quieter museums. Our desk tickets these routes 24/7.",
  },
] as const;

export const europeLandingFaq = [
  {
    id: "visa",
    question: "Do I need a visa to travel?",
    answer:
      "It depends on your passport, destination, connections, and length of stay. When you call, a specialist reviews the itinerary with you so you know which documents to carry before tickets are issued.",
  },
  {
    id: "airports",
    question: "What are popular airports you ticket?",
    answer:
      "We search worldwide. London Heathrow, Paris Charles de Gaulle, Tokyo Narita, and New York JFK are among the airports we ticket most from Canada and the USA. Your agent can route other gateways if your dates or cabin need it.",
  },
  {
    id: "when",
    question: "When is the best time to travel?",
    answer:
      "It depends on the destination. Shoulder months are often more comfortable for city trips; summer and holidays are busier. Search dates on this page, then call so we can ticket the fare that is actually available.",
  },
  {
    id: "early",
    question: "How early should I book my flight?",
    answer:
      "For summer and holidays, search as soon as your dates are firm. Fares move quickly. Our desk confirms the live price on the phone before ticketing so you are not charged for an expired offer.",
  },
  {
    id: "manage",
    question: "Can I manage my booking online?",
    answer: `No website checkout and no self-service change flow. You search here, then call ${supportPhone.display}. We apply the airline’s fare rules and complete changes or cancellations for you — 24/7.`,
  },
] as const;

const europeProofIds = ["t05", "t04", "t14"] as const;

export const europeLandingProof = europeProofIds.flatMap((id) => {
  const item = testimonials.find((entry) => entry.id === id);
  return item ? [item] : [];
});

export const europeLandingNav = [
  { label: "Book flights", href: "#search" },
  { label: "Destinations", href: "#cities" },
  { label: "Travel info", href: "#flight-info" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "/en/about?from=europe" },
  { label: "Contact", href: "/en/contact?from=europe" },
] as const;
