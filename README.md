# Quizzy

Quizzy is a Next.js App Router application for AI-assisted quiz generation, quiz publishing, quiz attempts, and leaderboards. It uses Clerk for authentication, Prisma with PostgreSQL for persistence, and Gemini for quiz generation.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with the required variables:

```bash
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
GEMINI_API_KEY=...
```

3. Generate Prisma Client and apply migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

4. Run the app:

```bash
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run type-check
npm run test:run
npm run test:e2e
```

## Architecture

- `app/`: App Router pages, layouts, and server actions.
- `features/quiz/`: quiz entities, validation schemas, and repository functions.
- `features/attempt/`: attempt persistence, ranking helpers, and attempt entities.
- `infrastructure/ai/`: Gemini integration and AI rate limiting.
- `infrastructure/prisma/`: Prisma schema and SQL migrations.
- `lib/`: shared utilities such as user provisioning and formatting helpers.

## Security Model

- Public quiz detail pages only expose published quiz metadata.
- Quiz attempt pages use server-only queries that never send answers or explanations to the client before submission.
- Attempt result pages are ownership-checked against the authenticated Clerk user.
- AI quiz generation requires authentication, validated input, and database-backed rate limiting.
- Quiz attempts are single-attempt per user and protected by Prisma unique constraints plus transactional submission logic.

## Deployment Notes

- Production builds use standard `next build`.
- Prisma configuration lives in `prisma.config.ts`.
- Apply database migrations before starting the app in production.
- Clerk and Gemini secrets must be provided through your deployment platform secret manager.

## Testing

- Unit tests cover quiz validation, submission validation, scoring, and leaderboard ranking.
- Playwright covers public navigation and unauthenticated access protection for protected routes.

## Operational Guidance

- Monitor AI generation volume and adjust limits in `infrastructure/ai/ai-rate-limit.service.ts` as usage patterns evolve.
- Review unpublished quiz access, attempt access, and result access whenever adding new routes or server actions.
- Prefer adding new query functions for each access mode rather than reusing broad “get by id” reads.
