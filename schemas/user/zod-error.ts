import { z } from "zod";

//https://zod.dev/ERROR_HANDLING?id=a-working-example
export const customZodError: z.ZodErrorMap = (error, ctx) => {
	let message = `Error at "${error.path.join(".")}": `; // Start with the path to the error

	switch (error.code) {
		case z.ZodIssueCode.invalid_type:
			message += `Expected a ${error.expected}, but received ${error.received}.`;
			break;
		case z.ZodIssueCode.unrecognized_keys:
			message += `Unrecognized keys: ${error.keys.join(", ")}.`;
			break;
		case z.ZodIssueCode.invalid_union:
			message += "None of the union variants match.";
			break;
		case z.ZodIssueCode.invalid_enum_value:
			message += `Invalid enum value. Expected one of: ${error.options.join(
				", ",
			)}.`;
			break;
		case z.ZodIssueCode.invalid_date:
			message += "Invalid date.";
			break;
		case z.ZodIssueCode.invalid_string:
			message += `Invalid string. Expected format: ${error.validation}.`;
			break;
		case z.ZodIssueCode.too_small: {
			const minDetail = error.inclusive
				? `at least ${error.minimum}`
				: `greater than ${error.minimum}`;
			message += `Too small. Expected ${minDetail}. ${
				error.exact ? "Exact value required." : ""
			}`;
			break;
		}
		case z.ZodIssueCode.too_big: {
			const maxDetail = error.inclusive
				? `at most ${error.maximum}`
				: `less than ${error.maximum}`;
			message += `Too big. Expected ${maxDetail}. ${
				error.exact ? "Exact value required." : ""
			}`;
			break;
		}
		case z.ZodIssueCode.not_multiple_of:
			message += `Not a multiple of ${error.multipleOf}.`;
			break;
		default:
			message = ctx.defaultError; // Fallback to default message
			break;
	}

	return { message };
};
