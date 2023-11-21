This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies and run the project

```bash
npm i
# and
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
----

## About

This application is a combination of all the basic and available AI APIs. OpenAI is used to generate Code, Text and Images. For music and video - models from Replicate. 

The app has a landing page, which has a brief description of the app. Links lead to registration, if an account exists - just go to the login page and select/enter any available authorization method. 

The app supports all screen resolutions, thanks to shadcn-ui and Tailwind CSS.

The app supports 2 themes: Dark and Light.

The user has 10 free generations after which they are offered a monthly fake subscription regulated with Stripe.

For customer support, the Crisp tool was chosen, which allows you to easily integrate your service and application with a developers-friendly SDK and SITE_ID.

That was the basic functionality, next let's go through each section of the app in more detail.

----

## Architecture

The project was written on a modern Front-end architecture - FSD (Feature Sliced Design)

Read more about the architecture - [here](https://feature-sliced.design/docs/get-started/overview)

In a nutshell, the architecture is a file structure divided into layers (hereafter referred to as `LAYER`'s). Each `LAYER` has its own slice (hereinafter referred to as `SLICE`'s), and each `SLICE` has its own segments (hereinafter referred to as `SEGMENT`'s).

The architecture is presented in a hierarchical structure: **`app/pages/widgets/features/entities/shared`**

3 pillars of the architecture:

1) Each `LAYER` can only import from underlying `LAYER`'s. That is, from pages can't import anything from app, can't use in `entities` something from `widgets` / `features`, `shared` can't use anything "from above" at all. There are valid exceptions that are customized for the project, like redux state, some configs and such.

2) Every SLICE should have a public-api, from which only what is really needed is exported, and nothing more.

3) Also, you can't use `LAYER-in-LAYER`. The exceptions are `entities` (more on the types level) and `shared`. Shared doesn't really have much structure, basic `lib/api/types/config/ui` are welcome there. 

----

## Users
When a user accesses the site for the first time, they need to register / authorize through any available method, through the Clerk authentication system.

In the basic version of the account, the user has 10 free generations from any of the AIs. Unlimited generation is available through a fake subscription.

For fake subscription, use the following data: [here](/docs/subsciption.md)

----

## AI Models

All AI models are taken by API from two services: OpenAI and Replicate.

----

## Scripts

- `npm run dev - ` application launch in development mode
- `npm run build - ` building an application for production mode via webpack
- `npm run lint - ` runs ESlint rules compliance check
- `npm run lint:fix - ` fix all auto-fixable ESLint problems
- `npm run studio` - runs prisma.js studio to manage Database
- `npm run db:update` - updates db and Schema in project
- `npm run add:component` - adds component from shadcn-ui, for ex `npm run add:component button`

----

## Technology Stack

The main infrastructure of the application is built on a modern framework for building fullstack applications, NextJS 14. 

A complete list of the entire technology stack is given below

- **[React 18.2](https://react.dev/learn)**
- **[NextJS 14](https://nextjs.org/docs)**
- **[Tailwind CSS](https://tailwindcss.com/docs/installation)**
- **[Clerk](https://clerk.com/docs/quickstarts/nextjs)**
- **[PlanetScale](https://planetscale.com/docs/concepts/what-is-planetscale)**
- **[Prisma.js](https://www.prisma.io/docs/getting-started)**
- **[react-hook-form](https://react-hook-form.com/get-started)**
- **[shadcn-ui](https://ui.shadcn.com/docs)**
- **[zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)**
- **[Stripe](https://stripe.com/docs/api)**
- **[openai](https://platform.openai.com/docs/api-reference)**
- **[replicate](https://github.com/replicate/replicate-javascript)**

----

## ORM

Prisma.js, one of the most advanced solutions in this area, was chosen as ORM (Object-Oriental Mapping) technology for database querying. 

In conjunction with the [vs-code extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma), it allows you to conveniently compose models, generate a database object, as well as provides a convenient API for working with the database.

All described types in the model are installed in the project as a package, and they can be imported from any place from a single package throughout the project. 

Prisma also provides a handy prisma-studio **`(npx prisma studio)`** that allows direct interaction with the database, and supports all CRUD operations.

----

## Database

PlanetScale cloud database was chosen as the database, which makes it very easy to set up databases. I used a MySQL database from PlanetScale to store all the application information.

It stores all of the user's subscription information.

----

## Environment

As mentioned above, the application is built on an architecture for Front-end applications - Feature Sliced Design. The advantage of any architecture is how modules (in our case layers) interact with each other, where to put a new component, module. There is also distribution of responsibility zones. Featured Sliced Design handles this perfectly. The application is easy to maintain and scale.

Server side, routing and SSR, SEO is handled using the framework for FullStack applications - Next JS. 

The application intelligently interacts modules with each other and maintains good code quality.

The `shared` layer, as always, contains useful and handy utilities that make it easy to work with the environment, or with libraries.

----

## Working with forms

There are not many forms in the application, but a very useful and cool utility has been created that makes it very easy to create and control forms without any labor. Also, it can be adapted to any kind of component, just follow the two examples that are written beforehand.

We are talking about [FormFactory](/src/shared/components/form-factory.tsx)

Combined with [FormFieldWrapper](/src/shared/components/form-field-wrapper.tsx), the result is a powerful tool for managing forms.

It was used for feature [AIRequestForm](/src/features/ai-request-form/ui/ai-request-form/ai-request-form.tsx).

Simple passing of the form schema and its components gave an amazing result.

----

## ENV Structure

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= /* Clerk public key */
CLERK_SECRET_KEY= /* Clerk secret key */

NEXT_PUBLIC_CLERK_SIGN_IN_URL= /* Clerk route for sign-in */ (default: /sign-in)
NEXT_PUBLIC_CLERK_SIGN_UP_URL= /* Clerk route for sign-up */ (default: /sign-in)
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/* Clerk returns here after sign im */ (default: /dashboard)

NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/* Clerk returns here after sign up */ (default: /dashboard)

OPENAI_API_KEY= /* OpenAI API key */
REPLICATE_API_TOKEN= /* Replicate API key */

DATABASE_URL= /* Database url with login credentials */

STRIPE_API_KEY=/* Stripe API Key */
STRIPE_WEBHOOK_SECRET= /* Stripe webhook secret */

NEXT_PUBLIC_APP_URL=/* Public application link */
```
----