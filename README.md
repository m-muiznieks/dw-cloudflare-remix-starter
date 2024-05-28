# Remix + Hono on Vite for Cloudflare Pages


This project is a starter template designed to provide a faster and simpler starting point for other projects, as well as for my own learning purposes. It combines the [Remix.run](https://remix.run/) framework with [Hono.dev](https://hono.dev/) using Vite.

This template demonstrates how to use Remix.run and Hono.dev together to create a web application that can be deployed on Cloudflare Pages. Hono offers middleware functionality and simplifies API development, including routing, error handling, and request processing.

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

## How to use it

1.  Clone the repository to your local machine.
2.  Install the dependencies by running `npm install` or `bun install`, depending on your preferred package manager. Cloudflare pages uses `npm` by default, so Bun will not be used in deployment.
3.  Create a new Cloudflare account (if you don't have already) and set up a new project. See [Cloudflare's documentation](https://developers.cloudflare.com/pages) for more information.
4.  Add the .dev.vars file to your project, see the .dev.vars.example file for an example of used keys. 
5.  Project uses [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate) for database management. If you don't want to use it, you have to edit the `lib/db.ts` file and remove the `.$extends(withAccelerate())` function as well as the related imports. Otherwise - Prisma Accelerate has some free tier available.
6.  Project uses the [shadcn-ui](https://ui.shadcn.com/) library for UI components. If you want to configure and reinstall it - remove components.json file and run `npx shadcn-ui init` to set up your own configuration.
7.  Project uses the [Biome](https://biomejs.dev/) code formatter. It will check and format your code on every build, as well as called separately by `npm run format` or `bun run format`. Configuration is within biome.jsonc file. See [Biome's documentation](https://biomejs.dev/guides/getting-started/) for more information.
8.  Authentication is handled by [Remix Auth](https://remix.run/resources/remix-auth). Follow the instructions in the Remix Auth documentation to set up your own authentication flow. 

## Known issues

-   Hidration issues.
-   Don't be surprised if at some point the Cloudflare Pages build fails showing the `error 127` message. I  am waiting for reappearing of the issue, to report it, as I am sure, that it is not related to the project itself, but rather to the Cloudflare Pages. It can be solved simply by deleting and redeploying the application. :/ To be honest - I am using only a github repo connection, I dont know if that can surface by deploying the application using wrangler. I will try to find out and update the issue if I find out.