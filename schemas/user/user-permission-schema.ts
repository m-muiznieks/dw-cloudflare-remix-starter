import { z } from "zod";
import { customZodError } from "./zod-error";

z.setErrorMap(customZodError);
// Define the schema for an individual permission
export const PermissionDetailsSchema = z.object({
	name: z.string(),
	description: z.string(),
});

export const PermissionsSchema = z.record(PermissionDetailsSchema);

export type PermissionType = z.infer<typeof PermissionsSchema>;

// Define the schema for an individual role
export const UserRoleSchema = z.object({
	name: z.string(),
	description: z.string(),
	permissions: z.array(z.string()), // Array of permission names
});

export const RolesSchema = z.array(UserRoleSchema);

export type RoleType = z.infer<typeof RolesSchema>;
