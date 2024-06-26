# Remix + Hono on Vite for Cloudflare Pages


This project is a starter template designed to provide a faster and simpler starting point for other projects, as well as for my own learning purposes. It combines the [Remix.run](https://remix.run/) framework with [Hono.dev](https://hono.dev/) using Vite.

This template demonstrates how to use Remix.run and Hono.dev together to create a web application that can be deployed on Cloudflare Pages. Hono offers middleware functionality and simplifies API development, including routing, error handling, and request processing.

This example already uses hono middleware, including basic authentication and user session management at middleware level.

## Credits

The idea for this project is based on the work of [Yusuke Wada](https://github.com/yusukebe). I used his [Remix and Hono on Vite](https://github.com/yusukebe/remix-and-hono-on-vite) as a foundation. If you are interested in the original source, please check out [Yusuke Wada's repo](https://github.com/yusukebe/remix-and-hono-on-vite).

## KEEP IN MIND!

This project is not production ready. Use it at your own risk. I am not responsible for any issues that may arise from using this project. The code is not optimized and is not supervised by any experienced developers.

## What's in it for me (and you)?

-   [Remix Auth](https://remix.run/resources/remix-auth) for authentication flow, including some prepared login/register pages an form examples.
-   [Hono](https://hono.dev/) for the server-side code, including middleware and routing.
-   [Tailwind CSS](https://tailwindcss.com/) for styling.
-   [shadcn-ui](https://ui.shadcn.com/) for UI components.
-   [Prisma](https://prisma.io/) for database management.
-   [Biome](https://biomejs.dev/) for code formatting instead of Eslint.
-   [TypeScript](https://www.typescriptlang.org/) for type checking.
-   [Vite](https://vitejs.dev/) for building the client-side code.
-   [Wrangler](https://developers.cloudflare.com/workers/wrangler/) for deploying the application to Cloudflare Pages.

## How to use it?

1.  Clone the repository to your local machine.
2.  Install the dependencies by running `npm install` or `bun install`, depending on your preferred package manager. Cloudflare pages uses `npm` by default, so Bun will not be used in deployment.
3.  Create a new Cloudflare account (if you don't have already) and set up a new project. See [Cloudflare's documentation](https://developers.cloudflare.com/pages) for more information.
4.  Add the .dev.vars file to your project, see the .dev.vars.example file for an example of used keys. 
5.  Project uses [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate) for database management. If you don't want to use it, you have to edit the `lib/db.ts` file and remove the `.$extends(withAccelerate())` function as well as the related imports. Otherwise - Prisma Accelerate has some free tier available.
6.  Project uses the [shadcn-ui](https://ui.shadcn.com/) library for UI components. If you want to configure and reinstall it - remove components.json file and run `npx shadcn-ui init` to set up your own configuration.
7.  Project uses the [Biome](https://biomejs.dev/) code formatter. It will check and format your code on every build, as well as called separately by `npm run format` or `bun run format`. Configuration is within biome.jsonc file. See [Biome's documentation](https://biomejs.dev/guides/getting-started/) for more information.
8.  Authentication is handled by [Remix Auth](https://remix.run/resources/remix-auth). Follow the instructions in the Remix Auth documentation to set up your own authentication flow. 

## How to deploy? 

I recommend to use the [wrangler](https://developers.cloudflare.com/workers/wrangler/) for deploying the application to Cloudflare Pages. Don't forget to log in to your Cloudflare account.
1. Install dependencies: `npm install` or `bun install`. Add your `.dev.vars` file to the root of the project, see the .dev.vars.example file for an example of used keys.
2. `bun wrangler pages project create [your project name here]`. This will create a new project. 
3. `bun run deploy` to use existing settings or `bun wrangler pages deploy build/client`. Additionally you can add `--commit-dirty=true` to silence the git commit message warning.
4. Thats all, wrangler will create a new project and deploy the application to Cloudflare Pages and show you the URL. Or visit the [dashboard](https://dash.cloudflare.com/) and find your project and look for the address there. 
5. Dont forget to add environment variables to the project at the project settings page. Otherwise the application will not work. Env variables will be available in next deploy, so you will have to redeploy the application to get the changes.

## Known issues

-   Don't be surprised if at some point the Cloudflare Pages build fails showing the `error 127` message. Simply after install it does not find installed dependencies and even simple `npm run build` fails. This bug is not related to this project, but rather to the Cloudflare Pages and can be solved by deleting and redeploying the application (even previously deployed versions fall for this bug on redeploy). For that reason I suggest to use the [wrangler](https://developers.cloudflare.com/workers/wrangler/) for deploying the application to Cloudflare Pages.

### Disclaimer
I want to be honest and not taking any credits for the code written. As I am not a professional developer, I rely heavily on the work of others and using  AI tools to put things together. :) So.. is this "powered by A.I."? :)) 