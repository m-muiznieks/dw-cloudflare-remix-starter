import { z } from "zod";
import { customZodError } from "./zod-error";

z.setErrorMap(customZodError);

export const CreateNewUserSchema = z.object({
	email: z.string().email({
		message: "Email is required!",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 symbols!",
	}),
});
