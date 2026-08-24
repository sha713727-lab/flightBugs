import { siteBrand } from "@/constants/siteBrand";

export const brandAssets = {
  siteLogo: {
    src: "/images/siteLogo.png",
    alt: siteBrand.legal,
    width: 512,
    height: 512,
  },
  homeLogo: {
    src: "/images/homeLogo.png",
    alt: siteBrand.legal,
    width: 512,
    height: 512,
  },
  heroAircraft: {
    src: "/images/heroAircraftPoster.jpg",
    alt: "Commercial aircraft on runway at sunset",
    width: 1920,
    height: 1080,
  },
  heroAircraftVideo: {
    src: "/videos/heroAircraft.mp4",
    poster: "/images/heroAircraftPoster.jpg",
    alt: "Commercial aircraft on runway at sunset",
  },
  heroAircraftMobileVideo: {
    src: "/videos/heroAircraftMobile.mp4",
    poster: "/images/heroAircraftPoster.jpg",
    alt: "Commercial aircraft on runway at sunset",
  },
  destinationLandingHeroVideo: {
    src: "/videos/destinationLandingHero.mp4",
    poster: "/images/heroAircraftPoster.jpg",
    alt: "Aircraft in flight",
  },
  destinationLandingHeroMobileVideo: {
    src: "/videos/destinationLandingHeroMobile.mp4",
    poster: "/images/heroAircraftPoster.jpg",
    alt: "Aircraft in flight",
  },
  airplaneAccent: {
    src: "/images/airplaneAccentJet.png",
    alt: "Airplane accent",
    width: 1696,
    height: 686,
  },
  favicon: {
    ico: "/favicon.ico",
    png32: "/images/favicon32.png",
    png48: "/images/favicon48.png",
    png192: "/images/favicon192.png",
    appleTouchIcon: "/images/appleTouchIcon.png",
  },
} as const;

export const destinationImages = {
  montreal: {
    src: "/images/destinations/montreal.png",
    alt: "Flights to Montreal",
  },
  newYork: {
    src: "/images/destinations/newYork.png",
    alt: "Flights to New York",
  },
  lasVegas: {
    src: "/images/destinations/lasVegas.png",
    alt: "Flights to Las Vegas",
  },
  miami: {
    src: "/images/destinations/miami.png",
    alt: "Flights to Miami",
  },
  cancun: {
    src: "/images/destinations/cancun.png",
    alt: "Flights to Cancun",
  },
  london: {
    src: "/images/destinations/london.png",
    alt: "Flights to London",
  },
  paris: {
    src: "/images/destinations/paris.png",
    alt: "Flights to Paris",
  },
  tokyo: {
    src: "/images/destinations/tokyo.png",
    alt: "Flights to Tokyo",
  },
} as const;

export const marketingImages = {
  runwayWing: {
    src: "/images/heroAircraftPoster.jpg",
    alt: "Airplane on tarmac at golden hour",
  },
  cabin: {
    src: "/images/hotelBookingService.webp",
    alt: "Premium airplane cabin seating",
  },
  smartTravelerAircraftVideo: {
    src: "/videos/smartTravelerAircraft.mp4",
    poster: "/images/heroAircraftPoster.jpg",
    alt: "Premium aircraft on the runway",
  },
  smartTravelerCabinVideo: {
    src: "/videos/smartTravelerCabin.mp4",
    poster: "/images/hotelBookingService.webp",
    alt: "Premium cabin interior",
  },
  globe: {
    src: "/images/earthGlobeSphere.png",
    alt: "Earth globe",
    width: 640,
    height: 640,
  },
  airportExperience: {
    src: "/images/thoughtfulService/airportExperience.jpg",
    alt: "Iconic global travel landmarks",
  },
  thoughtfulAirportVideo: {
    src: "/videos/thoughtfulAirportExperience.mp4",
    poster: "/images/thoughtfulService/airportExperience.jpg",
    alt: "Airport journey and global travel landmarks",
  },
  service: {
    src: "/images/thoughtfulService/travelSuccess.png",
    alt: "Thoughtful travel service",
  },
  travelSuccess: {
    src: "/images/thoughtfulService/travelSuccess.png",
    alt: "Unlock your travel success",
  },
  deals: {
    src: "/images/hotelBookingService.webp",
    alt: "Flight deals and flexible fares",
  },
  dealsVideo: {
    src: "/videos/thoughtfulFlightDeals.mp4",
    poster: "/images/hotelBookingService.webp",
    alt: "Flight deals and flexible fares",
  },
  finalTravel: {
    src: "/images/thoughtfulService/airportExperience.jpg",
    alt: "Iconic global travel landmarks",
  },
} as const;

export const partnerLogos = [
  { id: "airCanada", src: "/partners/airCanada.svg", alt: "Air Canada" },
  { id: "westJet", src: "/partners/westJet.svg", alt: "WestJet" },
  { id: "delta", src: "/partners/delta.svg", alt: "Delta" },
  { id: "united", src: "/partners/united.svg", alt: "United" },
  { id: "british", src: "/partners/british.svg", alt: "British Airways" },
  { id: "airFrance", src: "/partners/airFrance.svg", alt: "Air France" },
  { id: "lufthansa", src: "/partners/lufthansa.svg", alt: "Lufthansa" },
  { id: "emirates", src: "/partners/emirates.svg", alt: "Emirates" },
  { id: "qatar", src: "/partners/qatar.svg", alt: "Qatar Airways" },
  { id: "singapore", src: "/partners/singapore.svg", alt: "Singapore Airlines" },
  { id: "porter", src: "/partners/porter.svg", alt: "Porter" },
  { id: "flair", src: "/partners/flair.svg", alt: "Flair" },
  { id: "booking", src: "/partners/booking.svg", alt: "Booking.com" },
  { id: "expedia", src: "/partners/expedia.svg", alt: "Expedia" },
  { id: "skyScanner", src: "/partners/skyScanner.svg", alt: "Skyscanner" },
  { id: "hilton", src: "/partners/hilton.svg", alt: "Hilton" },
  { id: "wyndham", src: "/partners/wyndham.svg", alt: "Wyndham" },
  { id: "visa", src: "/partners/visa.svg", alt: "Visa" },
  { id: "masterCard", src: "/partners/masterCard.svg", alt: "Mastercard" },
  { id: "amex", src: "/partners/amex.svg", alt: "American Express" },
  { id: "blueRewards", src: "/partners/blueRewards.svg", alt: "Blue Rewards" },
] as const;
