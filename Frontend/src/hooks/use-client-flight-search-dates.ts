"use client";

import { useSyncExternalStore } from "react";

import {
  defaultFlightSearchDates,
  formatIsoDate,
} from "@/utils/default-flight-search-dates";

const emptySubscribe = () => () => undefined;

export function useClientFlightSearchDates(): {
  readonly departDate: string;
  readonly returnDate: string;
  readonly todayIso: string;
  readonly ready: boolean;
} {
  const ready = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!ready) {
    return {
      departDate: "",
      returnDate: "",
      todayIso: "",
      ready: false,
    };
  }

  const dates = defaultFlightSearchDates();
  return {
    departDate: dates.departDate,
    returnDate: dates.returnDate,
    todayIso: formatIsoDate(new Date()),
    ready: true,
  };
}
