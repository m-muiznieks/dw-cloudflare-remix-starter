import type { Context } from "hono";
import type { Bindings, Variables } from "server";
import type { PlatformProxy } from "wrangler";

type Cloudflare = Omit<PlatformProxy<Bindings, Variables>, "dispose">;

declare module "@remix-run/cloudflare" {
	interface AppLoadContext {
		cloudflare: Cloudflare;
		hono: Context;
	}
}
