import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const countryRouter = createTRPCRouter({
    getByName: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(async ({ input }) => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${input.name}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch country: ${response.status}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching country data:", error);
                throw new Error("Failed to fetch country data");
            }
        }),
});