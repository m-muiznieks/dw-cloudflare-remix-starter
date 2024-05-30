import devServer, { defaultOptions } from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";

import {
	vitePlugin as remix,
	cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { remixPWA } from "@remix-pwa/dev";

export default defineConfig({
	ssr: {
		resolve: {
			externalConditions: ["workerd", "worker"],
		},
	},
	plugins: [
		remixCloudflareDevProxy(),
		remix(),
		devServer({
			adapter,
			entry: "server.ts",
			exclude: [...defaultOptions.exclude, "/assets/**", "/app/**"],
			injectClientScript: false,
		}),
		tsconfigPaths(),
		remixPWA(),
	],
});
