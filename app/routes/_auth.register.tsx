import { type ActionFunction, json, redirect } from "@remix-run/cloudflare";
import { useActionData } from "@remix-run/react";
import { UserRegistrationForm } from "components/forms/auth/form-user-register";
import type { CreateNewUserSchema } from "schemas/user/create-new-user-schema";
import type { AuthenticatedUserSchema } from "schemas/user/user-auth-schema";
import { RegisterUser } from "server-actions/auth/user-register";
import { z } from "zod";

const registrationSchema = z
	.object({
		email: z.string().email({ message: "Invalid email address" }),
		password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters" }),
		password2: z.string().min(6, { message: "Passwords must be equal." }),
	})
	.refine((data) => data.password === data.password2, {
		message: "Passwords must match",
		path: ["password2"], // Show error on password2 field
	});

type User = z.infer<typeof AuthenticatedUserSchema>;
type ActionData = { user?: User; error?: string };

export const loader = async () => {
	return null;
};

export const action: ActionFunction = async ({ request, context }) => {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	const password2 = formData.get("password2");

	const validatedFields = registrationSchema.safeParse({
		email,
		password,
		password2,
	});
	if (!validatedFields.success) {
		return json({ errors: "Error in form" }, { status: 400 });
	}

	try {
		type NewUser = z.infer<typeof CreateNewUserSchema>;

		const { env } = context.cloudflare;
		const user = await RegisterUser({ email, password } as NewUser, env);
		if (user.error) {
			return json({ error: user.error }, { status: 400 });
		}

		if (!user) {
			throw new Error("User registration failed.");
		}

		return redirect("/login");
	} catch (error) {
		return json({ error: (error as Error).message });
	}
};

export default function Screen() {
	const actionData = useActionData<ActionData>();

	return (
		<UserRegistrationForm
			headerLabel="Register"
			headerDescription="Create an account"
			backButtonLabel="Have an account? Log in here!"
			backButtonHref="/login"
			formError={actionData?.error}
		/>
	);
}
