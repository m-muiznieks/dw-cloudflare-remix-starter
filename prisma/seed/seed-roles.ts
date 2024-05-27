import { Permissions, Roles } from "data/user/user-permissions";
import { db } from "lib/db";

//https://github.com/prisma/prisma/discussions/20369#discussioncomment-7014464

const seedRolesAndPermissions = async () => {
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

seedRolesAndPermissions()
	.catch(console.error)
	.finally(() => db.$disconnect());
