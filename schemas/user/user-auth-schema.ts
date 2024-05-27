import { z } from "zod";
import { PermissionsSchema } from "./user-permission-schema";
import { customZodError } from "./zod-error";

z.setErrorMap(customZodError);

export const SettingsSchema = z
	.object({
		id: z.string(),
		name: z.optional(z.string()),
		isTwoFactorEnabled: z.optional(z.boolean()),
		//role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.TICKET_CONTROLLER]),
		email: z.optional(z.string().email()),
		password: z.optional(z.string().min(6)),
		newPassword: z.optional(z.string().min(6)),
	})
	.refine(
		(data) => {
			if (data.password && !data.newPassword) {
				return false;
			}
			return true;
		},
		{
			message: "New Password can not be empty!",
			path: ["newPassword"],
		},
	)
	.refine(
		(data) => {
			if (!data.password && data.newPassword) {
				return false;
			}
			return true;
		},
		{
			message: "Password can not be empty!",
			path: ["password"],
		},
	);

export const ResetPasswordSchema = z.object({
	email: z.string().email({
		message: "Email is required!",
	}),
});

export const NewPasswordSchema = z.object({
	password: z.string().min(6, {
		message: "Minimum 6 symbols are required!",
	}),
});

export const LoginSchema = z.object({
	username: z
		.string()
		.min(6, {
			message: "Username must be at least 6 symbols!",
		})
		.optional(),
	email: z.string().email({ message: "Epasts ir obligāts!" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 symbols!" }),
	code: z.optional(z.string()),
});

export const AuthRegistrationSchema = z.object({
	email: z.string().email({ message: "Epasts ir obligāts!" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 symbols!" }),
	password2: z
		.string()
		.min(6, { message: "Password must be at least 6 symbols!" }),
});

export const UserRegisterSchema = z
	.object({
		email: z.string().email({
			message: "Invalid email address",
		}),
		password: z.string().min(6, {
			message: "Password must be at least 6 characters long",
		}),
		password2: z.string(),
	})
	.refine((data) => data.password === data.password2, {
		message: "Passwords do not match",
		path: ["password2"],
	});

export const AuthenticatedUserSchema = z.object({
	email: z.string().email({ message: "Email is required!" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 symbols!" }),
});

export const UserAuthSchema = z.object({
	id: z.string(),
	email: z.string().email({ message: "Email is required!" }),
	role: z.object({
		id: z.string(),
		name: z.string(),
	}),
	permissions: PermissionsSchema,
});
