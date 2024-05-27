import type { MiddlewareHandler } from "hono";

type Bindings = {
	MY_VAR: string;
	DATABASE_URL: string;
	NODE_ENV: string;
	AUTH_SECRET: string;
};

export const honoMW: MiddlewareHandler<{ Bindings: Bindings }> = async (
	c,
	next,
) => {
	console.log("hello from honoMW");
	await next();
};
