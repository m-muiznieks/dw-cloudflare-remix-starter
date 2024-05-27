import type { PlatformProxy } from "wrangler";

interface Env {
	NODE_ENV: string;
	DATABASE_URL: string;
	MY_VAR: string;
	AUTH_SECRET: string;
}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
	interface AppLoadContext {
		cloudflare: Cloudflare;
	}
}
