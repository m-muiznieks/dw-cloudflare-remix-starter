import type { AppLoadContext } from "@remix-run/cloudflare";
import type { MiddlewareHandler } from "hono";

declare module "hono" {
	//here we adjust the values that can be passed to the global context
	// they are set as c.set('key1', 'value1') and c.set('key2', ['value1', 'value2'])
	// https://hono.dev/api/context#contextvariablemap
	interface ContextVariableMap {
		key1: string;
		key2: string[];
	}
}

//Everything that must be passed to the middleware.
type Bindings = {
	MY_VAR: string;
	DATABASE_URL: string;
	NODE_ENV: string;
	AUTH_SECRET: string;
};

const honoMW: MiddlewareHandler<{
	Bindings: Bindings;
	Context: AppLoadContext;
}> = async (c, next) => {
	console.log("ENV TEST", c.env.NODE_ENV);
	console.log("hello from honoMW");

	await next();
};

export default honoMW;
