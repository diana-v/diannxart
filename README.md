# Project diannXart

The main purpose of this project is to showcase artwork. It is a Next.js app that uses Tailwind for styling and Sanity.io as headless CMS.

It is deployed using Vercel to the following domains:
- https://diannxart.vercel.app
- https://xart.diann.dev

## Setup

1. Install Node LTS
2. Copy file `.env` to `env.development.local`
3. Go to https://www.sanity.io/ and grab secrets
4. `npm ci` Install modules
5. `npm run dev` Start local server
6. `npm run sanity:dev` Start Sanity studio local server

## CI/CD

By introducing new Environment variables or modifying existing one please read bellow:

1. `.env` file: DO NOT ADD SECRETS TO THIS FILE. This is a good place for defaults.
2. `.env.development.local` file: Here you place all your secrets. This will overwrite .env default values. Do not commit this file to the repository. 
3. All ENV variables at `.env` file should also be added to Vercel > Settings > Environment Variables 
4. Application ENV variables must be prefixed with `NEXT_`
5. Sanity ENV variables must be prefixed with `SANITY_STUDIO_`

   > ⚠️ **Attention!** Only ENV variables added to Vercel will have effect after deployment.

## Used tools

-   [NextJs](https://nextjs.org) + [Typescript](https://www.typescriptlang.org)
-   [Sanity](https://www.sanity.io/)
-   [TailwindCss](https://tailwindcss.com) - because it is tree-shakable
-   [Eslint](https://eslint.org) + [prettier](https://prettier.io) - Code quality
-   [Stylelint](https://stylelint.io) + [prettier](https://prettier.io) - Code Quality
-   [SASS + css module](https://sass-lang.com) - css preprocessor

## Important information
1. Sanity studio dev server only runs error free when environment variables are loaded using VITE's convention `import.meta.env.KEY`. Please see [sanity.config.ts](sanity.config.ts)