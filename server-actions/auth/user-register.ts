import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { _getUserByEmail } from "data/user/get-user-data";
import { prismaDB } from "lib/db";
import { CreateNewUserSchema } from "schemas/user/create-new-user-schema";
import type { z } from "zod";
import type { Bindings } from "server";

type NewUser = z.infer<typeof CreateNewUserSchema>;

export const RegisterUser = async (values: NewUser, context: Bindings) => {
	const db = prismaDB(context);
	const validatedFields = CreateNewUserSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: validatedFields.error.message };
	}

	const { email, password } = validatedFields.data;

	try {
		const checkEmail = (await _getUserByEmail(
			email as string,
			context,
		)) as User;

		if (checkEmail?.id) {
			return { error: "Email already used!" };
		}

		let hashedPassword: string;
		if (password) {
			hashedPassword = await bcrypt.hash(password, 13);
			validatedFields.data.password = hashedPassword;
		}

		const defaultRole = await db.userRole.findUnique({
			where: { name: "USER" },
		});

		if (!defaultRole) {
			return { error: "Default role not found!" };
		}

		const user = await db.user.create({
			data: {
				...validatedFields.data,
				roleId: defaultRole.id,
			},
		});

		if (!user) {
			return { error: "User not created!" };
		}

		return {
			data: { id: user.id },
			status: 201,
		};
	} catch (error) {
		return { error: (error as Error).message };
	}
};
