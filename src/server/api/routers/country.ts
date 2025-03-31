import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type CountryResponse = Array<{
  name: {
    common: string;
    official: string;
    nativeName?: Record<
      string,
      {
        official: string;
        common: string;
      }
    >;
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc?: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Record<
    string,
    {
      name: string;
      symbol: string;
    }
  >;
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Record<string, string>;
  translations: Record<
    string,
    {
      official: string;
      common: string;
    }
  >;
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: {
    eng: {
      f: string;
      m: string;
    };
    fra: {
      f: string;
      m: string;
    };
  };
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  gini?: Record<string, number>;
  fifa?: string;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: number[];
  };
  postalCode?: {
    format: string;
    regex: string;
  };
}>;

export const countryRouter = createTRPCRouter({
  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${input.name}`,
        );

        return (await response.json()) as CountryResponse;
      } catch (error) {
        console.error("Error fetching country data:", error);
        throw new Error("Failed to fetch country data");
      }
    }),
});
