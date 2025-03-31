"use client";

import React, { useState, useEffect } from 'react';
import { api } from "~/trpc/react";
import CountryCard from './Card';

interface Country {
  cca3: string;
  name: {
    common: string;
    official: string;
  };
  languages: Record<string, string>;
  currencies: Record<string, {
    name: string;
    symbol: string;
  }>;
  timezones: string[];
  borders: string[];
  flags: {
    png: string;
    alt?: string;
  };
}

const CountrySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const countryQuery = api.country.getByName.useQuery(
      { name: searchQuery },
      {
        enabled: isSearching && searchQuery.length > 0,
      }
  );

  useEffect(() => {
    if (isSearching && !countryQuery.isFetching) {
      setIsSearching(false);
    }
  }, [countryQuery.isFetching, isSearching]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
    }
  };

  const countries = countryQuery.data as Country[] | undefined;

  return (
      <div className="w-full max-w-4xl">
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a country..."
                className="flex-1 rounded-lg bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[hsl(280,100%,70%)]"
            />
            <button
                type="submit"
                className="rounded-lg bg-[hsl(280,100%,70%)] px-6 py-2 font-semibold text-white hover:bg-[hsl(280,100%,60%)]"
                disabled={countryQuery.isFetching}
            >
              {countryQuery.isFetching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {countryQuery.isError && (
            <div className="mb-6 rounded-lg bg-red-500/20 p-4 text-center">
              <p>Error: Could not find the country. Please try a different search.</p>
            </div>
        )}

        {!isSearching && countries && countries.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {countries.map((country) => (
                  <CountryCard
                      key={country.cca3}
                      name={country.name.common}
                      languages={country.languages || {}}
                      currencies={country.currencies || {}}
                      timezones={country.timezones || []}
                      borders={country.borders || []}
                      flag={{
                        png: country.flags.png,
                        alt: country.flags.alt ?? `Flag of ${country.name.common}`
                      }}
                  />
              ))}
            </div>
        )}

        {(!countries || countries.length === 0) && !countryQuery.isError && !countryQuery.isFetching && (
            <div className="text-center text-white/70">
              <p>Search for a country to display information</p>
            </div>
        )}
      </div>
  );
};

export default CountrySearch;