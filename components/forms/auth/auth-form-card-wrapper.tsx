import { Link } from "@remix-run/react";
import { cn } from "lib/utils";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../ui/card";

interface CardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	headerDescription?: string;
	backButtonLabel?: string;
	backButtonHref?: string;
	showSocial?: boolean;
}

/**
 * Wraps the children in a card with a header and footer form login/register forms.
 * @param headerLabel - string - The label for the header. Required.
 * @param headerDescription - string - The description for the header. Optional.
 * @param backButtonLabel - string - The label for the back button. Optional.
 * @param backButtonHref - string - The href for the back button. Optional.
 * @param showSocial - boolean - Whether to show the social login buttons. Optional.
 */
export const FormCardWrapper = ({
	children,
	headerLabel,
	headerDescription,
	backButtonLabel,
	backButtonHref,
	showSocial,
}: CardWrapperProps) => {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">{headerLabel}</CardTitle>
				<CardDescription>{headerDescription}</CardDescription>
			</CardHeader>

			<CardContent>
				{children}

				{showSocial && <SocialLoginButtons />}

				{backButtonLabel && backButtonHref && (
					<FormBackButton label={backButtonLabel} href={backButtonHref} />
				)}
			</CardContent>
		</Card>
	);
};

// ==> FORM HEADER TEXTS <== //
interface HeaderProps {
	label: string;
	description?: string;
}

export const FormHeaderTexts = ({ label, description }: HeaderProps) => {
	return (
		<div className="w-full flex flex-col gap-y-4 items-center justify-center">
			<h1 className={cn("text-3xl font-bold")}>{label}</h1>
			{description && (
				<p className="text-muted-foreground text-sm">{description}</p>
			)}
		</div>
	);
};

// ==> FORM SOCIAL LOGIN BUTTONS <== //
export const SocialLoginButtons = () => {
	const onClick = (provider: "google" | "github") => {
		// signIn(provider, {
		//     callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
		// });
	};

	return (
		<div className="w-full flex items-center justify-center gap-x-2">
			<Button
				size="lg"
				className="w-full"
				variant="outline"
				onClick={() => onClick("google")}
			>
				<FcGoogle className="h-5 w-5" />
			</Button>

			<Button
				size="lg"
				className="w-full"
				variant="outline"
				onClick={() => onClick("github")}
			>
				<FaGithub className="h-5 w-5" />
			</Button>
		</div>
	);
};

// ==> FORM FOOTER BACK BUTTON <== //
interface BackButtonProps {
	href: string;
	label: string;
}

export const FormBackButton = ({ href, label }: BackButtonProps) => {
	return (
		// <Button
		//     variant={'link'}
		//     className="font-normal w-full"
		//     size={'sm'}
		//     asChild
		//     onClick={handleClick} // Use the custom handleClick function
		// >
		<div className="mt-4 text-center text-sm">
			<Link to={href} className="hover:underline">
				{label}
			</Link>
		</div>
		// </Button>
	);
};
