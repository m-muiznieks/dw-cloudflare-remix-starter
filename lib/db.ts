// prisma-client.ts
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import type { AppLoadContext } from "@remix-run/cloudflare";

// Declare a global variable to store the PrismaClient instance
declare global {
	var prisma: PrismaClient | undefined;
}

// Function to get the PrismaClient instance
export const prismaDB = (context: AppLoadContext) => {
	if (!context) {
		throw new Error("Sorry, unexpected error happened");
	}

	const { DATABASE_URL, NODE_ENV } = context.cloudflare.env;

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
