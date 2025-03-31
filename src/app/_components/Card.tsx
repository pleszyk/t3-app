import React from "react";
import Image from "next/image";

type CardProps = {
  name: string;
  languages: Record<string, string>;
  currencies: Record<string, { name: string; symbol: string }>;
  timezones: string[];
  borders: string[];
  flag: {
    png: string;
    alt: string;
  };
};

const Card = ({
  name,
  languages,
  currencies,
  timezones,
  borders,
  flag,
}: CardProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
      <div className="relative h-40 w-full overflow-hidden rounded-lg">
        <Image
          src={flag?.png}
          alt={flag?.alt || `Flag of ${name}`}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <h3 className="text-2xl font-bold">{name}</h3>
      <div className="space-y-2 text-sm">

        <p className="font-semibold">Languages:</p>
        <ul className="list-disc pl-5">
          {Object.entries(languages).map(([code, name]) => (
            <li key={code}>{name}</li>
          ))}
        </ul>

        <p className="font-semibold">Currencies:</p>
        <ul className="list-disc pl-5">
          {Object.entries(currencies).map(([code, { name, symbol }]) => (
            <li key={code}>
              {name} ({symbol})
            </li>
          ))}
        </ul>

        <p className="font-semibold">Timezones:</p>
        <ul className="max-h-24 list-disc overflow-y-auto pl-5">
          {timezones.map((timezone) => (
            <li key={timezone}>{timezone}</li>
          ))}
        </ul>

        <p>
          <span className="font-semibold">Borders:</span>{" "}
          {borders.length > 0 ? borders.join(", ") : "None"}
        </p>
      </div>
    </div>
  );
};

export default Card;
