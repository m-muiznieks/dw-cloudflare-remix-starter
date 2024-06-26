import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { _getUserByEmail } from "data/user/get-user-data";
import {
	AuthenticatedUserSchema,
	type UserAuthSchema,
} from "schemas/user/user-auth-schema";
import type { z } from "zod";
import type { Bindings } from "server";

type CredentialsType = z.infer<typeof AuthenticatedUserSchema>;
type UserType = z.infer<typeof UserAuthSchema>;

type UserWithRole = User & {
	role: {
		id: string;
		name: string;
	};
};

export const login = async (
	values: CredentialsType,
	context: Bindings,
): Promise<UserType | { error: string }> => {
	const validatedFields = AuthenticatedUserSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid credentials" };
	}

	const { email, password } = validatedFields.data;

	const user = (await _getUserByEmail(
		email as string,
		context,
	)) as UserWithRole;

	if (!user || !user.password) {
		return { error: "User not found" };
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordMatch) {
		return { error: "Invalid credentials" };
	}

	return {
		id: user.id,
		role: user.role,
		email: user.email,
	} as UserType;
};
