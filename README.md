# Summarist

A full-stack audiobook summary platform where users can browse, save, and listen to book summaries — built to a production-app standard, not a tutorial clone.

🔗 [Live Demo] https://summarist-rose-psi.vercel.app/

## Features

- Email/password + Google OAuth authentication (Firebase Auth), plus a guest mode
- Subscription billing via Stripe (Firebase extension), yearly plan with a 7-day trial and a monthly plan, both wired through a real checkout session flow
- Personal library: save books, mark as finished, real-time sync via Firestore `onSnapshot`
- Full audio player: play/pause, skip ±10s, custom-styled scrub bar, adjustable summary text size that persists across the session
- Debounced search (300ms) with a live results dropdown
- Fully responsive, including a custom animated mobile navigation drawer built from scratch (no UI library)

## Tech Stack

**Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Redux Toolkit
**Backend/Infra:** Firebase (Authentication, Firestore), Stripe (via Firebase Extension), Vercel

## Notable Engineering Details

- Diagnosed and fixed a re-render bug where an inline `onEnded` callback was causing the audio player to recreate its `Audio` object on every tick — solved by moving the callback into a ref, decoupling it from the object-creation effect.
- Server components fetch book/player data directly; `loading.tsx` boundaries provide route-level skeleton states without manual loading-state plumbing.
- Subscription tier (Basic/Premium/Premium Plus) is derived by matching the user's Firestore subscription document against known Stripe price IDs — not just stored as a flat flag.

## Running Locally

```bash
git clone https://github.com/brenthippler-art/summarist.git
cd summarist
npm install
npm run dev
```

You'll need your own Firebase project (Auth + Firestore) and Stripe test keys configured as environment variables to run the full flow locally.

## Author

Brenton Hippler — Frontend Developer | [brentoncodes.dev](https://brentoncodes.dev)
