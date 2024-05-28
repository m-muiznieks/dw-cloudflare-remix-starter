import type { Context } from "hono";
import type { PlatformProxy } from "wrangler";

interface Env {
	NODE_ENV: string;
	DATABASE_URL: string;
	AUTH_SECRET: string;
}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
	interface AppLoadContext {
		cloudflare: Cloudflare;
		c: Context;
	}
}
