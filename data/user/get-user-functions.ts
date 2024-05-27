import type { User } from "@prisma/client/edge";
import type { AppLoadContext } from "@remix-run/cloudflare";
import { prismaDB } from "lib/db";

type UserWithRole = User & {
	role: {
		id: string;
		name: string;
	};
};

export const _getUserByEmail = async (
	email: string,
	c?: AppLoadContext,
): Promise<User | { error: string }> => {
	if (!email) {
		return { error: "Email is required!" };
	}
	console.log("CONTEXT", c);
	try {
		const db = prismaDB(c);

		const user = (await db.user.findUnique({
			where: { email },
			include: {
				role: {
					select: {
						name: true,
						id: true,
					},
				},
			},
		})) as UserWithRole;
		console.log("USER FROM DB DATA", user);
		if (!user) {
			return { error: "User not found!" };
		}
		return user as User;
	} catch (error) {
		return { error: (error as Error).message };
	}
};

export const _getUserById = async (
	id: string,
	c?: AppLoadContext,
): Promise<User | null | { error: string }> => {
	if (!id) {
		return { error: "Id is required!" };
	}

	try {
		const db = prismaDB(c);
		const user = await db.user.findUnique({
			where: { id },
			include: {
				role: true,
			},
		});
		if (!user) {
			return null;
		}
		return user;
	} catch (error) {
		return { error: (error as Error).message };
	}
};

export const _getUserByUsername = async (
	username: string,
	c?: AppLoadContext,
): Promise<User | null | { error: string }> => {
	if (!username) {
		return { error: "Username is required!" };
	}

	try {
		const db = prismaDB(c);
		const user = await db.user.findUnique({
			where: { userName: username },
			include: {
				role: true,
			},
		});

		if (!user) {
			return null;
		}
		return user;
	} catch (error) {
		return { error: (error as Error).message };
	}
};
