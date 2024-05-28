import { Permissions, Roles } from "data/user/user-permissions";
import { prismaDB } from "lib/db";
import type { Bindings } from "server";

// Interface to ensure correct type for context

const seedRolesAndPermissions = async (context: Bindings) => {
	const db = prismaDB(context);
	for (const permission of Object.values(Permissions)) {
		await db.permission.upsert({
			where: { name: permission.name },
			update: {},
			create: permission,
		});
	}

	for (const role of Roles) {
		const createdRole = await db.userRole.upsert({
			where: { name: role.name },
			update: {},
			create: {
				name: role.name,
				description: role.description,
			},
		});

		for (const permissionName of role.permissions) {
			const permission = await db.permission.findUnique({
				where: { name: permissionName },
			});
			if (permission) {
				await db.rolePermission.create({
					data: {
						roleId: createdRole.id,
						permissionId: permission.id,
					},
				});
			}
		}
	}
};

export { seedRolesAndPermissions };
