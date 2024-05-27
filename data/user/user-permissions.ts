import type { z } from "zod";
import type {
	PermissionsSchema,
	RolesSchema,
} from "../../schemas/user/user-permission-schema";

type PermissionType = z.infer<typeof PermissionsSchema>;
type RoleType = z.infer<typeof RolesSchema>;

export const Permissions: PermissionType = {
	//SUPERADMIN
	add_admin_users: {
		name: "add_admin_users",
		description: "Add new users with admin role",
	},
	delete_admin_users: {
		name: "delete_admin_users",
		description: "Delete users with admin role",
	},

	//ADMIN
	add_users: { name: "add_users", description: "Add new users" },
	manage_user_roles: {
		name: "manage_user_roles",
		description: "Manage user roles",
	},
	delete_users: { name: "delete_users", description: "Delete users" },

	//USERS
};

export const Roles: RoleType = [
	{
		name: "SUPERADMIN",
		description:
			"Has all access rights and permissions. Can add, delete, and manage all users, including admins.",
		permissions: Object.keys(Permissions),
	},
	{
		name: "ADMIN",
		description:
			"Has all access rights and permissions, except for deleting and managing other admins.",
		permissions: [
			Permissions.add_admin_users.name,
			Permissions.delete_admin_users.name,
			Permissions.manage_user_roles.name,
		],
	},
	{
		name: "USER",
		description:
			"Standard user role, that has only partial access rights related to website.",
		permissions: [],
	},
];
