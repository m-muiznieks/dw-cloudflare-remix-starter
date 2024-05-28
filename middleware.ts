import type { MiddlewareHandler } from "hono";
import type { Bindings, Variables } from "./server";
import { isUserLoggedInServerSide } from "~/services/session.server";

declare module "hono" {
	//here we adjust the values that can be passed to the global context
	// they are set as c.set('key1', 'value1') and c.set('key2', ['value1', 'value2'])
	// https://hono.dev/api/context#contextvariablemap
	interface ContextVariableMap {
		key1: string;
		key2: string[];
	}
}

//BINDINGS ARE IMPORTED FROM THE SERVER.TS FILE

const honoMW: MiddlewareHandler<{
	Bindings: Bindings;
	Variables: Variables;
}> = async (c, next) => {
	console.log("ENV TEST", c.env);

	const isli = await isUserLoggedInServerSide({
		request: c.req.raw as Request,
		context: c.env as Bindings,
	});
	console.log("isLoggedIn", isli);
	await next();
};

export default honoMW;
