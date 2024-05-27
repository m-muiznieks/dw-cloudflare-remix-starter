import { Form } from "@remix-run/react";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useEffect, useState } from "react";
import { UserRegisterSchema } from "schemas/user/user-auth-schema";
import type { z } from "zod";
import { FormError } from "../form-error";
import { FormCardWrapper } from "./auth-form-card-wrapper";

interface FormRegisterProps {
	headerLabel: string;
	headerDescription?: string;
	backButtonLabel?: string;
	backButtonHref?: string;
	formError?: string;
}

type FormRegisterData = z.infer<typeof UserRegisterSchema>;

const validateField = (
	name: string,
	value: string,
	formData: Partial<FormRegisterData>,
) => {
	const data = { ...formData, [name]: value };

	const result = UserRegisterSchema.safeParse(data);

	if (result.success) {
		return null;
	}

	const error = result.error.issues.find((issue) => issue.path.includes(name));
	return error ? error.message : null;
};

export const UserRegistrationForm = ({
	headerLabel,
	headerDescription,
	backButtonLabel,
	backButtonHref,
	formError,
}: FormRegisterProps) => {
	const [formData, setFormData] = useState<Partial<FormRegisterData>>({});
	const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
	const [formErr, setFormErr] = useState(formError || "");

	useEffect(() => {
		if (formError) {
			setFormErr(formError);
		}
	}, [formError]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => {
			const updatedData = { ...prevData, [name]: value };

			const error = validateField(name, value, updatedData);
			setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: error || "" }));

			if (name === "password" && updatedData.password2) {
				const password2Error = validateField(
					"password2",
					updatedData.password2,
					updatedData,
				);
				setFieldErrors((prevErrors) => ({
					...prevErrors,
					password2: password2Error || "",
				}));
			}

			return updatedData;
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		const isFormValid = !Object.values(fieldErrors).some(
			(error) => error !== "",
		);
		if (!isFormValid) {
			e.preventDefault();
			setFormErr("Please fix the errors in the form.");
		}
	};

	return (
		<FormCardWrapper
			headerLabel={headerLabel}
			headerDescription={headerDescription}
			backButtonLabel={backButtonLabel}
			backButtonHref={backButtonHref}
		>
			<Form method="post" className="grid gap-4" onSubmit={handleSubmit}>
				<div className="grid gap-2">
					<Label
						className={fieldErrors.email ? "text-red-500" : ""}
						htmlFor="email"
					>
						Email
					</Label>
					<Input
						className={fieldErrors.email ? "border-red-500" : ""}
						onChange={handleInputChange}
						onBlur={handleInputChange}
						type="email"
						name="email"
						required
						placeholder="Email"
					/>
					{fieldErrors.email && (
						<p className="text-red-500 text-xs">{fieldErrors.email}</p>
					)}
				</div>

				<div className="grid gap-2">
					<Label
						className={fieldErrors.password ? "text-red-500" : ""}
						htmlFor="password"
					>
						Password
					</Label>
					<Input
						className={fieldErrors.password ? "border-red-500" : ""}
						onChange={handleInputChange}
						onBlur={handleInputChange}
						type="password"
						name="password"
						autoComplete="current-password"
						required
						placeholder="Password"
					/>
					{fieldErrors.password && (
						<p className="text-red-500 text-xs">{fieldErrors.password}</p>
					)}
				</div>

				<div className="grid gap-2">
					<Label
						className={fieldErrors.password2 ? "text-red-500" : ""}
						htmlFor="password2"
					>
						Repeat Password
					</Label>
					<Input
						className={fieldErrors.password2 ? "border-red-500" : ""}
						onChange={handleInputChange}
						onBlur={handleInputChange}
						type="password"
						name="password2"
						autoComplete="current-password"
						required
						placeholder="Repeat Password"
					/>
					{fieldErrors.password2 && (
						<p className="text-red-500 text-xs">{fieldErrors.password2}</p>
					)}
				</div>

				{formErr && <FormError message={formErr} />}
				<Button aria-disabled={!!formErr} className="w-full" type="submit">
					Sign In
				</Button>
			</Form>
		</FormCardWrapper>
	);
};
