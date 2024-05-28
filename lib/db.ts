// prisma-client.ts
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import type { Bindings } from "server";

// Declare a global variable to store the PrismaClient instance
declare global {
	var prisma: PrismaClient | undefined;
}

// Function to get the PrismaClient instance
export const prismaDB = (ENV: Bindings) => {
	if (!ENV) {
		throw new Error("Sorry, unexpected error happened");
	}

	const { DATABASE_URL, NODE_ENV } = ENV;

	const databaseUrl = DATABASE_URL;
	const ENVIRONMENT: string = NODE_ENV; // production or development

	if (!databaseUrl) {
		throw new Error("DB url is not defined in the environment variables.");
	}

	const globalForPrisma = globalThis as typeof globalThis & {
		prisma?: PrismaClient;
	};

	if (ENVIRONMENT === "development") {
		if (!globalForPrisma.prisma) {
			globalForPrisma.prisma = new PrismaClient({
				datasourceUrl: databaseUrl,
			}).$extends(withAccelerate()) as unknown as PrismaClient;
		}
		return globalForPrisma.prisma;
	}

	return new PrismaClient({
		datasourceUrl: databaseUrl,
	}).$extends(withAccelerate()) as unknown as PrismaClient;
};
