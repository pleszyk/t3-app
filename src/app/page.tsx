import { HydrateClient } from "~/trpc/server";
import CountrySearch from "~/app/_components/CountrySearch";

export default function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Country Explorer
          </h1>
          <p className="text-center text-xl">
            Search for countries around the world and discover information about
            them.
          </p>
          <CountrySearch />
        </div>
      </main>
    </HydrateClient>
  );
}
