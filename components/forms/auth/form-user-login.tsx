import { Form } from "@remix-run/react";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { FormError } from "../form-error";
import { FormCardWrapper } from "./auth-form-card-wrapper";

interface FormLoginProps {
	headerLabel: string;
	headerDescription?: string;
	backButtonLabel?: string;
	backButtonHref?: string;
	formError?: string;
}

export const UserLoginForm = ({
	headerLabel,
	headerDescription,
	backButtonLabel,
	backButtonHref,
	formError,
}: FormLoginProps) => {
	return (
		<FormCardWrapper
			headerLabel={headerLabel}
			headerDescription={headerDescription}
			backButtonLabel={backButtonLabel}
			backButtonHref={backButtonHref}
		>
			<Form method="post" className="grid gap-4">
				<div className="grid gap-2">
					<Label className={formError ? "text-red-500" : ""} htmlFor="email">
						Email
					</Label>
					<Input
						className={formError ? "border-red-500" : ""}
						type="email"
						name="email"
						required
						placeholder="Email"
					/>
				</div>

				<div className="grid gap-2">
					<Label className={formError ? "text-red-500" : ""} htmlFor="password">
						Password
					</Label>
					<Input
						className={formError ? "border-red-500" : ""}
						type="password"
						name="password"
						autoComplete="current-password"
						required
						placeholder="Password"
					/>
				</div>
				{/* Check if there is an error object and display the error */}
				{formError && <FormError message={formError} />}
				<Button className="w-full" type="submit">
					Sign In
				</Button>
			</Form>
		</FormCardWrapper>
	);
};
